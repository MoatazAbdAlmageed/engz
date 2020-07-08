const mongoose = require("mongoose");
const searchable = require("mongoose-regex-search");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      searchable: true,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);
taskSchema.plugin(searchable);
module.exports = mongoose.model("Task", taskSchema);
