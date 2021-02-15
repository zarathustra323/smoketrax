const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Mutation {
  addSmokeLogEntry: SmokeLogEntry @auth
}

type SmokeLogEntry {
  "The unique ID of this SmokeLogEntry."
  id: ObjectID! @project(field: "_id")
  "The date and time the smoking occured."
  date: Date!
  "The user who logged this smoke."
  user: User!
}

`;
