const Task = require("../models/taskModel");
const Label = require("../models/labelModel");
const { validationResult } = require("express-validator");

const create = async (req, res, next) => {
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
        // todo kill process (no need to reach Task.create)
        res.status(500).json({ statusCode: 500, message: "labels required!" });
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
    .then(async (task) => {
      // todo get labels [object] instead of [ids ]
      res
        .status(200)
        .json({ statusCode: 200, message: "task created!", payload: task });
    })
    .catch(next);
};
const list = (req, res) => {
  const { path, query } = req;

  const completed = path == "/completed/" ? true : false;
  tasks = Task.find({ title: { $regex: query.title } })
    .sort({ createdAt: -1 })
    .where({ status: completed ? true : false })
    .populate("labels")
    .then((tasks) => {
      res.status(200).send(tasks);
    });
  // tasks = Task
  //   .label
  //   // { title: { $regex: query.title } }
  //   ()
  //   .sort({ createdAt: -1 })
  //   .where({ status: completed ? true : false })
  //   .then((tasks) => {
  //     res.status(200).send(tasks);
  //   });
};

const tasksByLabel = async (req, res) => {
  const { id } = req.params;
  const label = await Label.findById(id).populate("tasks");
  console.log("🚀🚀🚀🚀🚀🚀 label");
  console.log(label);
  console.log("----------------------------------------------------");
  console.log();
  res.send(label.tasks);
};

const update = (req, res) => {
  const { _id, title, status, label } = req.body;
  if (!title) {
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
    console.log("🚀🚀🚀🚀🚀🚀 task");
    console.log(task);
    console.log("----------------------------------------------------");
    console.log();
    res
      .status(200)
      .json({ statusCode: 200, message: "task updated!", payload: task });
  });
};
const deleteItem = (req, res) => {
  Task.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ statusCode: 200, message: "task deleted!" });
  });
};
module.exports = { create, list, update, deleteItem, tasksByLabel };
