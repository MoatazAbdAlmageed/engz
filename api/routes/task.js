const express = require("express");
const router = express.Router();
const {
  create,
  list,
  update,
  deleteItem,
} = require("../controllers/taskController");
router.get("/", list);
router.get("/completed", list);
router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteItem);
module.exports = router;
