module.exports = {
  client: {
    service: {
      name: 'zradelnik',
      // url: 'http://localhost:3000/api/graphql',
      localSchemaFile: './schema.json',
    },
    excludes: ['src/generated/**', 'src/apollo/**'],
  },
};
