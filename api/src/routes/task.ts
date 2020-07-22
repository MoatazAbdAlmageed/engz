const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

import taskController from "../controllers/taskController";
const taskCTRL = new taskController();
router.get("/", taskCTRL.list);
router.get("/label/:id", taskCTRL.tasksByLabel);
router.get("/completed", taskCTRL.list); //DELETE THIS
router.post(
  "/",
  [body("title").isLength(10).not().isEmpty().trim().escape()],
  taskCTRL.create
);
router.put("/", taskCTRL.update);
router.delete("/:id", taskCTRL.deleteItem);
module.exports = router;
