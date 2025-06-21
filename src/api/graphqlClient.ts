import { GraphQLClient } from 'graphql-request'
import { useAuth } from '../state/auth'

const endpoint = 'http://localhost:4000/graphql'

export const getAuthedClient = () => {
  const token = useAuth.getState().token
  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
