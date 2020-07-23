"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = __importStar(require("body-parser"));
const moment_1 = __importDefault(require("moment"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./db");
app.use(cors_1.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db_1.connection(() => {
    console.log(process.env.NODE_ENV);
    app.listen(process.env.PORT);
});
app.get("/", (req, res) => res.status(200).send({ message: "Welcome to our restful API" }));
// override with POST having ?_method=DELETE
app.use(method_override_1.default("_method"));
app.use(morgan_1.default("dev"));
app.use(express_1.default.static("public"));
app.use((req, res, next) => {
    res.locals.moment = moment_1.default;
    next();
});
// Tasks
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
