import * as mongoose from "mongoose";
import labelSchema from "./labelSchema";

export default mongoose.model("Label", labelSchema);
