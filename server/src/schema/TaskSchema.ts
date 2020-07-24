import * as graphql from "graphql";
import LabelSchema from "./LabelSchema";
import { users, labels } from "./data";
import * as _ from "lodash";
import UserSchema from "./UserSchema";
import Label from "../models/labelModel";

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
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
