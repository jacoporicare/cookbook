#!/usr/bin/env bash
# PostToolUse hook: auto-format files with Prettier + ESLint after Edit/Write

set -euo pipefail

FILE_PATH=$(jq -r '.tool_input.file_path // empty')

[[ -z "$FILE_PATH" ]] && exit 0
[[ ! -f "$FILE_PATH" ]] && exit 0

# Only format files Prettier would handle
[[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx|json|css|md|yml|yaml|graphql)$ ]] && exit 0

# Skip generated files, lock files, and build artifacts
[[ "$FILE_PATH" =~ /generated/ ]] && exit 0
[[ "$FILE_PATH" =~ pnpm-lock\.yaml ]] && exit 0
[[ "$FILE_PATH" =~ \.next/ ]] && exit 0
[[ "$FILE_PATH" =~ /build/ ]] && exit 0

# Determine which workspace the file belongs to
WORKSPACES="api|web|mobile"

if [[ "$FILE_PATH" =~ /($WORKSPACES)/ ]]; then
  WORKSPACE_DIR="$CLAUDE_PROJECT_DIR/${BASH_REMATCH[1]}"
else
  WORKSPACE_DIR="$CLAUDE_PROJECT_DIR"
fi

cd "$WORKSPACE_DIR" || exit 0

pnpm prettier --write "$FILE_PATH" 2>/dev/null || true

[[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]] &&
  pnpm eslint --fix "$FILE_PATH" 2>/dev/null || true
