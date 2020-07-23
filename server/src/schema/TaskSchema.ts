import * as graphql from "graphql";

const { GraphQLObjectType, GraphQLString } = graphql;

const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
  }),
});
export default TaskSchema;
