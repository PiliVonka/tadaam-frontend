import gql from "graphql-tag";

export const ADD_POSTER = gql`
  mutation AddPoster($title: String!, $description: String!, $stdin: String!, $stdout: String!) {
    addPoster(title: $title, description: $description, stdin: $stdin, stdout: $stdout) {
      title
      description
      created
      author {
        id
      }
    }
  }
`;
