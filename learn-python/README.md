# Learn software engineering by building 8 Python projects

Each folder is a complete, tested project plus a `LESSON.md` that explains the engineering behind it: why the code is shaped the way it is, the mistakes it avoids, and exercises to do next.

**How to use this:** for each project, read `LESSON.md` first, run the project, read the code with the lesson open beside it, run the tests, then **do the exercises**. Reading is maybe 20% of the learning, and changing the code is the other 80%.

| # | Project | Main fundamentals |
|---|---|---|
| 1 | [Calculator](01-calculator/) | Breaking a problem into stages (tokenize, parse, evaluate), loops as state machines, user errors vs bugs, first tests. **Never `eval` user input.** |
| 2 | [Weather App](02-weather-app/) | HTTP and JSON, timeouts, retries and backoff, caching, layered design, **testing without the network** (dependency injection), keeping API keys secret |
| 3 | [Flask CRUD](03-flask-crud/) | HTTP verbs and status codes, REST, SQL, **SQL injection, XSS, CSRF**, validating input, app factory |
| 4 | [Chatbot](04-chatbot/) | Stateless APIs and conversation history, context-window budgets, streaming with generators, UI state, programming to an interface |
| 5 | [File Organizer](05-file-organizer/) | **Safe by default** (dry run), plan then apply, undo journal, atomic writes, idempotency, logging |
| 6 | [Resume Parser](06-resume-parser/) | NLP pipelines, ambiguity and context, **measuring accuracy** (precision and recall), merging intervals, rules vs ML |
| 7 | [Stock Predictor](07-stock-predictor/) | **Baselines**, time-ordered validation, **data leakage**, sanity checks on known answers, measuring what matters |
| 8 | [Job Tracker + Notion](08-job-tracker/) | Two-way sync, stable IDs, conflicts, UTC and timestamp precision, rate limits and pagination, faithful fakes |

## Ideas that come up in every project

1. **Split the work into layers that each do one job.** Calculator stages, weather transport/logic/presentation, Flask db/routes/templates, sync's push/pull.
2. **Handle errors at the boundary.** Turn library errors into your own error type, show users something they can fix, and let real bugs crash loudly.
3. **Inject what you don't control** (the network, the clock, the AI model, the disk) so tests can control it.
4. **Never trust input**, whether it comes from a user, an API, a file, or an AI model.
5. **Measure before you claim.** Tests for correctness, `evaluate.py` for accuracy, baselines for ML.
6. **Write a test for every bug you fix.** Bugs were caught this way while these projects were built, in Lessons 3, 6, and 8.

## Setup

```bash
cd learn-python
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install pytest requests flask streamlit openai pandas numpy scikit-learn
cd 01-calculator && python -m pytest
```

Python 3.10 or newer is required (the code uses `match` statements and `X | None` types).
