const merge = require('lodash.merge');
const { ObjectId } = require('@parameter1/mongodb');
const GraphQLDate = require('@parameter1/graphql-type-date');
const GraphQLObjectID = require('@parameter1/graphql-type-objectid');
const pagination = require('@parameter1/graphql-mongodb-pagination/resolvers');

const smokeLog = require('./smoke-log');
const user = require('./user');

module.exports = merge(
  pagination,

  smokeLog,
  user,

  {
    Date: GraphQLDate,
    ObjectID: GraphQLObjectID(ObjectId),

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
