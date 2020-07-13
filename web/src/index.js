import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Tasks from "./Tasks";
import Labels from "./Labels";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
require("dotenv").config();
ReactDOM.render(
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/labels">Labels</Link>
          </li>{" "}
          <li>
            <Link to="/tasks">Tasks</Link>
            <ul>
              <li>
                <Link to="/completed-tasks">Completed Tasks</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact={true} path="/labels">
          <Labels />
        </Route>{" "}
        <Route exact={true} path="/tasks">
          <Tasks type="" />
        </Route>{" "}
        <Route exact={true} path="/completed-tasks">
          <Tasks type="completed" />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
