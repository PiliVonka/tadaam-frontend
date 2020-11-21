import gql from "graphql-tag";

export const ADD_POSTER = gql`
  mutation AddPoster($title: String!, $description: String!) {
    addPoster(title: $title, description: $description) {
      title
      description
      created
      author {
        id
      }
    }
  }
`;
