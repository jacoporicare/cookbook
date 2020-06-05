module.exports = {
  client: {
    service: {
      name: 'zradelnik',
      url: 'http://localhost:3000/api/graphql',
    },
    excludes: ['src/generated/**', 'src/apollo/**'],
  },
};
