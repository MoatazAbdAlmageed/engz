import Label from "./models/labelModel";
import Task from "./models/taskModel";

const resolvers = {
  Query: {
    label: async (parent, { id }) => await Label.find({ id }),
    labels: async () => await Label.find(),
    task: async (parent, args) => await Task.find({ id: args.id }),
    tasks: () => async () => await Task.find(),
  },
};
export default resolvers;
