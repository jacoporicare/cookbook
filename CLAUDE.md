# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo cookbook/recipe management application with:

- **API** ([api/](api/)): GraphQL API built with Apollo Server, Express, and MongoDB
- **Web** ([web/](web/)): Next.js frontend with Tailwind CSS 4 and Apollo Client

The application is deployed at https://www.zradelnik.cz/ and allows users to create, edit, and manage recipes.

## Package Manager

This project uses **Yarn 4** with **Yarn Workspaces**. The two workspaces are:

- `cookbook-api` (in `api/`)
- `cookbook-web` (in `web/`)

## Development Commands

### Root Level

```bash
# Start both API and Web dev servers concurrently
yarn dev

# Format all code across workspaces
yarn format

# Check formatting across workspaces
yarn format:check
```

### API (`yarn workspace cookbook-api <script>`)

```bash
# Start development server (auto-restarts on changes)
yarn workspace cookbook-api start

# Start with debugging enabled
yarn workspace cookbook-api start:inspect

# Build for production
yarn workspace cookbook-api build

# Generate TypeScript types from GraphQL schema
yarn workspace cookbook-api codegen

# Lint code
yarn workspace cookbook-api lint

# Format code
yarn workspace cookbook-api format

# Check formatting
yarn workspace cookbook-api format:check
```

### Web (`yarn workspace cookbook-web <script>`)

```bash
# Start Next.js dev server
yarn workspace cookbook-web dev

# Start with Node.js inspector
yarn workspace cookbook-web dev:inspect

# Build for production
yarn workspace cookbook-web build

# Start production server
yarn workspace cookbook-web start

# Lint code
yarn workspace cookbook-web lint

# Format code
yarn workspace cookbook-web format

# Check formatting
yarn workspace cookbook-web format:check

# Generate TypeScript types and React hooks from GraphQL operations (fetches schema from local API)
yarn workspace cookbook-web codegen
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

### Web

- `API_URL`: GraphQL API endpoint URL (configured in [web/next.config.js](web/next.config.js))
- Deployment-specific env files in [deploy/](deploy/) (`.env.production`, `.env.staging`, `.env.feature`)

## Firebase Integration

The API uses Firebase Admin SDK ([api/src/firebase.ts](api/src/firebase.ts)) for push notifications to mobile apps (credentials in `zradelnik-firebase-adminsdk.json` - encrypted with git-secret).

## Image Handling

Recipe images are stored in MongoDB GridFS (via the Image model). The API serves optimized images through:

- Dynamic resizing: `?width=X&height=Y`
- Format conversion: `?format=webp`
- Middleware route: `/recipe/:recipeId/image`

In production, a background worker pre-generates common image sizes to improve performance.

- Preserve all diacritics and special characters exactly as they are, when copying or manipulating with text.
