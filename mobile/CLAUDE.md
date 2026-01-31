# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cross-platform mobile app built with Expo (SDK 54), React Native 0.81, and TypeScript. Targets iOS, Android, and Web.

## Commands

- **Start dev server:** `yarn start` (alias for `expo start`)
- **Platform-specific:** `yarn ios`, `yarn android`, `yarn web`
- **Lint:** `yarn lint` (uses `expo lint` with ESLint flat config)
- **Format:** `yarn format` (Prettier with single quotes, import sorting via `@trivago/prettier-plugin-sort-imports`)
- **Generate types from GraphQL:** `yarn codegen` (fetches schema from local API)

## Architecture

### Routing

Expo Router with file-based routing in `src/app/`. Uses **tab-based navigation** with native tabs:

- **Root layout** (`_layout.tsx`): `<Stack>` navigator wrapped with `ThemeProvider`, `ApolloProvider`, and `SafeAreaListener`
- **Tabs** (`(tabs)/_layout.tsx`): `NativeTabs` from `expo-router/unstable-native-tabs` with three tabs:
  - `(recipes)` — Main recipe list
  - `(sous-vide)` — Sous-vide filtered recipes
  - `(search)` — Search with native search bar (`role="search"`)
- **Shared stack** (`(recipes,search,sous-vide)/_layout.tsx`): All three tabs share a common `<Stack>` navigator via route group
- **Recipe detail** (`[slug].tsx`): Lives at root level (outside tabs) for proper safe area and navigation behavior

**Screen options pattern:** Screen options (title, header config, search bar) are defined in individual route files using `<Stack.Screen options={{...}} />`, not centralized in layouts.

### Styling

Tailwind CSS 4 adapted for React Native via Uniwind. Metro is configured in `metro.config.js` to process `src/global.css` through Uniwind.

- Use the `cn()` utility from `@/lib/utils` to merge Tailwind classes (combines `clsx` + `tailwind-merge`)
- Non-React Native components must be wrapped with `withUniwind()` to support Tailwind class names — see `src/components/styled.tsx` for examples
- For one-off cases, use the `useResolveClassNames` hook from `uniwind` to convert class names to style objects at runtime

### UI Components

React Native Reusables (shadcn/ui-style components) in `src/components/ui/`. Uses `@rn-primitives/*` packages for accessible primitives.

- **Text:** Always use `Text` from `@/components/ui/text` instead of React Native's `Text`. Supports variants (`h1`–`h4`, `p`, `blockquote`, `code`, `lead`, `large`, `small`, `muted`) and `TextClassContext` for parent-controlled styling (e.g., Card sets `text-card-foreground` for all nested Text).
- **Card:** Supports glass effect on iOS 26+ via `expo-glass-effect`. Checks `isLiquidGlassAvailable()` at module level — renders `GlassView` when available, falls back to regular `View` with border and shadow otherwise.

### Path Aliases & Package Manager

- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Yarn 4 (Berry) with `nodeLinker: node-modules`

### GraphQL Layer

- **Apollo Client** ([src/lib/apollo-client.ts](src/lib/apollo-client.ts)): Singleton client pointing at `EXPO_PUBLIC_API_URL/graphql`. No auth link (v1). Includes `resolveImageUrl()` helper for cross-platform image URL resolution.
- **Operations** live in feature modules as co-located files: `*.fragment.ts`, `*.query.ts`, `*.mutation.ts`.
- **Codegen** ([codegen.yml](codegen.yml)): Uses `typed-document-node` plugin. Output: [src/generated/graphql.tsx](src/generated/graphql.tsx).
- **Usage:** `useQuery(RecipeListDocument)` with full type inference from generated `TypedDocumentNode` exports.

### Feature Structure

Features are organized under `src/features/<feature>/` with co-located GraphQL operations, screens, components, and hooks:

