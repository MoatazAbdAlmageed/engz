import { gql } from "@apollo/client";

export const GET_LABELS = gql`
  query getLabels {
    labels {
      id
      title
      tasks {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_TASKS = gql`
  query getTasks {
    tasks {
      id
      title
      createdAt
      updatedAt
      status
      labels {
        id
        title
      }
    }
  }
`;
