const express = require("express");
const router = express.Router();
router.use("/tasks", require("./task"));
module.exports = router;
