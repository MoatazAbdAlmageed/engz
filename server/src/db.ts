import * as mongoose from "mongoose";
export const connection = () => {
  mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", (data) => {
    console.log("db open");
    if (data) {
      console.log(data);
    }
  });
};
