## Formatting

Formatting is handled automatically by a PostToolUse hook that runs Prettier after every Edit/Write. No need to run `pnpm format` manually.

**Prettier config**: Single quotes, trailing commas, 100 char width, arrow parens avoid.

## Linting

ESLint with TypeScript support. Run in each workspace:

- `pnpm --filter api lint`
- `pnpm --filter web lint`
- `cd mobile && pnpm lint`

## TypeScript

Strict mode enabled in all workspaces. Functional components with React Hooks (no class components).
