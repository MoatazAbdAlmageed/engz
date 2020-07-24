import * as graphql from "graphql";
import Task from "../models/taskModel";

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const LabelSchema = new GraphQLObjectType({
  name: "Label",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    tasks: {
      type: new GraphQLList(LabelSchema),
      resolve(parent) {
        return Task.find().where("labels").in(parent.id).exec();
      },
    },
  }),
});
export default LabelSchema;
