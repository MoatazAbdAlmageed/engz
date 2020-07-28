import { gql } from "@apollo/client";

export const DELETE_LABEL = gql`
  mutation deleteLabel($id: ID) {
    deleteLabel(id: $id) {
      id
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID) {
    deleteTask(id: $id) {
      id
      title
    }
  }
`;
