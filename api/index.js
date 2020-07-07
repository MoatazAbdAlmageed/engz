const express = require("express");
const app = express();
const cors = require("cors");
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
const bodyParser = require("body-parser");
const moment = require("moment");
const methodOverride = require("method-override");
require("dotenv").config();
const routes = require("./routes/");
const { connection } = require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection(() => {
  app.listen(process.env.PORT);
});

app.get("/", function (req, res) {
  res.status(200).send({ message: "Welcome to our restful API" });
});

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(morgan("dev"));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

// Tasks
app.use("/api", routes);

app.use((req, res) => {
  res.json({ error: "404" });
});
