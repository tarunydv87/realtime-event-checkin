import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query {
    events {
      id
      name
      location
      startTime
    }
  }
`
