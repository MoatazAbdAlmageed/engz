import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";

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
      default: false,
    },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(uniqueValidator);
export default taskSchema;
