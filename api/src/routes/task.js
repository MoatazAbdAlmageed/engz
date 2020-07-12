const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  create,
  list,
  update,
  deleteItem,
  tasksByLabel,
} = require("../controllers/taskController");
router.get("/", list);
router.get("/label/:id", tasksByLabel);
router.get("/completed", list); //DELETE THIS
router.post(
  "/",
  [body("title").isLength(10).not().isEmpty().trim().escape()],
  create
);
router.put("/", update);
router.delete("/:id", deleteItem);
module.exports = router;
