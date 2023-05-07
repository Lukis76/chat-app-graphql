import { gql } from "@apollo/client";

export const mutation = {
  UPDATE_USER_NAME: gql`
    mutation createUsername($username: String!) {
      createUsername(username: $username) {
        success
        error
      }
    }
  `,

  REGISTER_USER: gql`
    mutation Mutation($registerInput: RegisterInput) {
      registerUser(registerInput: $registerInput) {
        id
        username
        email
        token
      }
    }
  `,

  LOGIN_USER: gql`
    mutation login($loginInput: LoginInput) {
      loginUser(loginInput: $loginInput) {
        id
        username
        email
        token
      }
    }
  `,
};
