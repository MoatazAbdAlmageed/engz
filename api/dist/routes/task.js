"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const taskController_1 = __importDefault(require("../controllers/taskController"));
const taskCTRL = new taskController_1.default();
router.get("/", taskCTRL.list);
router.get("/label/:id", taskCTRL.tasksByLabel);
router.get("/completed", taskCTRL.list); //DELETE THIS
router.post("/", [body("title").isLength(10).not().isEmpty().trim().escape()], taskCTRL.create);
router.put("/", taskCTRL.update);
router.delete("/:id", taskCTRL.deleteItem);
module.exports = router;
