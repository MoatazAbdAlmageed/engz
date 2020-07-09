const mongoose = require("mongoose");
const labelSchema = require("./labelSchema");
module.exports = mongoose.model("Label", labelSchema);
