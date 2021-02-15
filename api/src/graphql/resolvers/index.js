const merge = require('lodash.merge');
const GraphQLDate = require('@parameter1/graphql-type-date');

module.exports = merge(
  {
    Date: GraphQLDate,

    /**
     *
     */
    Mutation: {
      /**
       *
       */
      ping() {
        return 'pong';
      },
    },

    /**
     *
     */
    Query: {
      /**
       *
       */
      ping() {
        return 'pong';
      },
    },
  },
);
