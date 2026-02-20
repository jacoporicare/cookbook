#!/bin/bash

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path')

# Block edits to generated files
if [[ "$FILE_PATH" =~ /generated/ ]]; then
  jq -n '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "deny",
      "permissionDecisionReason": "This is a generated file. Run the codegen command instead."
    }
  }'
  exit 0
fi

# Block edits to lock files
if [[ "$FILE_PATH" =~ yarn\.lock ]]; then
  jq -n '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "deny",
      "permissionDecisionReason": "Lock files should only be modified by the package manager."
    }
  }'
  exit 0
fi

# Block edits to .env files (contain secrets like JWT_SECRET, OPENAI_API_KEY, etc.)
if [[ "$(basename "$FILE_PATH")" =~ ^\.env ]]; then
  jq -n '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "deny",
      "permissionDecisionReason": "Editing .env files is blocked — they contain secrets (JWT_SECRET, API keys, DB credentials). Edit environment variables manually."
    }
  }'
  exit 0
fi

exit 0
