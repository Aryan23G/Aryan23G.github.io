import numpy as np
import pandas as pd
import pytest

from predictor import FEATURES, load_csv, make_features, strategy_return, summarize, synthetic, walk_forward


def test_features_use_only_the_past():
    """Change tomorrow's price: today's features must not move. This is THE leakage test."""
    prices = synthetic(days=300)
    before = make_features(prices)
    changed = prices.copy()
    changed.iloc[-1, 0] *= 1.5                 # alter the final day only
    after = make_features(changed)
    # make_features drops the final day (it has no "tomorrow"), so every remaining row
    # is a day BEFORE the change. None of their features may differ.
    pd.testing.assert_frame_equal(before[FEATURES], after.loc[before.index, FEATURES])


def test_leaky_feature_is_caught_by_the_same_test():
    prices = synthetic(days=300)
    changed = prices.copy()
    changed.iloc[-1, 0] *= 1.5
    before, after = make_features(prices, leak=True), make_features(changed, leak=True)
    last_shared = before.index[-1]            # the day before the change: its window peeks ahead
    assert before.loc[last_shared, "ret_smooth"] != after.loc[last_shared, "ret_smooth"]


def test_target_is_tomorrows_direction():
    prices = pd.DataFrame({"close": [100.0, 101, 100, 102] * 30},
                          index=pd.bdate_range("2024-01-01", periods=120))
    data = make_features(prices)
    row = data.index[0]
    i = prices.index.get_loc(row)
    assert data.loc[row, "target"] == int(prices["close"].iloc[i + 1] > prices["close"].iloc[i])


def test_strategy_return():
    assert strategy_return(np.array([1, 0, 1]), np.array([0.10, -0.50, -0.10])) == pytest.approx(1.1 * 0.9 - 1)


def test_walk_forward_trains_on_past_only():
    data = make_features(synthetic(days=800))
    results = walk_forward(data, FEATURES, n_splits=3)
    assert set(results["model"]) == {"always_majority", "same_as_today", "logistic", "forest"}
    assert results["fold"].nunique() == 3


def test_random_walk_has_no_edge_and_signal_is_found():
    noise = summarize(walk_forward(make_features(synthetic(signal=0.0)), FEATURES))
    signal = summarize(walk_forward(make_features(synthetic(signal=0.4)), FEATURES))
    assert noise.loc["logistic", "accuracy"] < 0.55            # can't predict coin flips
    assert signal.loc["logistic", "accuracy"] > 0.58           # but does find a real pattern


def test_leak_produces_suspiciously_good_results():
    data = make_features(synthetic(), leak=True)
    s = summarize(walk_forward(data, FEATURES + ["ret_smooth"]))
    assert s.loc["logistic", "accuracy"] > 0.70


def test_load_csv(tmp_path):
    path = tmp_path / "p.csv"
    path.write_text("Date,Open,Close\n2024-01-03,1,11\n2024-01-02,1,10\n")
    df = load_csv(str(path))
    assert list(df["close"]) == [10, 11]                       # sorted by date
    (tmp_path / "bad.csv").write_text("day,price\n1,2\n")
    with pytest.raises(ValueError):
        load_csv(str(tmp_path / "bad.csv"))
