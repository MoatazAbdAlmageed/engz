import * as graphql from "graphql";
import LabelSchema from "./LabelSchema";

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    labels: {
      type: new GraphQLList(LabelSchema), // todo make it array
    },
  }),
});
export default TaskSchema;
