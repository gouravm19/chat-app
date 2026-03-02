#!/usr/bin/env bash
set -euo pipefail

N8N_URL="${N8N_URL:-http://localhost:5678}"
N8N_USER="${N8N_BASIC_AUTH_USER:-admin}"
N8N_PASS="${N8N_BASIC_AUTH_PASSWORD:-Admin@n8n}"

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required to import workflows." >&2
  exit 1
fi

echo "Importing workflows into ${N8N_URL} ..."
for file in workflows/*.json; do
  name=$(jq -r '.name' "$file")
  echo "- Importing ${name}"
  response=$(curl -sS -u "${N8N_USER}:${N8N_PASS}" \
    -H 'Content-Type: application/json' \
    -X POST "${N8N_URL}/rest/workflows" \
    --data-binary @"$file")

  workflow_id=$(echo "$response" | jq -r '.id // empty')
  if [[ -n "$workflow_id" ]]; then
    curl -sS -u "${N8N_USER}:${N8N_PASS}" \
      -H 'Content-Type: application/json' \
      -X PATCH "${N8N_URL}/rest/workflows/${workflow_id}" \
      -d '{"active": true}' >/dev/null
    echo "  Activated workflow id=${workflow_id}"
  else
    echo "  Failed importing $file"
    echo "$response"
  fi
done

echo "Done."
