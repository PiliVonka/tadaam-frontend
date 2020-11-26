import gql from "graphql-tag";

export const ADD_SUBMISSION = gql`
  mutation AddSubmission($code: String!, $posterId: ID!) {
    addSubmission(code: $code, posterId: $posterId) {
      id
      codeKey
    }
  }
`;

export const CHECK_SUBMISSION = gql`
  mutation CheckSubmission ($id: ID!) {
    checkSubmission(id: $id) {
      status
      finished
    }
  }
`;
