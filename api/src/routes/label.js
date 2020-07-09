const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  create,
  list,
  update,
  deleteItem,
} = require("../controllers/labelController");
router.get("/", list);
router.post(
  "/",
  [body("title").isLength(5).not().isEmpty().trim().escape()],
  create
);
router.put("/", update);
router.delete("/:id", deleteItem);
module.exports = router;
