import * as graphql from "graphql";
import Label from "../models/labelModel";
import LabelSchema from "./LabelSchema";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} = graphql;

const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLString, // todo should be date
    },
    updatedAt: {
      type: GraphQLString, // todo should be date
    },
    labels: {
      type: new GraphQLList(LabelSchema),
      resolve(parent) {
        return Label.find().where("_id").in(parent.labels).exec();
      },
    },
  }),
});
export default TaskSchema;
