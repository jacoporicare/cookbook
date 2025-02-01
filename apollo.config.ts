export default {
  client: {
    service: {
      name: 'cookbook',
      localSchemaFile: './api-2.0/src/schema.gql',
    },
    includes: ['./web-2.0/**/*.tsx'],
    tagName: 'graphql',
  },
};
