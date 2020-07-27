import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  query addTask {
    addTask {
      title:"this is dummy"
    }
  }
`;
