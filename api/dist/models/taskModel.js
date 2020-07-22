"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema_1 = __importDefault(require("./taskSchema"));
exports.default = mongoose_1.default.model("Task", taskSchema_1.default);
