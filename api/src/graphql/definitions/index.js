const { gql } = require('apollo-server-express');

module.exports = gql`

scalar Date

type Query {
  "A generic ping/pong test query."
  ping: String!
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!
}

`;
