import { gql } from "@apollo/client";

export const query = {
  SEARCH_USERS: gql`
    query SearchUsers($username: String!) {
      searchUsers(username: $username) {
        id
        username
      }
    }
  `,
};
