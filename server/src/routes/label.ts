import * as express from "express";
const router = express.Router();
import { body } from "express-validator";

import labelController from "../controllers/labelController";
const labelCTRL = new labelController();
router.get("/", labelCTRL.list);
router.post(
  "/",
  [body("title").isLength({ min: 5 }).not().isEmpty().trim().escape()],
  labelCTRL.create
);
router.put("/", labelCTRL.update);
router.delete("/:id", labelCTRL.deleteItem);
export default router;
