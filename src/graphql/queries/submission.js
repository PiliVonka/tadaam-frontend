import gql from "graphql-tag";

export const CHECK_SUBMISSION = gql`
  query CheckSubmission ($id: ID!) {
    checkSubmission(id: $id) {
      status
      finished
    }
  }
`;
