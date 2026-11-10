#!/usr/bin/env bash
# SentinelDesk: start everything on this computer (macOS / Linux).
# Safe to run every time: it only does what is missing, then opens your browser.
set -euo pipefail
cd "$(dirname "$0")"

PY="${PYTHON:-python3}"
if ! command -v "$PY" >/dev/null 2>&1; then
  echo "SentinelDesk needs Python 3.10 or newer: https://www.python.org/downloads/"
  exit 1
fi
if [ ! -x .venv/bin/python ]; then
  echo "› First start: getting things ready (about a minute)…"
  "$PY" -m venv .venv
fi
.venv/bin/python -m pip install --quiet --disable-pip-version-check -r requirements.txt

PULL=""
if command -v ollama >/dev/null 2>&1; then
  # Start the local AI model server if it is installed but not running.
  if ! .venv/bin/python -c "import urllib.request as u; u.build_opener(u.ProxyHandler({})).open('http://127.0.0.1:11434/api/tags', timeout=2)" >/dev/null 2>&1; then
    echo "› Starting Ollama…"
    (ollama serve > .ollama.log 2>&1 &)
    sleep 3
  fi
  PULL="--pull"  # downloads the AI model the first time (free, a few GB)
else
  echo "› Ollama (the free local AI engine) isn't installed, so SentinelDesk will use its built-in rules for now."
  echo "  Install it from https://ollama.com/download, then run ./start.sh again."
fi

exec .venv/bin/python run.py --open $PULL "$@"
