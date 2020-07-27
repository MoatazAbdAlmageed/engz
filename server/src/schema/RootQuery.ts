import * as graphql from "graphql";
import Label from "../models/labelModel";
import Task from "../models/taskModel";
import LabelSchema from "./LabelSchema";
import TaskSchema from "./TaskSchema";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    labels: {
      type: new GraphQLList(LabelSchema),
      resolve(parent, args) {
        return Label.find({});
      },
    },
    label: {
      type: LabelSchema,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Label.findById(args.id);
      },
    },
    tasks: {
      type: new GraphQLList(TaskSchema),
      resolve(parent, args) {
        return Task.find({});
      },
    },
    task: {
      type: TaskSchema,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addLabel: {
      type: LabelSchema,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, args) {
        const label = new Label({
          title: args.title,
        });

        const result = await label.save();
        if (result._id) {
          return label;
        }
        result.then((err, data) => {
          if (err) {
            return err;
          }
        });
      },
    },
    addTask: {
      type: TaskSchema,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        labels: {
          type: new GraphQLList(GraphQLString),
        },
      },
      async resolve(parent, args) {
        const task = new Task({
          title: args.title,
          labels: args.labels,
        });
        const result = await task.save();
        if (result._id) {
          return task;
        }
        result.then((err, data) => {
          if (err) {
            return err;
          }
        });
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
