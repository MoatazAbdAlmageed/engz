const mongoose = require("mongoose");
const labelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "General",
    },
  },
  { timestamps: true }
);

module.exports = labelSchema;
