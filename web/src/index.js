import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Tasks from "./components/task/Tasks";
import Labels from "./components/label/Labels";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Wrapper from "./components/styled/Wrapper";
import GlobalSyle from "./theme/GlobalSyle";
import Theme from "./theme/theme";
import { ThemeProvider } from "styled-components";

require("dotenv").config();
ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Router>
      <GlobalSyle />
      <Wrapper>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            Engz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/labels">
                Labels
              </Nav.Link>
              <Nav.Link as={Link} to="/tasks">
                Tasks
              </Nav.Link>
              <Nav.Link as={Link} to="/completed-tasks">
                Completed Tasks
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
      </Wrapper>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
