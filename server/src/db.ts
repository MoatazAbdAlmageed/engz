import mongoose from "mongoose";
export const connection = (callback: () => void) => {
  mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", (data) => {
    console.log(data);
    callback();
  });
};
