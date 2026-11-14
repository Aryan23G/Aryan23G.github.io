# Lesson 7 — Stock Predictor: machine learning without fooling yourself

**Setup:** `pip install pandas numpy scikit-learn` (plus `yfinance` for `--ticker`)
**Run:** `python predictor.py --synthetic`, then `--synthetic --signal 0.3`, then `--synthetic --leak`, then a real ticker or CSV.  **Test:** `python -m pytest`

## What you built

A program that predicts whether a stock closes **up tomorrow**, using features built from past prices (recent returns, volatility, distance from moving averages, RSI). It trains two models (logistic regression and a random forest) and, most importantly, **checks whether they beat dumb guessing.**

Most "stock predictor" tutorials end with a pretty chart and "92% accuracy!". That number is nearly always a bug. This project is about how to spot that bug, which is one of the most valuable skills in ML.

## The three runs, and what each one teaches

```
--synthetic            pure random walk       models ≈ 50%    nothing to learn, nothing learned ✓
--synthetic --signal   hidden momentum        models ≈ 60%    real pattern, real learning ✓
--synthetic --leak     random walk + a bug    models ≈ 76%    FAKE: the model peeked at the future ✗
```

Run all three. The third looks the most impressive, and it's the one that would lose your money.

## Fundamental 1: always compare to a baseline

"60% accuracy" means nothing on its own. If the stock went up on 60% of days, always guessing "up" scores 60% too. So every run includes two baselines:

- **`always_majority`**: predict whichever direction was more common in training.
- **`same_as_today`**: predict that tomorrow moves the same way as today.

Look at the `--signal 0.3` run: the random forest gets 61%, but `same_as_today` also gets 61%. **The models found the pattern, but a one-line rule found it too.** In real work, that means you ship the one-liner: it's faster, explainable, and can't overfit. A model has to beat the baseline by more than the noise (`acc_std`, the variation between test periods) before you can claim anything.

## Fundamental 2: time only goes forward

A normal ML split shuffles the rows randomly into train and test. With time series that's cheating: the model would train on 2024 and get "tested" on 2019, already knowing how the story ends.

`walk_forward` uses `TimeSeriesSplit`:

```
fold 0:  [train          ][test]
fold 1:  [train                ][test]
fold 2:  [train                      ][test]
```

It always trains on the past and tests on the period right after it, like reality does. A fresh model is built each fold, so nothing carries over. The 5 folds also show *how much results vary* across market periods, which is where `acc_std` comes from.

## Fundamental 3: data leakage, the most common ML bug

Leakage is when information that wouldn't be available at prediction time sneaks into the training features. `--leak` adds one innocent-looking feature:

```python
ret.rolling(3, center=True).mean()     # "smoothed return"
```

`center=True` means the 3-day window is yesterday, today, **and tomorrow**. The feature contains a third of the answer, so accuracy jumps to 76% on pure random data, where the true best possible score is 50%.

How to catch it, in both code and tests:

1. **The "change the future" test.** `test_features_use_only_the_past` changes the *last* day's price and checks that no earlier row's features change. If one does, a feature is reading the future. The same test catches `--leak` (`test_leaky_feature_is_caught_by_the_same_test`). Write this test for any time-series project.
2. **Too good to be true usually is.** `verdict()` flags any edge over 10% as a probable bug. Professional funds fight over edges of a fraction of a percent.
3. **Fit preprocessing on training data only.** `StandardScaler` sits *inside* the pipeline, so it learns the mean and spread from the training fold only. Scaling the whole dataset first is a quieter form of the same leak.

Leakage isn't only a finance problem. Predicting hospital readmission from a "discharge notes" field written after readmission, or detecting fraud using an "account closed" flag, are the same bug.

## Fundamental 4: accuracy isn't the goal

`strategy` shows what happens if you hold the stock on days the model predicts "up" and stay in cash otherwise, compared with `buy_hold`, which just holds it the whole time. A model can be "accurate" mostly on small moves and still lose money by missing the big ones. **Measure the thing you actually care about.** And the comparison still flatters the model: there are no trading fees, slippage, or taxes, which quickly eat small edges.

## Fundamental 5: sanity-check the pipeline on known answers

How do you know your code *can* find a pattern at all? `synthetic(signal=0.3)` plants a pattern you know exists. If the models couldn't find it, the bug would be in your pipeline, not the market. `test_random_walk_has_no_edge_and_signal_is_found` checks both directions: no false discoveries on noise, and a real discovery on signal. **Test your measuring instrument before trusting what it measures.**

## Why real stock prices are so hard

Daily price moves are close to random (look up the "efficient market hypothesis"). If yesterday's return reliably predicted today's, traders would act on it until the pattern disappeared. So the honest result on real data is usually "no edge", and **that result is correct, not a failure.** A project that shows it understands why is more impressive in an interview than a fake 92%.

## Smaller lessons worth keeping

- **`shift(-1)`** moves tomorrow's value onto today's row to create the target. It's the only place in the code allowed to look forward, and it goes in `target`, never in a feature.
- **`dropna()`** removes the first ~50 rows (rolling windows need history) and the last row (no "tomorrow" yet).
- **`random_state` / `seed`** make results repeatable, so a test can check exact behavior.
- **Regularize the forest** (`max_depth=4`, `min_samples_leaf=50`). Unlimited trees memorize noise.

## Exercises

1. Run `python predictor.py --ticker RELIANCE.NS` (or AAPL, or an index such as `^NSEI`). Does any model beat the baselines by more than the noise?
2. Add a 0.1% fee to `strategy_return` every time the position changes. How much of the `--signal` profit survives?
3. Invent a new leaky feature (for example, today's return divided by tomorrow's volatility) and confirm the "change the future" test catches it.
4. Predict *volatility* (how big tomorrow's move is, ignoring direction) instead of direction. Volatility is much more predictable. Why?
