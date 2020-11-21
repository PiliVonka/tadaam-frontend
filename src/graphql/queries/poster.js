import gql from "graphql-tag";

export const GET_POSTERS = gql`
  query GetPosters {
    posters {
      id
      title
      description
    }
  }
`;

export const GET_POSTER = gql`
  query GetPoster ($id: ID!) {
    poster(id: $id) {
      title
      description
    }
  }
`;
