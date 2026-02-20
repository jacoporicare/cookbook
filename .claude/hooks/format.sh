#!/bin/bash

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path')

# Only format files Prettier would handle
if [[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx|json|css|md|yml|yaml|graphql)$ ]]; then
  exit 0
fi

# Skip generated files and lock files
if [[ "$FILE_PATH" =~ /generated/ ]] || [[ "$FILE_PATH" =~ yarn\.lock ]] || [[ "$FILE_PATH" =~ \.next/ ]] || [[ "$FILE_PATH" =~ /build/ ]]; then
  exit 0
fi

# Determine which workspace the file belongs to and run its prettier
PROJECT_DIR=$(echo "$INPUT" | jq -r '.cwd')

if [[ "$FILE_PATH" == */api/* ]]; then
  cd "$PROJECT_DIR/api" && npx prettier --write "$FILE_PATH" 2>/dev/null
  [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]] && npx eslint --fix "$FILE_PATH" 2>/dev/null
elif [[ "$FILE_PATH" == */web/* ]]; then
  cd "$PROJECT_DIR/web" && npx prettier --write "$FILE_PATH" 2>/dev/null
  [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]] && npx eslint --fix "$FILE_PATH" 2>/dev/null
elif [[ "$FILE_PATH" == */mobile/* ]]; then
  cd "$PROJECT_DIR/mobile" && npx prettier --write "$FILE_PATH" 2>/dev/null
  [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]] && npx eslint --fix "$FILE_PATH" 2>/dev/null
else
  # Root-level files
  cd "$PROJECT_DIR" && npx prettier --write "$FILE_PATH" 2>/dev/null
fi

exit 0
