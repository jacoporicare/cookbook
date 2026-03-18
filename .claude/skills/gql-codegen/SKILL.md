---
name: gql-codegen
description: Run GraphQL codegen for web and/or mobile workspaces. Handles the API lifecycle automatically — checks if the API is already running, starts it if needed, runs codegen, and stops the API only if it was started by this skill. Use this skill whenever you need to run codegen after changing GraphQL schema or operations, or when the user asks to run codegen.
---

# GraphQL Codegen Runner

Run GraphQL codegen for web and/or mobile. The local API must be running because codegen fetches the schema from `http://localhost:4000/graphql`.

## Procedure

### 1. Check if API is running

```bash
curl -sf http://localhost:4000/health
```

If this succeeds, the API is already running — set `STARTED_API=false`.

### 2. Start API if needed

If the health check failed, start the API in the background and wait for it:

```bash
# Start in background
pnpm dev:api
# (run as background shell)

# Then poll until ready
until curl -sf http://localhost:4000/health 2>&1; do sleep 1; done
```

Set `STARTED_API=true` and note the background task ID so you can stop it later.

### 3. Run codegen

Always run API codegen first (it doesn't need the running API), then web/mobile:

- **API** (always): `pnpm --filter api codegen`
- **Web** (always): `pnpm --filter web codegen`
- **Mobile** (only if mobile workspace exists and has GraphQL operations): `cd mobile && pnpm codegen`

### 4. Stop API if we started it

Only if `STARTED_API=true`, stop the background API task. Do not stop it if it was already running before this skill — the user likely has it running intentionally.
