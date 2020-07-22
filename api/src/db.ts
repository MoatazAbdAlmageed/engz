import mongoose from "mongoose";
const connection = (callback) => {
  mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", (data) => {
    callback();
  });
};
module.exports = { connection };
