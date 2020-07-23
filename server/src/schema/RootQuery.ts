import * as graphql from "graphql";
import TaskSchema from "./TaskSchema";
import * as _ from "lodash";
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const labels = [
  { id: "1", title: "label 1" },
  { id: "2", title: "label 2" },
  { id: "3", title: "label 3" },
];
const tasks = [
  { id: "1", title: "task 1", labels: [labels[0], labels[1]] },
  { id: "2", title: "task 2", labels: [labels[0]] },
  { id: "3", title: "task 3" },
];
// Todo get from db
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    task: {
      type: TaskSchema,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // todo get from db
        const task = _.find(tasks, { id: args.id });
        console.log(task);

        return task;
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
});
