"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const labelSchema_1 = require("./labelSchema");
exports.default = mongoose.model("Label", labelSchema_1.default);
