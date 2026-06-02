# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo cookbook/recipe management application with:

- **API** ([api/](api/)): GraphQL API built with Apollo Server, Express, and MongoDB
- **Web** ([web/](web/)): Next.js frontend with Tailwind CSS 4 and Apollo Client

The application is deployed at https://www.zradelnik.cz/ and allows users to create, edit, and manage recipes.

## Package Manager

This project uses **pnpm** with **pnpm workspaces**. The two workspaces are:

- `api` (in `api/`)
- `web` (in `web/`)

## Development Commands

### Root Level

```bash
# Start API dev server
pnpm dev:api

# Start Web dev server
pnpm dev:web

# Format all code across workspaces
pnpm format

# Check formatting across workspaces
pnpm format:check
```

### API (`pnpm --filter api <script>`)

```bash
# Start development server (auto-restarts on changes)
pnpm --filter api start

# Start with debugging enabled
pnpm --filter api start:inspect

# Build for production
pnpm --filter api build

# Generate TypeScript types from GraphQL schema
pnpm --filter api codegen

# Lint code
pnpm --filter api lint

# Format code
pnpm --filter api format

# Check formatting
pnpm --filter api format:check
```

### Web (`pnpm --filter web <script>`)

```bash
# Start Next.js dev server
pnpm --filter web dev

# Start with Node.js inspector
pnpm --filter web dev:inspect

# Build for production
pnpm --filter web build

# Start production server
pnpm --filter web start

# Lint code
pnpm --filter web lint

# Format code
pnpm --filter web format

# Check formatting
pnpm --filter web format:check

# Generate TypeScript types and React hooks from GraphQL operations (fetches schema from local API)
pnpm --filter web codegen
```

### Docker

```bash
# Start MongoDB and Mongo Express (admin UI)
docker-compose up

# MongoDB runs on port 27017
# Mongo Express admin UI available at http://localhost:8081
```

## Environment Variables

### API

- `JWT_SECRET`: Secret for signing JWT tokens
- `OPENAI_API_KEY`: OpenAI API Key for automatic recipe creation from a URL
- `APOLLO_EXPLORER_ENABLED`: Enable Apollo GraphQL explorer (default: disabled in production)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment mode (production/development)
- `IMAGE_CACHE_DIR`: Directory for warmed image renditions. In production must point at a persistent volume (see [deploy/docker-compose.yml](deploy/docker-compose.yml)); defaults to a tmp dir for local dev.

### Web

- `API_URL`: GraphQL API endpoint URL (configured in [web/next.config.js](web/next.config.js))
- Deployment-specific env files in [deploy/](deploy/) (`.env.production`, `.env.staging`, `.env.feature`)

## Firebase Integration

The API uses Firebase Admin SDK ([api/src/firebase.ts](api/src/firebase.ts)) for push notifications to mobile apps (credentials in `zradelnik-firebase-adminsdk.json` - encrypted with git-secret).

## Image Handling

Recipe images are stored in MongoDB (via the Image model). The image route is `/image/:slugAndId` (where `slugAndId` is `<slug>_<imageId>`):

- **Bare request** (no query): the **web source** — the original capped to 1920px on its long edge and re-encoded as WebP, cached on disk under `IMAGE_CACHE_DIR`. This is what the web's `next/image` fetches and resizes per viewport. (Serving the multi-megapixel original instead overwhelmed the API and Next's decoder — the cap is lossless in practice since the largest width any component requests is 1200.)
- **Sized request** (`?size=WxH`, optional `?format=webp`): a Sharp-resized WebP/JPEG rendition cached on disk. Used by push notifications (`?size=1080x1080` → JPEG).

Cold encodes on the request path are concurrency-limited so a burst can't exhaust the VM. A forked background warmer ([api/src/scripts/imagesGenerator.ts](api/src/scripts/imagesGenerator.ts)) pre-generates the WebP source for every recipe in production. AVIF is intentionally unsupported — AV1 encoding is far too slow on the deployment VM. Image identity is content-addressed (a new `imageId` is minted whenever a recipe's picture changes), so cached renditions never go stale.

- Preserve all diacritics and special characters exactly as they are, when copying or manipulating with text.

## GraphQL Gotchas

- When running GraphQL codegen, always use the `/gql-codegen` skill — it handles starting/stopping the API automatically.
- GraphQL codegen generates `Maybe<T>` = `T | null` for optional fields. Local component types often use `T | undefined`. Use `?? undefined` when mapping from generated types to component props.

## Code Style

- Use explicit type checks (`typeof x === 'number'`, `typeof x === 'string'`) instead of `== null`, `!= null`, `== undefined`, or `!= undefined`.
