"""Predict whether a stock closes UP tomorrow, and honestly check if that beats guessing.

    python predictor.py --synthetic                 # offline demo, pure random walk
    python predictor.py --synthetic --signal 0.3    # random walk WITH a hidden pattern
    python predictor.py --csv prices.csv            # your data: needs Date and Close columns
    python predictor.py --ticker AAPL               # needs `pip install yfinance`
    python predictor.py --synthetic --leak          # see what a leakage bug looks like

    pip install pandas numpy scikit-learn
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import TimeSeriesSplit
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

# ----------------------------------------------------------------- data

def load_csv(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    df.columns = [c.strip().lower() for c in df.columns]
    if not {"date", "close"} <= set(df.columns):
        raise ValueError("CSV needs 'Date' and 'Close' columns")
    df["date"] = pd.to_datetime(df["date"])
    return df.sort_values("date").set_index("date")[["close"]].dropna()


def load_ticker(ticker: str, years: int = 10) -> pd.DataFrame:
    import yfinance as yf
    raw = yf.download(ticker, period=f"{years}y", auto_adjust=True, progress=False)
    if raw.empty:
        raise ValueError(f"no data for {ticker!r}")
    close = raw["Close"].squeeze()
    return pd.DataFrame({"close": close}).dropna()


def synthetic(days: int = 2500, signal: float = 0.0, seed: int = 7) -> pd.DataFrame:
    """A random walk. With signal > 0, today's return partly repeats yesterday's
    (momentum), so there IS something to learn. With signal = 0 there is nothing."""
    rng = np.random.default_rng(seed)
    noise = rng.normal(0.0004, 0.012, days)
    returns = np.zeros(days)
    for t in range(1, days):
        returns[t] = signal * returns[t - 1] + noise[t]
    dates = pd.bdate_range("2016-01-01", periods=days)
    return pd.DataFrame({"close": 100 * np.exp(np.cumsum(returns))}, index=dates)


# ------------------------------------------------------------- features

FEATURES = ["ret_1", "ret_5", "ret_20", "vol_20", "dist_sma_20", "dist_sma_50", "rsi_14"]


def rsi(close: pd.Series, window: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0).rolling(window).mean()
    loss = (-delta.clip(upper=0)).rolling(window).mean()
    return 100 - 100 / (1 + gain / loss.replace(0, np.nan))


def make_features(df: pd.DataFrame, leak: bool = False) -> pd.DataFrame:
    """Every feature on row t uses ONLY prices up to and including day t.
    The target on row t is about day t+1, the future we're trying to predict."""
    out = pd.DataFrame(index=df.index)
    c = df["close"]
    ret = c.pct_change()
    out["ret_1"] = ret
    out["ret_5"] = c.pct_change(5)
    out["ret_20"] = c.pct_change(20)
    out["vol_20"] = ret.rolling(20).std()
    out["dist_sma_20"] = c / c.rolling(20).mean() - 1
    out["dist_sma_50"] = c / c.rolling(50).mean() - 1
    out["rsi_14"] = rsi(c)

    out["next_ret"] = ret.shift(-1)                 # tomorrow's return (the future)
    out["target"] = (out["next_ret"] > 0).astype(int)

    if leak:
        # THE BUG: a "smoothed" return using a centered window peeks at tomorrow.
        # It looks innocent. It makes results look amazing. They are fake.
        out["ret_smooth"] = ret.rolling(3, center=True).mean()

    return out.dropna()


# ------------------------------------------------------------ evaluation

@dataclass
class FoldResult:
    model: str
    accuracy: float
    strategy_return: float


def strategy_return(pred_up: np.ndarray, next_ret: np.ndarray) -> float:
    """Hold the stock on days we predict UP, stay in cash otherwise. Ignores fees."""
    return float(np.prod(1 + np.where(pred_up == 1, next_ret, 0.0)) - 1)


