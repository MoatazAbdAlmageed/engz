import Label from "./models/labelModel";
import Task from "./models/taskModel";

const resolvers = {
  Query: {
    label: async (parent, { id }) => await Label.find({ id }),
    labels: async () => await Label.find().populate("tasks"),
    task: async (parent, { id }) => await Task.find({ id }),
    tasks: async () => await Task.find().populate("labels"),
  },
};
export default resolvers;
