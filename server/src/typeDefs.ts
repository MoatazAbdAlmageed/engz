import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Label {
    id: ID!
    title: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String
    createdAt: String
    updatedAt: String
    status: Boolean
    labels: [Label]
  }

  type Query {
    label(id: ID!): Label
    labels: [Label]!
    task(id: ID!): Task
    tasks: [Task]!
  }
  type Mutation {
    addLabel(title: String): Label
    deleteLabel(id: ID): Label
    addTask(title: String): Task
    deleteTask(id: ID): Task
  }
`;

export default typeDefs;
