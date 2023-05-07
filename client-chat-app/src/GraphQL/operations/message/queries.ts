import { gql } from '@apollo/client'

export const Queries = {
  msgs: gql`
    query Msgs($conversationId: String, $token: String) {
      msgs(conversationId: $conversationId, token: $token) {
        createdAt
        id
        sender {
          id
          username
        }
        body
      }
    }
  `,
}
