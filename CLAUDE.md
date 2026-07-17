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
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: Environment mode (production/development)
- `S3_BUCKET`: Bucket holding recipe images (default `zradelnik-recipe-images`).
- `AWS_REGION`: AWS region for the bucket (default `eu-central-1`).
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`: Credentials for the `zradelnik-app` IAM user (S3 write access). Read from the ambient AWS config locally.
- `S3_PUBLIC_BASE_URL`: Optional override for the public image base URL (defaults to the virtual-hosted S3 endpoint); set this to point image URLs at a CDN later.

### Web

- `API_URL`: GraphQL API endpoint URL (configured in [web/next.config.js](web/next.config.js))
- Deployment-specific env files in [deploy/](deploy/) (`.env.production`, `.env.staging`, `.env.feature`)

## Firebase Integration

The API uses Firebase Admin SDK ([api/src/firebase.ts](api/src/firebase.ts)) for push notifications to mobile apps (credentials in `zradelnik-firebase-adminsdk.json` - encrypted with git-secret).

## Image Handling

Recipe images live in an S3 bucket (`zradelnik-recipe-images`, `eu-central-1`) and are served **directly to the browser from S3** — neither the API nor Next's image optimizer sits in the image read path (this keeps image traffic off the small VPS). The bucket policy grants public GET only to `*.webp` / `*.jpg`, so renditions are public while the original and staging uploads are private. The bucket root holds just two prefixes: `images/` (permanent) and `staging/` (transient uploads). `recipe.image` holds the full permanent key `images/<id>`; per image:

- `images/<id>/original` — the pristine uploaded file, **private** (kept for future re-encoding).
- `images/<id>/{96,384,640,828,1080,1920}.webp` — fixed-width WebP renditions the website consumes (public).
- `images/<id>/1080x1080.jpg` — square JPEG for Android push notifications (public).

**Upload (presigned, direct-to-S3, staging pattern):**
1. `createImageUpload(contentType)` (auth) allowlists the type, mints an id, and returns a presigned PUT URL for `staging/<id>`.
2. The browser PUTs the original straight to S3 staging.
3. On save, `createRecipe`/`updateRecipe` (with `imageId = id`) **promote** the staged upload: size/pixel-capped validation, generate + upload all renditions under `images/<id>/` (concurrency-gated), store the original privately, delete the staging object. Promotion returns the full key `images/<id>` stored on the recipe, and rejects an id with no staging object (prevents attaching another recipe's public-keyed image).

Abandoned staging uploads are swept automatically by an S3 lifecycle rule (`expire-staging-uploads`, `staging/` after 1 day) — there is no app-side orphan prune. On picture replace, `updateRecipe` deletes the old key's prefix only if no other recipe still references it.

**Serving:** the GraphQL `imageUrl` returns the S3 base (`<publicBase>/<key>`). A custom `next/image` loader ([web/image-loader.js](web/image-loader.js)) appends `/<width>.webp`, so the browser fetches finished bytes directly from S3 and `/_next/image` never runs. The rendition widths in [api/src/imageProcessing.ts](api/src/imageProcessing.ts) (`RENDITION_WIDTHS`), the loader, and `next.config.js` `deviceSizes`/`imageSizes` **must stay in sync**.

**Backups:** the bucket is snapshotted daily into a dated zip via [api/src/scripts/backupImages.ts](api/src/scripts/backupImages.ts). It runs **inside the API container** (where the S3 credentials live) using the bundled `@aws-sdk` + `fflate` — no `aws` CLI or `zip` binary needed. It zips everything under `images/` (private originals + all renditions), skipping the transient `staging/` prefix, mirroring the bucket folder structure so a restore is a plain re-upload. A VPS cron (`images-backup.sh`, not in this repo — mirrors the accounting attachments backup) `docker exec`s it to `/tmp`, `docker cp`s the zip out, and prunes zips older than 30 days. Each run is a full snapshot.

Image identity is content-addressed (a new key is minted whenever a recipe's picture changes). AVIF is intentionally unsupported — AV1 encoding is far too slow on the deployment VM. (Images were migrated out of MongoDB into S3 in a one-shot pass; those migration scripts and the legacy `Image` blob model have since been removed.)

- Preserve all diacritics and special characters exactly as they are, when copying or manipulating with text.

## GraphQL Gotchas

- When running GraphQL codegen, always use the `/gql-codegen` skill — it handles starting/stopping the API automatically.
- GraphQL codegen generates `Maybe<T>` = `T | null` for optional fields. Local component types often use `T | undefined`. Use `?? undefined` when mapping from generated types to component props.

## Code Style

- Use explicit type checks (`typeof x === 'number'`, `typeof x === 'string'`) instead of `== null`, `!= null`, `== undefined`, or `!= undefined`.
