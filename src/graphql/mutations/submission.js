import gql from "graphql-tag";

export const ADD_SUBMISSION = gql`
  mutation AddSubmission($code: String!, $posterId: ID!) {
    addSubmission(code: $code, posterId: $posterId) {
      id
      codeKey
    }
  }
`;
