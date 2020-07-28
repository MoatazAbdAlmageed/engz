import Label from "./models/labelModel";
import Task from "./models/taskModel";

const resolvers = {
  Query: {
    label: async (parent, { id }) => await Label.find({ id }),
    labels: async () => await Label.find().populate("tasks"),
    task: async (parent, { id }) => await Task.find({ id }),
    tasks: async () => await Task.find().populate("labels"),
  },
  Mutation: {
    addLabel: async (parent, { title }) => await Label.create({ title }),
    deleteLabel: async (parent, { id }) => await Label.findByIdAndDelete(id),
    addTask: async (parent, { title }) => await Task.create({ title }),
    deleteTask: async (parent, { id }) => await Task.findByIdAndDelete(id),
  },
};
export default resolvers;
