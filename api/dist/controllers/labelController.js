"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const labelModel_1 = __importDefault(require("../models/labelModel"));
class LabelController {
    create(req, res, next) {
        const { title } = req.body;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        labelModel_1.default.create({ title })
            .then((label) => {
            res
                .status(200)
                .json({ statusCode: 200, message: "label created!", payload: label });
        })
            .catch(next);
    }
    list(req, res) {
        const { path, query } = req;
        labelModel_1.default.find({ title: { $regex: query.title } })
            .populate("tasks")
            .sort({ createdAt: -1 })
            .then((labels) => {
            res.status(200).send(labels);
        });
    }
    update(req, res) {
        const { _id, title } = req.body;
        if (!title) {
            // todo test and remove this validation
            res.status(400).json({ statusCode: 400, message: "title required!" });
        }
        labelModel_1.default.findByIdAndUpdate({ _id }, {
            title: title.trim(),
        }, { new: true }).then((label) => {
            res
                .status(200)
                .json({ statusCode: 200, message: "label updated!", payload: label });
        });
    }
    deleteItem(req, res) {
        labelModel_1.default.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ statusCode: 200, message: "label deleted!" });
        });
    }
}
exports.default = LabelController;
