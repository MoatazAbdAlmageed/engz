"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const labelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        default: "General",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
labelSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "labels",
});
labelSchema.plugin(uniqueValidator);
exports.default = labelSchema;
