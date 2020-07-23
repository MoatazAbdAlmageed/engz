"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const labelController_1 = __importDefault(require("../controllers/labelController"));
const labelCTRL = new labelController_1.default();
router.get("/", labelCTRL.list);
router.post("/", [express_validator_1.body("title").isLength({ min: 5 }).not().isEmpty().trim().escape()], labelCTRL.create);
router.put("/", labelCTRL.update);
router.delete("/:id", labelCTRL.deleteItem);
exports.default = router;
