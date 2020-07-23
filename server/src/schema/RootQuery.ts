import * as graphql from "graphql";
import TaskSchema from "./TaskSchema";

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

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
        console.log("resolve");
        console.log(args.id);
        // code to get from db
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
});
