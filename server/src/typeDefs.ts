import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Label {
    id: ID!
    title: String
  }

  type Task {
    id: ID!
    title: String
  }

  type Query {
    label(id: ID!): Label
    labels: [Label]!
    task(id: ID!): Task
    tasks: [Task]!
  }
`;

export default typeDefs;
