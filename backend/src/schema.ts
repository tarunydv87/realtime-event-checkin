import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(name: String!, location: String!, startTime: String!): Event!
    joinEvent(eventId: ID!): Event!
  }
`
