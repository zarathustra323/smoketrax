const { ApolloServer } = require('apollo-server-express');
const { STATUS_CODES } = require('http');
const { get, set } = require('@parameter1/utils');
const schema = require('./schema');
const { isProduction } = require('../env');

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    tracing: false,
    cacheControl: false,
    introspection: true,
    debug: !isProduction,
    playground: !isProduction ? { endpoint: path } : false,
    formatError: (err) => {
      const code = get(err, 'extensions.exception.statusCode');
      if (code) set(err, 'extensions.code', STATUS_CODES[code].replace(/\s/g, '_').toUpperCase());
      return err;
    },
  });
  server.applyMiddleware({ app, path });
  return server;
};
