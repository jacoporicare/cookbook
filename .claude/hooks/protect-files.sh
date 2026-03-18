#!/usr/bin/env bash
# PreToolUse hook: block Edit/Write on protected files

set -euo pipefail

FILE_PATH=$(jq -r '.tool_input.file_path // empty')

[[ -z "$FILE_PATH" ]] && exit 0

BASENAME=$(basename "$FILE_PATH")

case "$BASENAME" in
.env | .env.*)
  echo "Blocked: $BASENAME contains secrets — edit manually." >&2
  exit 2
  ;;
pnpm-lock.yaml)
  echo "Blocked: pnpm-lock.yaml should only be modified by the package manager." >&2
  exit 2
  ;;
esac

case "$FILE_PATH" in
*/generated/*)
  echo "Blocked: generated file — run the codegen command instead." >&2
  exit 2
  ;;
esac
