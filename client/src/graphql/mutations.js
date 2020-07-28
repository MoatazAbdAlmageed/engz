import { gql } from "@apollo/client";

export const ADD_LABEL = gql`
  mutation addLabel($title: String) {
    addLabel(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_LABEL = gql`
  mutation deleteLabel($id: ID) {
    deleteLabel(id: $id) {
      id
      title
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($title: String) {
    addTask(title: $title) {
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
