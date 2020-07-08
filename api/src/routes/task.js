const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  create,
  list,
  update,
  deleteItem,
} = require("../controllers/taskController");
router.get("/", list);
router.get("/completed", list);
router.post(
  "/create",
  [body("title").isLength(10).not().isEmpty().trim().escape()],
  create
);
router.put("/update", update);
router.delete("/delete/:id", deleteItem);
module.exports = router;
