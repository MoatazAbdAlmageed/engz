import * as mongoose from "mongoose";
import taskSchema from "./taskSchema";

export default mongoose.model("Task", taskSchema);
