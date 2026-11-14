# Lesson 2 — Weather App: talking to the outside world

**Setup:** `pip install requests`  **Run:** `python weather.py Mumbai --days 5`  **Test:** `python -m pytest`

## What you built

A command-line app that turns a city name into coordinates (geocoding API), fetches current weather plus a forecast (forecast API), and prints a short report. It uses [Open-Meteo](https://open-meteo.com), which needs no API key.

The hard part isn't the weather. Your code now depends on **something you don't control**: a server across the internet that can be slow, down, rate-limited, or return a shape you didn't expect. Project 1 lived in a closed world. This one doesn't.

## Fundamental 1: the network fails, so plan for it

Every line in `HttpClient.get_json` is there because of a real way a network call goes wrong:

| What goes wrong | How the code handles it |
|---|---|
| The server never answers | `timeout=8.0`. **Without a timeout, `requests` can wait forever** and your app hangs. Always set one. |
| A blip (dropped connection, 503) | Retry, waiting a little longer each time (**exponential backoff**: 0.5s, 1s...). |
| *You* sent a bad request (4xx) | Don't retry. It will fail the same way every time. Report it. |
| A 200 response with the wrong shape | `report()` catches `KeyError`/`IndexError` and says "unexpected response" instead of dumping a stack trace. |
| Nothing matches the city | Open-Meteo leaves out the `results` key entirely, so `data.get("results") or []` handles it. |

Know your status codes: **2xx** means it worked, **4xx** means the caller (you) got something wrong, **5xx** means the server got something wrong. The retry decision follows from that.

## Fundamental 2: layers

```
main() / render()   presentation  -> arguments in, text out
WeatherService      logic         -> "find the place, then get its forecast"
HttpClient          transport     -> URLs, JSON, timeouts, retries, cache
```

Each layer talks only to the one below it. That pays off in two ways:

- **You can swap layers.** Want a web page instead of a terminal? Write a new `render`; `WeatherService` doesn't change. You'll do exactly that in Project 3.
- **You can test layers alone.** Which brings us to...

## Fundamental 3: test without the internet (dependency injection)

`HttpClient` doesn't create its own network session if you hand it one: `HttpClient(session=...)`. In production that's a real `requests.Session`. In tests it's `FakeSession`, a small class that returns scripted responses and records every call.

Passing a dependency in, instead of creating it inside, is called **dependency injection**. It's why the tests can:

- run in 0.07 seconds, offline, with the same result every time
- simulate failures you can't trigger on demand (a 503 then a dropped connection then success) and check that retries happen
- check that *no* request is sent when it shouldn't be (bad `days`, cache hit, a 4xx that shouldn't be retried)

Notice `FakeSession` even asserts that a `timeout` is passed. Tests can enforce good habits.

## Fundamental 4: caching

Weather doesn't change every second, and asking twice wastes time and the API's goodwill. Responses are saved to `~/.cache/weather-app/` for 10 minutes, keyed by a hash of the URL and parameters.

The two questions for any cache: **what's the key?** (everything that changes the answer, which here is the URL and all params) and **when does it go stale?** (the TTL, time to live). Wrong key: users see someone else's data. Wrong TTL: users see old data. `--no-cache` is the escape hatch.

## Fundamental 5: secrets and API keys

This API needs no key, but most do (OpenWeatherMap, Notion, OpenAI in Projects 4 and 8). The rule: **a key never goes in your code or in git.** Read it from an environment variable:

```python
import os
API_KEY = os.environ["OPENWEATHER_API_KEY"]   # crashes loudly if missing: good
```

Bots scan GitHub for leaked keys within minutes of a push. If you commit one by accident, revoke it right away. Deleting the commit isn't enough, because the history keeps it.

## Smaller lessons worth keeping

- **`argparse`** gives you `--help`, type checks, and choices for free. Try `python weather.py --help`.
- **Exit codes:** `main` returns 1 on error. Scripts and CI read that number to know whether something failed.
- **Errors go to `stderr`**, normal output to `stdout`. Then `python weather.py X > out.txt` still shows errors on screen.
- **`@dataclass` for API results:** turning loose dicts into typed `Report`/`Place` objects at the edge means the rest of your code gets autocomplete and can't misspell a key.
- **Validate before spending money:** `days` is checked before any request goes out.

## Exercises

1. Add `--json` to print the `Report` as JSON instead of text. Hint: `dataclasses.asdict`. Notice that only the presentation layer changes.
2. When several places match ("Springfield"), list the top 5 and let the user pick one.
3. Add hourly temperatures for today and draw a small text chart with `█` characters.
4. Write a test for the cache *expiring*. Hint: set `cache_seconds=0`.
