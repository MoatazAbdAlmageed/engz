const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
});

userSchema.virtual("name.full").get(function () {
  return _.startCase(this.name.first + " " + this.name.last);
});

userSchema.virtual("name.full").set(function (value) {
  var bits = value.split(" ");
  this.name.first = bits[0];
  this.name.last = bits[1];
});

exports.User = mongoose.model("User", userSchema);
