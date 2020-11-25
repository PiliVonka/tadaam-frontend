import gql from "graphql-tag";

export const ADD_SUBMISSION = gql`
  mutation AddSubmission($code: String!) {
    addSubmission(code: $code) {
      id
      codeKey
    }
  }
`;
