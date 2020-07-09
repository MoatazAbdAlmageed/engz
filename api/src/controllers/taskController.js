const Task = require("../models/taskModel");
const Label = require("../models/labelModel");
const { validationResult } = require("express-validator");

const create = (req, res, next) => {
  const { title, labels } = req.body;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Task.create({ title, labels, status: false })
    .then((task) => {
      task.labels.push(labels);
      res
        .status(200)
        .json({ statusCode: 200, message: "task created!", payload: task });
    })
    .catch(next);
};
const list = (req, res) => {
  const { path, query } = req;

  const completed = path == "/completed/" ? true : false;
  console.log();
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
module.exports = { create, list, update, deleteItem };
