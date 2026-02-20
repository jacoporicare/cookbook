---
paths:
  - "web/**"
---

## Web Architecture

**Framework**: Next.js 16 (App Router) with TypeScript

**Entry Points**:

- [web/src/app/layout.tsx](web/src/app/layout.tsx): Root layout with fonts and theme initialization
- [web/src/app/globals.css](web/src/app/globals.css): Global CSS with Tailwind and CSS variables for light/dark themes

**Apollo Client Setup** ([web/src/lib/apollo-client.ts](web/src/lib/apollo-client.ts)):

- Creates Apollo Client with authentication link
- SSR-aware (checks `typeof window === 'undefined'`)
- Injects auth token from cookies into request headers

**Server Actions** ([web/src/app/actions/](web/src/app/actions/)):

- [auth.ts](web/src/app/actions/auth.ts): Login/logout actions
- [recipe.ts](web/src/app/actions/recipe.ts): Recipe CRUD operations
- [user.ts](web/src/app/actions/user.ts): User management actions

**Authentication**:

- [web/src/lib/auth-server.ts](web/src/lib/auth-server.ts): Server-side auth utilities
- [web/src/lib/use-auth.ts](web/src/lib/use-auth.ts): Client-side auth hook
- Auth token stored in cookies with 30-day expiration

**GraphQL Operations** ([web/src/graphql/](web/src/graphql/)):

- All GraphQL queries/mutations defined as `.graphql.ts` files
- GraphQL Code Generator creates type-safe React hooks in [web/src/generated/graphql.tsx](web/src/generated/graphql.tsx)
- Common fragments shared across queries (e.g., `recipeBaseFragment`, `recipeDetailFragment`)

**Routes** (App Router in [web/src/app/](web/src/app/)):

- `/` - Recipe list with search ([page.tsx](web/src/app/page.tsx))
- `/recept/[slug]` - Recipe detail view ([recept/[slug]/page.tsx](web/src/app/recept/[slug]/page.tsx))
- `/recept/[slug]/upravit` - Edit recipe ([recept/[slug]/upravit/page.tsx](web/src/app/recept/[slug]/upravit/page.tsx))
- `/novy-recept` - Create new recipe ([novy-recept/page.tsx](web/src/app/novy-recept/page.tsx))
- `/admin` - Admin panel for user management ([admin/page.tsx](web/src/app/admin/page.tsx))
- `/prihlaseni` - Login page ([prihlaseni/page.tsx](web/src/app/prihlaseni/page.tsx))
- `/odhlaseni` - Logout page ([odhlaseni/page.tsx](web/src/app/odhlaseni/page.tsx))
- `/nastaveni` - Settings page ([nastaveni/page.tsx](web/src/app/nastaveni/page.tsx))

**Styling**:

- Tailwind CSS 4 with OKLch color space
- CSS variables for theming in [web/src/app/globals.css](web/src/app/globals.css)
- Dark mode via `.dark` class on `<html>` element
- Shadcn/Radix UI components in [web/src/components/ui/](web/src/components/ui/)
- Lucide React for icons

**Key Libraries**:

- **dnd-kit**: Drag and drop for ingredient reordering
- **Sonner**: Toast notifications
- **Conform + Zod**: Form validation
- **react-markdown**: Markdown rendering for recipe directions
- **Downshift**: Autocomplete/combobox for search

**Key Components** ([web/src/components/](web/src/components/)):

- [RecipeList/](web/src/components/RecipeList/): Recipe listing with filtering
- [RecipeDetail/](web/src/components/RecipeDetail/): Recipe view with ingredients, directions, sous vide options
- [RecipeEdit/](web/src/components/RecipeEdit/): Recipe creation/editing form
- [ImageUpload/](web/src/components/ImageUpload/): Image upload with preview
- [ui/](web/src/components/ui/): Shadcn/Radix primitives (button, dialog, select, etc.)

**Server Components First**: Prefer React Server Components over Client Components. Avoid React Context as it requires client components - use self-contained components with localStorage/cookies for state persistence instead.