```
src/features/recipe/
  graphql/
    recipe-base.fragment.ts
    recipe-detail.fragment.ts
    recipe-list.query.ts
    recipe-by-slug.query.ts
  screens/
    recipe-list-screen.tsx
    recipe-detail-screen.tsx
  components/
    display-mode-toggle.tsx
    recipe-grid-item.tsx
    recipe-list-item.tsx
    recipe-detail-header-image.tsx
    recipe-detail-basic-info.tsx
    recipe-detail-ingredients.tsx
    recipe-detail-directions.tsx
    recipe-image-placeholder.tsx
  hooks/
    use-display-mode.ts
    use-recipe-search.ts
```

### GraphQL File Naming Convention

- Fragments: `<name>.fragment.ts` (e.g. `recipe-base.fragment.ts`)
- Queries: `<name>.query.ts` (e.g. `recipe-list.query.ts`)
- Mutations: `<name>.mutation.ts` (e.g. `create-recipe.mutation.ts`)
- All kebab-case, all use `gql` tag from `@apollo/client`, all `export default`

### Theming (Dark Mode)

Uniwind handles dark mode automatically via system theme detection:

- **Setup:** `Uniwind.setTheme('system')` in `_layout.tsx` enables automatic light/dark switching based on device settings
- **CSS Variables:** Defined in `src/global.css` using `@layer theme` with `@variant light` and `@variant dark` blocks. Uses **iOS system color hex values** (e.g. `#F2F2F7 /* systemGroupedBackground */`) — not OKLch
- **Custom tokens:** `--radius-card: 28px`, `--radius-sheet: 34px` defined in `@theme` block
- **React Navigation:** Custom `LightIOSTheme` / `DarkIOSTheme` objects in root layout match the CSS variable colors

**Semantic Color Guidelines:**

- Backgrounds: `bg-background`, `bg-card`, `bg-muted`, `bg-secondary`, `bg-accent`
- Text: `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-destructive`
- Borders: `border-border`, `border-input`
- Avoid hardcoded colors like `bg-white`, `text-gray-500`, `bg-gray-200` — use semantic tokens instead

### Safe Area Handling

- `SafeAreaListener` from `react-native-safe-area-context` wraps the app in root layout
- Calls `Uniwind.updateInsets(insets)` on change, enabling safe area utility classes
- Use classes like `pb-safe-offset-4` on `contentContainerClassName` for safe area-aware padding

### Glass Effect (iOS 26+)

- Uses `expo-glass-effect` package
- `GlassView` is wrapped with `withUniwind()` in `src/components/styled.tsx` using manual style mapping to prevent `glassEffectStyle` prop mangling
- `isLiquidGlassAvailable()` check determines whether to use glass or fallback styling
- Card component has built-in glass support — prefer using Card over custom glass implementations

## Styling Rules

- **Prefer `className` over `StyleSheet`** — always use Tailwind classes via Uniwind. Only fall back to `StyleSheet` when a specific style property doesn't work with Uniwind (e.g. `textShadow*` properties).
- **Never use `StyleSheet.absoluteFill`** — use `className="absolute inset-0"` instead.
- When a third-party component doesn't support `className` out of the box, wrap it with `withUniwind()` in `src/components/styled.tsx` and import the wrapped version. There's no reliable way to predict which components need wrapping (e.g. `BlurView` works natively, but `Image` from `expo-image` doesn't) — if `className` has no effect, wrap it.
- **Gradients:** Uniwind has built-in gradient support — no need for `expo-linear-gradient`. Use `bg-gradient-to-{direction}` (e.g. `bg-gradient-to-t`) with `from-*`, `via-*`, `to-*` color stops. Angle-based gradients also available via `bg-linear-{angle}`.
- **FlatList styling:** Use `contentContainerClassName` and `columnWrapperClassName` for Tailwind-based list styling. Use `contentInsetAdjustmentBehavior="automatic"` for proper safe area insets.

## Expo Configuration

- React Native New Architecture is enabled
- Experimental features: `typedRoutes` (type-safe routing) and `reactCompiler`
- Android: `edgeToEdgeEnabled: true`
- Bundle ID: `cz.zradelnik.app`
- ESLint: flat config with `eslint-plugin-better-tailwindcss` for Tailwind class linting
