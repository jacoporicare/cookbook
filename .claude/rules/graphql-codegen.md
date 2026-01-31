## GraphQL Code Generation Workflow

When modifying GraphQL schema or operations:

1. **API**: Update schema in [api/src/typeDefs.ts](api/src/typeDefs.ts)
2. **API**: Run `yarn workspace cookbook-api codegen` to regenerate resolver types
3. **API**: Update resolvers in [api/src/resolvers.ts](api/src/resolvers.ts)
4. **Web**: Update GraphQL operations in [web/src/graphql/](web/src/graphql/)
5. **Web**: Run `yarn workspace cookbook-web codegen` to regenerate hooks and types (fetches schema from local API)
6. **Mobile**: Update GraphQL operations in [mobile/src/features/](mobile/src/features/) (co-located `*.query.ts`, `*.fragment.ts`, `*.mutation.ts`)
7. **Mobile**: Run `cd mobile && yarn codegen` to regenerate typed document nodes (fetches schema from local API)

Generated files (in `*/generated/`) are protected by a PreToolUse hook — edit the source schema/operations instead.
