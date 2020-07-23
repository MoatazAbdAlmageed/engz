"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const labelModel_1 = __importDefault(require("../models/labelModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
class TaskController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            let { labels } = req.body;
            const errors = express_validator_1.validationResult(req);
            /**
             * If no labels passed , attach general label
             */
            if (!labels) {
                yield labelModel_1.default.findOne({ title: "General" }).then((label) => {
                    if (label) {
                        labels = [label._id];
                    }
                    else {
                        // todo kill process (no not need to reach Task.create)
                        res
                            .status(500)
                            .json({ statusCode: 500, message: "labels required!" });
                    }
                });
            }
            //
            // let labels = ["5f07426405ae1d51bc8d6432", "5f07408578dc82224c912eaf"]; // temp todo get label from req.body
            // Finds the validation errors in this request and wraps them in an object with handy functions
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            taskModel_1.default.create({ title, labels, status: false })
                .then((task) => __awaiter(this, void 0, void 0, function* () {
                // todo get labels [object] instead of [ids ]
                res
                    .status(200)
                    .json({ statusCode: 200, message: "task created!", payload: task });
            }))
                .catch(next);
        });
    }
    list(req, res) {
        const { path, query } = req;
        const completed = path === "/completed/" ? true : false;
        taskModel_1.default.find({ title: { $regex: query.title } })
            .sort({ createdAt: -1 })
            .where({ status: completed ? true : false })
            .populate("labels")
            .then((tasks) => {
            res.status(200).send(tasks);
        });
    }
    tasksByLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const label = yield labelModel_1.default.findById(id).populate("tasks");
            res.send(label.tasks);
        });
    }
    update(req, res) {
        const { _id, title, status, label } = req.body;
        if (!title) {
            // todo test and remove this validation
            res.status(400).json({ statusCode: 400, message: "title required!" });
        }
        taskModel_1.default.findByIdAndUpdate({ _id }, {
            title: title.trim(),
            status,
            label,
        }, { new: true }).then((task) => {
            res
                .status(200)
                .json({ statusCode: 200, message: "task updated!", payload: task });
        });
    }
    deleteItem(req, res) {
        taskModel_1.default.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ statusCode: 200, message: "task deleted!" });
        });
    }
}
exports.default = TaskController;
