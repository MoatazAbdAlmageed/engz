"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        searchable: true,
    },
    status: {
        type: Boolean,
        required: false,
    },
    labels: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Label" }],
}, {
    timestamps: true,
});
taskSchema.plugin(mongoose_unique_validator_1.default);
exports.default = taskSchema;
