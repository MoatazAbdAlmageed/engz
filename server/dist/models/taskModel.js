"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const taskSchema_1 = require("./taskSchema");
exports.default = mongoose.model("Task", taskSchema_1.default);
