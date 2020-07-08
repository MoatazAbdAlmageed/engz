const Task = require("../models/task");
const { validationResult } = require("express-validator");

const create = (req, res, next) => {
  const { title } = req.body;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //todo use express validation
  Task.create([{ title: title.trim(), status: false }])
    .then((task) => {
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
    .then((tasks) => {
      res.status(200).send(tasks);
    });
};
const update = (req, res) => {
  const { _id, title, status } = req.body;
  if (!title) {
    res.status(400).json({ statusCode: 400, message: "title required!" });
  }
  Task.findByIdAndUpdate(
    { _id },
    {
      title: title.trim(),
      status, // todo update this (get status from )
    },
    { new: true },
    (err, task) => {
      console.log();
      if (err) {
        res.send(err);
      } else {
        res
          .status(200)
          .json({ statusCode: 200, message: "task updated!", payload: task });
      }
    }
  );
};
const deleteItem = (req, res) => {
  Task.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ statusCode: 200, message: "task deleted!" });
  });
};
module.exports = { create, list, update, deleteItem };
