import { gql } from 'graphql-request'

export const CREATE_EVENT = gql`
  mutation CreateEvent($data: EventCreateInput!) {
    createEvent(data: $data) {
      id
      name
    }
  }
`
