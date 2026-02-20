## Formatting

Formatting is handled automatically by a PostToolUse hook that runs Prettier after every Edit/Write. No need to run `yarn format` manually.

**Prettier config**: Single quotes, trailing commas, 100 char width, arrow parens avoid.

## Linting

ESLint with TypeScript support. Run in each workspace:

- `yarn workspace cookbook-api lint`
- `yarn workspace cookbook-web lint`
- `cd mobile && yarn lint`

## TypeScript

Strict mode enabled in all workspaces. Functional components with React Hooks (no class components).
