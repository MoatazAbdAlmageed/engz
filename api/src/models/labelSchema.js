const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const labelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      default: "General",
    },
    // tasks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Task",
    //   },
    // ],
  },
  { timestamps: true }
);
labelSchema.plugin(uniqueValidator);
module.exports = labelSchema;
