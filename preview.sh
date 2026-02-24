#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"

echo "Serving ${ROOT_DIR} at http://localhost:${PORT}/index.html"
python3 -m http.server "${PORT}" --directory "${ROOT_DIR}"
