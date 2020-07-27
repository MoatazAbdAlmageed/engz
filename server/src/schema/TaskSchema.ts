import * as graphql from "graphql";
import * as _ from "lodash";
import Label from "../models/labelModel";
import { users } from "./data";
import LabelSchema from "./LabelSchema";
import UserSchema from "./UserSchema";

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
    user: {
      type: UserSchema,
      resolve(parent) {
        console.log(parent);
        // todo get from db
        return _.find(users, { id: parent.userId });
      },
    },
  }),
});
export default TaskSchema;
