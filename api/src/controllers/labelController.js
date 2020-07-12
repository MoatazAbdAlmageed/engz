const Label = require("../models/labelModel");
const { validationResult } = require("express-validator");

const create = (req, res, next) => {
  const { title } = req.body;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Label.create({ title })
    .then((label) => {
      res
        .status(200)
        .json({ statusCode: 200, message: "label created!", payload: label });
    })
    .catch(next);
};
const list = (req, res) => {
  const { path, query } = req;
  labels = Label.find({ title: { $regex: query.title } })
    .populate("tasks")
    .sort({ createdAt: -1 })
    .then((labels) => {
      res.status(200).send(labels);
    });
};
const update = (req, res) => {
  const { _id, title } = req.body;
  if (!title) {
    //todo test and remove this validation
    res.status(400).json({ statusCode: 400, message: "title required!" });
  }
  Label.findByIdAndUpdate(
    { _id },
    {
      title: title.trim(),
    },
    { new: true }
  ).then((label) => {
    res
      .status(200)
      .json({ statusCode: 200, message: "label updated!", payload: label });
  });
};
const deleteItem = (req, res) => {
  Label.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ statusCode: 200, message: "label deleted!" });
  });
};
module.exports = { create, list, update, deleteItem };
