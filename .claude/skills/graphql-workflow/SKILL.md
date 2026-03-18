---
name: graphql-workflow
description: Use when modifying GraphQL schema or operations across workspaces - guides the multi-step codegen pipeline ensuring no step is missed
---

# GraphQL Codegen Workflow

This skill guides you through the full GraphQL code generation pipeline when making schema or operation changes. The workflow spans 3 workspaces and must be followed in order.

## Before Starting

Determine the scope of the change:

- **Schema change** (new type, field, mutation, query): Start from Step 1
- **Web operations only** (new query/mutation in web): Start from Step 4
- **Mobile operations only** (new query/mutation in mobile): Start from Step 7

## Local API Requirement

Codegen fetches the schema directly from the local API. Before running codegen (Phases 2 & 3), check if the API is running:

```bash
curl -sf http://localhost:4000/health
```

- **If running:** proceed with codegen.
- **If not running:** start it in the background, wait for it to be ready, do all codegen, then kill it:

```bash
# Start API in background
pnpm dev:api &
API_PID=$!

# Wait for API to be ready
until curl -sf http://localhost:4000/health 2>&1; do sleep 1; done

# ... run codegen for web and mobile ...

# Kill API when done
kill $API_PID
```

## Workflow Steps

### Phase 1: API Schema & Resolvers

**Step 1.** Edit the schema in `api/src/typeDefs.ts`

**Step 2.** Run codegen to regenerate resolver types:

```bash
pnpm --filter api codegen
```

Verify: Check that `api/src/generated/graphql.ts` updated successfully.

**Step 3.** Update resolvers in `api/src/resolvers.ts` to match the new schema. Use the generated types for type safety.

**Step 4.** Verify the API compiles:

```bash
pnpm --filter api build
```

### Phase 2: Web Frontend

**Step 5.** Ensure the local API is running (see "Local API Requirement" above).

**Step 6.** Add or update GraphQL operations in `web/src/graphql/` (queries, mutations, fragments).

**Step 7.** Run codegen to regenerate hooks and types (fetches schema from local API):

```bash
pnpm --filter web codegen
```

Verify: Check that files in `web/src/generated/` updated. Use the generated hooks in components.

### Phase 3: Mobile App

**Step 8.** Add or update GraphQL operations co-located with features in `mobile/src/features/<feature>/graphql/`:

- Queries: `*.query.ts`
- Fragments: `*.fragment.ts`
- Mutations: `*.mutation.ts`

**Step 9.** Run codegen to regenerate typed document nodes (fetches schema from local API):

```bash
cd mobile && pnpm codegen
```

Verify: Check that files in `mobile/src/generated/` updated.

**Step 10.** If you started the API in this workflow, kill it now (see "Local API Requirement" above).

## Important Notes

- Codegen fetches the schema directly from the local API (`http://localhost:4000/graphql`) — no separate schema download step needed
- Generated files in `*/generated/` are protected by a PreToolUse hook — never edit them directly
- Always run codegen after changing operations — TypeScript types won't match otherwise
- If a phase doesn't need changes (e.g., mobile doesn't use the new field), skip that phase entirely
- When adding a new query/mutation, write the `.graphql` or `.ts` operation file first, then run codegen
