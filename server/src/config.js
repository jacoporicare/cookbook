const env = process.env.NODE_ENV || 'development';

export default {
  env,
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/cookbook',
  },
  secrets: {
    auth: '1577C4J2lmsEuYw27Spy1gAONom3jmdF',
  },
};
