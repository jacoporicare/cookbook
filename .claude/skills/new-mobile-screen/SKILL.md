---
name: new-mobile-screen
description: Scaffold a new mobile feature screen with Expo Router, GraphQL operations, and components following feature-based architecture
disable-model-invocation: true
---

# New Mobile Screen

Scaffolds a new screen in the mobile app following the established feature-based architecture.

## Gather Requirements

Before scaffolding, determine:

1. **Feature name** (kebab-case, e.g. `recipe`, `settings`, `profile`)
2. **Screen name** (kebab-case, e.g. `recipe-list`, `recipe-detail`)
3. **Route location** — where does it live in `src/app/`?
   - Inside a tab: `src/app/(tabs)/(<tab-name>)/`
   - Root-level (outside tabs): `src/app/`
   - Shared stack across tabs: already handled by `(recipes,search,sous-vide)/_layout.tsx`
4. **Does it need GraphQL data?** If yes, what queries/fragments/mutations?

## File Structure

For a new feature `<feature>` with screen `<screen>`:

```
mobile/src/
  features/<feature>/
    screens/<screen>-screen.tsx      # Screen component (presentational)
    components/                       # Feature-specific components
    hooks/                            # Feature-specific hooks
    graphql/
      <operation>.query.ts            # GraphQL queries
      <operation>.fragment.ts         # GraphQL fragments
      <operation>.mutation.ts         # GraphQL mutations
  app/
    <route-file>.tsx                  # Expo Router entry point (data fetching)
```

If the feature already exists (e.g. `recipe`), add files to the existing directory.

## Conventions

### Route File (`src/app/`)

- Default export a function component
- Fetch data here with `useQuery()` using generated typed document nodes
- Configure screen options inline with `<Stack.Screen options={{...}} />`
- Delegate rendering to the screen component from `@/features/`

### Screen Component (`features/<feature>/screens/`)

- Named export (e.g. `export function RecipeListScreen`)
- Receives data as props — keeps the screen presentational
- File name: `<screen>-screen.tsx`

### GraphQL Operations (`features/<feature>/graphql/`)

- Use `gql` tag from `@apollo/client`
- `export default` the document
- File naming: kebab-case with suffix — `<name>.query.ts`, `<name>.fragment.ts`, `<name>.mutation.ts`
- After creating operations, run `cd mobile && yarn codegen` to regenerate types

### Components (`features/<feature>/components/`)

- Use `Text` from `@/components/ui/text` (never React Native's Text)
- Style with Tailwind classes via `className` prop (Uniwind)
- Use `cn()` from `@/lib/utils` to merge class names
- Use semantic color tokens (`bg-background`, `text-foreground`, etc.)

### Hooks (`features/<feature>/hooks/`)

- File name: `use-<name>.ts`
- Named export matching file name

## After Scaffolding

1. Run `cd mobile && yarn codegen` if you added GraphQL operations
2. Run `cd mobile && yarn lint` to verify no issues
3. Verify the new route works with `yarn ios` or `yarn android`
