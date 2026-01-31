---
paths:
  - "mobile/**"
---

## Mobile Architecture

**Framework**: Expo (SDK 54) / React Native with TypeScript

**Apollo Client**: Configured with cache persistence (apollo3-cache-persist). No auth link.

**Feature Structure**: Co-located GraphQL operations in [mobile/src/features/](mobile/src/features/) (`*.query.ts`, `*.fragment.ts`, `*.mutation.ts`).

**Offline Mode**: Supports offline usage with persisted Apollo cache.

**Styling**: Uniwind (Tailwind CSS 4 for React Native).
