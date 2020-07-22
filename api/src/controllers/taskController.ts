import { validationResult } from "express-validator";
import Label from "../models/labelModel";
import Task from "../models/taskModel";
import IController from "../types/IController";
import ITask from "../types/ITask";

export default class TaskController implements IController {
  async create(req, res, next) {
    const { title } = req.body;
    let { labels } = req.body;
    const errors = validationResult(req);

    /**
     * If no labels passed , attach general label
     */
    if (!labels) {
      await Label.findOne({ title: "General" }).then((label) => {
        if (label) {
          labels = [label._id];
        } else {
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

    Task.create({ title, labels, status: false })
      .then(async (task: ITask) => {
        // todo get labels [object] instead of [ids ]
        res
          .status(200)
          .json({ statusCode: 200, message: "task created!", payload: task });
      })
      .catch(next);
  }
  list(req, res) {
    const { path, query } = req;

    const completed = path == "/completed/" ? true : false;
    Task.find({ title: { $regex: query.title } })
      .sort({ createdAt: -1 })
      .where({ status: completed ? true : false })
      .populate("labels")
      .then((tasks) => {
        res.status(200).send(tasks);
      });
  }

  async tasksByLabel(req, res) {
    const { id } = req.params;
    const label = await Label.findById(id).populate("tasks");
    res.send(label.tasks);
  }

  update(req, res) {
    const { _id, title, status, label } = req.body;
    if (!title) {
      //todo test and remove this validation
      res.status(400).json({ statusCode: 400, message: "title required!" });
    }
    Task.findByIdAndUpdate(
      { _id },
      {
        title: title.trim(),
        status,
        label,
      },
      { new: true }
    ).then((task) => {
      res
        .status(200)
        .json({ statusCode: 200, message: "task updated!", payload: task });
    });
  }
  deleteItem(req, res) {
    Task.findByIdAndDelete(req.params.id).then(() => {
      res.status(200).json({ statusCode: 200, message: "task deleted!" });
    });
  }
}
