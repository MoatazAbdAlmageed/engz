const Task = require("../models/task");
const create = (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.redirect("/");
  }
  const task = new Task({ title: title.trim(), status: false });
  task.save().then(() => {
    res
      .status(200)
      .json({ statusCode: 200, message: "task created!", payload: task });
  });
};
const list = (req, res) => {
  const completed = req.url == "/completed" ? true : false;
  tasks = Task.find()
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
      // status: false, // todo update this (get status from )
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
