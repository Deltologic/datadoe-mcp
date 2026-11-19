#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SLACK_WEBHOOK:-}" ]]; then
    echo "SLACK_WEBHOOK is not set. Skipping Slack notification."
    exit 0
fi

text="${SLACK_TEXT:?SLACK_TEXT is required.}"

if [[ -n "${SLACK_STATUS_OUTCOME:-}" ]]; then
    if [[ "${SLACK_STATUS_OUTCOME}" == "success" ]]; then
        marker="🏗️🟢"
        status="DONE"
    else
        marker="🏗️🔴"
        status="FAILED"
    fi
    text="${marker} ${text}: ${status}."
else
    text="🏗️⚪️ ${text}"
fi

if [[ -n "${RUN_URL:-}" ]]; then
    text="${text}"$'\n'"<${RUN_URL}|View workflow run>"
fi

if [[ -n "${SLACK_DETAILS:-}" ]]; then
    text="${text}"$'\n'"${SLACK_DETAILS}"
fi

payload="$(jq -n --arg text "${text}" '{text: $text}')"
curl -fsS -X POST -H 'Content-type: application/json' --data "${payload}" "${SLACK_WEBHOOK}"
echo "Slack notification sent."
