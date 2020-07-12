const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      searchable: true,
    },
    status: {
      type: Boolean,
      required: false,
    },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);
taskSchema.plugin(uniqueValidator);

module.exports = taskSchema;