def walk_forward(data: pd.DataFrame, features: list[str], n_splits: int = 5) -> pd.DataFrame:
    """Train on the past, test on the following period, then roll forward.
    A normal shuffled split would train on 2024 to "predict" 2019: cheating."""
    X, y, nxt = data[features].to_numpy(), data["target"].to_numpy(), data["next_ret"].to_numpy()
    models = {
        "logistic": lambda: make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
        "forest": lambda: RandomForestClassifier(n_estimators=200, max_depth=4,
                                                 min_samples_leaf=50, random_state=0, n_jobs=-1),
    }
    rows = []
    for fold, (train, test) in enumerate(TimeSeriesSplit(n_splits=n_splits, gap=1).split(X)):
        # Baselines: the bar any model must clear.
        majority = int(y[train].mean() >= 0.5)
        baselines = {
            "always_majority": np.full(len(test), majority),
            "same_as_today": (X[test, features.index("ret_1")] > 0).astype(int),
        }
        preds = {name: b for name, b in baselines.items()}
        for name, build in models.items():
            model = build()                    # fresh model each fold: no memory of the test
            model.fit(X[train], y[train])      # scaler is fit on TRAIN only, inside the pipeline
            preds[name] = model.predict(X[test])
        for name, p in preds.items():
            rows.append({"fold": fold, "model": name,
                         "accuracy": float((p == y[test]).mean()),
                         "strategy_return": strategy_return(p, nxt[test]),
                         "buy_and_hold": strategy_return(np.ones(len(test)), nxt[test])})
    return pd.DataFrame(rows)


def summarize(results: pd.DataFrame) -> pd.DataFrame:
    s = results.groupby("model").agg(
        accuracy=("accuracy", "mean"), acc_std=("accuracy", "std"),
        strategy=("strategy_return", "mean"), buy_hold=("buy_and_hold", "mean"),
    )
    order = ["always_majority", "same_as_today", "logistic", "forest"]
    return s.reindex([m for m in order if m in s.index])


def verdict(summary: pd.DataFrame) -> str:
    best_baseline = summary.loc[["always_majority", "same_as_today"], "accuracy"].max()
    best_model = summary.loc[["logistic", "forest"], "accuracy"].max()
    noise = summary.loc[["logistic", "forest"], "acc_std"].max()
    edge = best_model - best_baseline
    if edge > 0.10:
        return (f"Models beat the baselines by {edge:.1%}. For real stock data that is almost "
                "certainly a bug (leakage). Real edges are tiny. Check your features.")
    if edge > noise:
        return f"Models beat the best baseline by {edge:.1%}, more than fold-to-fold noise ({noise:.1%})."
    return (f"No edge over the simple baselines: the difference is {edge:+.1%}, within noise "
            f"({noise:.1%}). The ML models add nothing a one-line rule doesn't already do. "
            "On real daily stock data, this is the normal, honest result.")


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    src = p.add_mutually_exclusive_group(required=True)
    src.add_argument("--csv")
    src.add_argument("--ticker")
    src.add_argument("--synthetic", action="store_true")
    p.add_argument("--signal", type=float, default=0.0, help="momentum strength for --synthetic")
    p.add_argument("--leak", action="store_true", help="add a feature that peeks at the future")
    args = p.parse_args(argv)

    try:
        if args.csv:
            prices = load_csv(args.csv)
        elif args.ticker:
            prices = load_ticker(args.ticker)
        else:
            prices = synthetic(signal=args.signal)
    except (OSError, ValueError, ImportError) as err:
        print(f"error: {err}", file=sys.stderr)
        return 1

    data = make_features(prices, leak=args.leak)
    if len(data) < 300:
        print("error: need at least ~300 trading days of data", file=sys.stderr)
        return 1
    features = FEATURES + (["ret_smooth"] if args.leak else [])
    print(f"{len(data)} trading days, {data.index[0]:%Y-%m-%d} to {data.index[-1]:%Y-%m-%d}; "
          f"up days: {data['target'].mean():.1%}\n")

    summary = summarize(walk_forward(data, features))
    with pd.option_context("display.float_format", "{:.3f}".format):
        print(summary.to_string())
    print("\n" + verdict(summary))
    print("\nNot financial advice. Fees, slippage and taxes are ignored, and they eat small edges.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
