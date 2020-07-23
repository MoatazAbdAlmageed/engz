"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const task_1 = require("./task");
const label_1 = require("./label");
router.use("/tasks", task_1.default);
router.use("/labels", label_1.default);
exports.default = router;
