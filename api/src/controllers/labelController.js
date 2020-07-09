const Label = require("../models/labelModel");
const { validationResult } = require("express-validator");

const create = (req, res, next) => {
  const { title, label } = req.body;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Label.create({ title, label, status: false })
    .then((label) => {
      res
        .status(200)
        .json({ statusCode: 200, message: "label created!", payload: label });
    })
    .catch(next);
};
const list = (req, res) => {
  const { path, query } = req;
  labels = Label
    .find
    //   { title: { $regex: query.title } }
    ()

    .sort({ createdAt: -1 })
    .then((labels) => {
      res.status(200).send(labels);
    });
};
const update = (req, res) => {
  const { _id, title, status, label } = req.body;
  if (!title) {
    res.status(400).json({ statusCode: 400, message: "title required!" });
  }
  Label.findByIdAndUpdate(
    { _id },
    {
      title: title.trim(),
      status,
      label,
    },
    { new: true }
  ).then((label) => {
    console.log("🚀🚀🚀🚀🚀🚀 label");
    console.log(label);
    console.log("----------------------------------------------------");
    console.log();
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
