"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const express_validator_1 = require("express-validator");
const taskController_1 = require("../controllers/taskController");
const taskCTRL = new taskController_1.default();
router.get("/", taskCTRL.list);
router.get("/label/:id", taskCTRL.tasksByLabel);
router.get("/completed", taskCTRL.list); // DELETE THIS
router.post("/", [express_validator_1.body("title").isLength({ min: 10 }).not().isEmpty().trim().escape()], taskCTRL.create);
router.put("/", taskCTRL.update);
router.delete("/:id", taskCTRL.deleteItem);
exports.default = router;
