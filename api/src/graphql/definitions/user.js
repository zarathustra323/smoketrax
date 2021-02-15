const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Mutation {
  "Registers a new user."
  registerUser(input: RegisterUserMutationInput!): User!
  "Logs a user in via a magic login link token."
  loginUserFromLink(input: LoginUserFromLinkMutationInput!): UserAuth!
  "Sends a magic login link to a user. The user must already exist."
  sendUserLoginLink(input: SendUserLoginLinkMutationInput!): String!
  "Logs out the currently logged-in user."
  logoutUser: String!
}

type User {
  "The unique ID of the User."
  id: ObjectID! @project(field: "_id")
  "The email address of the User. This value is required and is unique."
  email: String! @project
  "The user's given/first name."
  givenName: String! @project
  "The user's family/last name."
  familyName: String! @project
  "The user's region (i.e. state or province)"
  region: LocaleRegion @project(field: "regionCode", needs: ["countryCode"])
  "The user's country."
  country: LocaleCountry! @project(field: "countryCode")
  "The user's full name."
  name: String @project
  "Whether the user email address has been verified."
  verified: Boolean! @project
  "The number of times the user has logged in."
  loginCount: Int! @project
  "The timestamp (in milliseconds) when the user last logged in."
  lastLoggedInAt: Date @project
}

type UserAuth {
  "The user object."
  user: User!
  "The authentication JWT. Use this value to authenticate requests."
  authToken: String!
}

input LoginUserFromLinkMutationInput {
  "The JWT token provided from the user login link."
  loginToken: String!
}

input RegisterUserMutationInput {
  "The user's email address."
  email: String!
  "The user's given/first name."
  givenName: String!
  "The user's family/last name."
  familyName: String!
  "The user's alpha-2 country code."
  countryCode: String!
  "The user's region code."
  regionCode: String
  "A location to redirect the user to after successful authentication."
  redirectTo: String
}

input SendUserLoginLinkMutationInput {
  "The user email address to send the login link to. The user must exist."
  email: String!
  "A location to redirect the user to after successful authentication."
  redirectTo: String
}

`;
