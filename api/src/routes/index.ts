import express from "express";
const router = express.Router();
import task from "./task";
import label from "./label";
router.use("/tasks", task);
router.use("/labels", label);
export default router;
