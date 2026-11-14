"""Weather for any city, from the free Open-Meteo API (no API key needed).

    python weather.py London
    python weather.py "New Delhi" --days 5 --units imperial

Layers, from the outside in:
    main()            -> command-line arguments and printing (presentation)
    WeatherService    -> what the app means by "the weather in X" (logic)
    HttpClient        -> GET a URL, return JSON, with timeout/retry/cache (transport)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import requests

GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search"
FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

# WMO weather codes -> words. https://open-meteo.com/en/docs
WEATHER_CODES = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow",
    75: "Heavy snow", 80: "Rain showers", 81: "Heavy showers", 82: "Violent showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Severe thunderstorm",
}


class WeatherError(Exception):
    """Something the user should be told about (bad city, network down...)."""


# ------------------------------------------------------------ transport layer

class HttpClient:
    """GET JSON with a timeout, a couple of retries, and an on-disk cache."""

    def __init__(self, session=None, cache_dir: Path | None = None,
                 cache_seconds: int = 600, retries: int = 2, timeout: float = 8.0):
        self.session = session or requests.Session()
        self.cache_dir = cache_dir
        self.cache_seconds = cache_seconds
        self.retries = retries
        self.timeout = timeout

    def _cache_path(self, url: str, params: dict) -> Path | None:
        if self.cache_dir is None:
            return None
        key = json.dumps([url, sorted(params.items())])
        return self.cache_dir / (hashlib.sha256(key.encode()).hexdigest()[:16] + ".json")

    def get_json(self, url: str, params: dict) -> dict:
        path = self._cache_path(url, params)
        if path and path.exists() and time.time() - path.stat().st_mtime < self.cache_seconds:
            return json.loads(path.read_text())

        last_error: Exception | None = None
        for attempt in range(self.retries + 1):
            try:
                resp = self.session.get(url, params=params, timeout=self.timeout)
            except requests.RequestException as err:      # DNS, refused, timeout...
                last_error = err
            else:
                if resp.status_code == 200:
                    data = resp.json()
                    if path:
                        path.parent.mkdir(parents=True, exist_ok=True)
                        path.write_text(json.dumps(data))
                    return data
                if 400 <= resp.status_code < 500:          # our fault: retrying won't help
                    raise WeatherError(f"API rejected the request ({resp.status_code}): {resp.text[:200]}")
                last_error = WeatherError(f"server error {resp.status_code}")
            if attempt < self.retries:
                time.sleep(0.5 * 2 ** attempt)             # exponential backoff: 0.5s, 1s, ...
        raise WeatherError(f"could not reach the weather service: {last_error}")


# ---------------------------------------------------------------- logic layer

@dataclass
class Place:
    name: str
    country: str
    latitude: float
    longitude: float


@dataclass
class DayForecast:
    date: str
    high: float
    low: float
    rain_chance: int | None
    summary: str


@dataclass
class Report:
    place: Place
    temperature: float
    feels_like: float
    wind: float
    summary: str
    days: list[DayForecast]
    temp_unit: str
    wind_unit: str


class WeatherService:
    def __init__(self, http: HttpClient):
        self.http = http

    def find_place(self, city: str) -> Place:
        city = city.strip()
        if not city:
            raise WeatherError("please give a city name")
        data = self.http.get_json(GEOCODE_URL, {"name": city, "count": 1, "language": "en"})
        results = data.get("results") or []          # key is missing when nothing matches
        if not results:
            raise WeatherError(f"no place called {city!r} found")
        r = results[0]
        return Place(r["name"], r.get("country", ""), r["latitude"], r["longitude"])

    def report(self, city: str, days: int = 3, units: str = "metric") -> Report:
        if not 1 <= days <= 16:
            raise WeatherError("days must be between 1 and 16")
        place = self.find_place(city)
        imperial = units == "imperial"
        data = self.http.get_json(FORECAST_URL, {
            "latitude": place.latitude,
            "longitude": place.longitude,
            "current": "temperature_2m,apparent_temperature,wind_speed_10m,weather_code",
            "daily": "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code",
            "temperature_unit": "fahrenheit" if imperial else "celsius",
            "wind_speed_unit": "mph" if imperial else "kmh",
            "timezone": "auto",
            "forecast_days": days,
        })
        try:
            cur, daily = data["current"], data["daily"]
            forecast = [
                DayForecast(
                    date=daily["time"][i],
                    high=daily["temperature_2m_max"][i],
                    low=daily["temperature_2m_min"][i],
                    rain_chance=(daily.get("precipitation_probability_max") or [None] * days)[i],
                    summary=describe(daily["weather_code"][i]),
                )
                for i in range(len(daily["time"]))
            ]
            return Report(
                place=place,
                temperature=cur["temperature_2m"],
                feels_like=cur["apparent_temperature"],
                wind=cur["wind_speed_10m"],
                summary=describe(cur["weather_code"]),
                days=forecast,
                temp_unit="°F" if imperial else "°C",
                wind_unit="mph" if imperial else "km/h",
            )
        except (KeyError, IndexError, TypeError) as err:
            raise WeatherError(f"unexpected response from the weather service: missing {err}")


def describe(code: int | None) -> str:
    return WEATHER_CODES.get(code, f"Unknown ({code})")


# --------------------------------------------------------- presentation layer

def render(r: Report) -> str:
    lines = [
        f"{r.place.name}, {r.place.country}".rstrip(", "),
        f"  Now: {r.temperature:.0f}{r.temp_unit} (feels {r.feels_like:.0f}{r.temp_unit}), "
        f"{r.summary}, wind {r.wind:.0f} {r.wind_unit}",
        "",
    ]
    for d in r.days:
        rain = f"{d.rain_chance:>3}% rain" if d.rain_chance is not None else ""
        lines.append(f"  {d.date}  {d.low:>4.0f} / {d.high:<4.0f}{r.temp_unit}  {d.summary:<22} {rain}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Current weather and forecast for a city.")
    parser.add_argument("city", nargs="+", help="city name, e.g. Mumbai")
    parser.add_argument("--days", type=int, default=3)
    parser.add_argument("--units", choices=["metric", "imperial"], default="metric")
    parser.add_argument("--no-cache", action="store_true")
    args = parser.parse_args(argv)

    cache = None if args.no_cache else Path.home() / ".cache" / "weather-app"
    service = WeatherService(HttpClient(cache_dir=cache))
    try:
        print(render(service.report(" ".join(args.city), args.days, args.units)))
    except WeatherError as err:
        print(f"error: {err}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
