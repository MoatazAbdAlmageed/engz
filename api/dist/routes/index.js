"use strict";
const express = require("express");
const router = express.Router();
router.use("/tasks", require("./task"));
router.use("/labels", require("./label"));
module.exports = router;
