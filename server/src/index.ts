import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as methodOverride from "method-override";
import * as moment from "moment";
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
import * as morgan from "morgan";
import { connection } from "./db";
import resolvers from "./resolvers";
import routes from "./routes";
import typeDefs from "./typeDefs";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to our restful API" })
);

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

app.use("/api", routes);

// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app });

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connection();

server.applyMiddleware({ app, path: "/graphql" });
app.listen({ port: process.env.PORT }, () => {
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});

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

// should be in the end !!
app.use((req, res, next) => {
  res.json({ error: "404" });
});
