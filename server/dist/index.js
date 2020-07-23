"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_graphql_1 = require("express-graphql");
const app = express();
const cors = require("cors");
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
const bodyParser = require("body-parser");
const moment = require("moment");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const routes_1 = require("./routes");
const db_1 = require("./db");
const RootQuery_1 = require("./schema/RootQuery");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db_1.connection(() => {
    console.log(process.env.NODE_ENV);
    app.listen(process.env.PORT);
});
app.get("/", (req, res) => res.status(200).send({ message: "Welcome to our restful API" }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});
// Tasks
app.use("/graphql", express_graphql_1.graphqlHTTP({ schema: RootQuery_1.default, graphiql: true }));
app.use("/api", routes_1.default);
/**
 * Error handler middleware
 */
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.log("err");
        console.log(err);
    }
    res.status(500).send(err.message);
});
app.use((req, res, next) => {
    res.json({ error: "404" });
});
