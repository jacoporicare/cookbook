module.exports = {
  client: {
    service: {
      name: 'zradelnik',
      // url: 'http://localhost:3000/api/graphql',
      localSchemaFile: './web-2.0/schema.json',
    },
    excludes: ['src/gql/**', 'src/apollo/**'],
  },
};
