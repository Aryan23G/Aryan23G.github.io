"""These tests never touch the internet. A fake session stands in for `requests`,
so they're fast, work offline, and give the same result every time."""

import pytest
import requests

import weather
from weather import FORECAST_URL, GEOCODE_URL, HttpClient, WeatherError, WeatherService, render

GEO = {"results": [{"name": "Pune", "country": "India", "latitude": 18.5, "longitude": 73.8}]}
FORECAST = {
    "current": {"temperature_2m": 29.4, "apparent_temperature": 31.0,
                "wind_speed_10m": 11.2, "weather_code": 2},
    "daily": {"time": ["2026-11-14", "2026-11-15"],
              "temperature_2m_max": [31, 30], "temperature_2m_min": [18, 17],
              "precipitation_probability_max": [5, 40], "weather_code": [1, 61]},
}


class FakeResponse:
    def __init__(self, status, data):
        self.status_code, self._data, self.text = status, data, str(data)

    def json(self):
        return self._data


class FakeSession:
    """Answers from a script and records every call."""

    def __init__(self, routes):
        self.routes = routes   # url -> list of responses/exceptions, used in order
        self.calls = []

    def get(self, url, params=None, timeout=None):
        self.calls.append((url, params))
        assert timeout is not None, "always set a timeout on network calls"
        item = self.routes[url].pop(0)
        if isinstance(item, Exception):
            raise item
        return item


@pytest.fixture(autouse=True)
def no_sleep(monkeypatch):
    monkeypatch.setattr(weather.time, "sleep", lambda s: None)


def service(routes, **kw):
    session = FakeSession(routes)
    return WeatherService(HttpClient(session=session, **kw)), session


def test_happy_path():
    svc, _ = service({GEOCODE_URL: [FakeResponse(200, GEO)],
                      FORECAST_URL: [FakeResponse(200, FORECAST)]})
    report = svc.report("Pune", days=2)
    assert report.place.name == "Pune"
    assert report.summary == "Partly cloudy"
    assert [d.summary for d in report.days] == ["Mainly clear", "Light rain"]
    text = render(report)
    assert "Pune, India" in text and "40% rain" in text


def test_unknown_city():
    svc, _ = service({GEOCODE_URL: [FakeResponse(200, {"generationtime_ms": 0.3})]})
    with pytest.raises(WeatherError, match="no place"):
        svc.report("Atlantisville")


def test_retries_server_errors_then_succeeds():
    svc, session = service({GEOCODE_URL: [FakeResponse(503, {}), requests.ConnectionError("down"),
                                          FakeResponse(200, GEO)],
                            FORECAST_URL: [FakeResponse(200, FORECAST)]})
    svc.report("Pune")
    assert len(session.calls) == 4


def test_gives_up_after_retries():
    svc, _ = service({GEOCODE_URL: [requests.Timeout()] * 3})
    with pytest.raises(WeatherError, match="could not reach"):
        svc.report("Pune")


def test_client_errors_are_not_retried():
    svc, session = service({GEOCODE_URL: [FakeResponse(400, {"reason": "bad"})]})
    with pytest.raises(WeatherError, match="400"):
        svc.report("Pune")
    assert len(session.calls) == 1


def test_malformed_response_is_a_clean_error():
    svc, _ = service({GEOCODE_URL: [FakeResponse(200, GEO)],
                      FORECAST_URL: [FakeResponse(200, {"current": {}})]})
    with pytest.raises(WeatherError, match="unexpected response"):
        svc.report("Pune")


def test_cache_avoids_second_request(tmp_path):
    svc, session = service({GEOCODE_URL: [FakeResponse(200, GEO)],
                            FORECAST_URL: [FakeResponse(200, FORECAST)]}, cache_dir=tmp_path)
    svc.report("Pune")
    svc.report("Pune")          # the routes are now empty; a real request would fail
    assert len(session.calls) == 2


def test_validates_days():
    svc, session = service({})
    with pytest.raises(WeatherError):
        svc.report("Pune", days=0)
    assert session.calls == []
