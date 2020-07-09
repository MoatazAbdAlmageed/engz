const mongoose = require("mongoose");
const labelSchema = require("./labelSchema");

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
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);

module.exports = taskSchema;
