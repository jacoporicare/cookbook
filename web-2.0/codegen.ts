import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.json',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
    },
  },
};

export default config;
