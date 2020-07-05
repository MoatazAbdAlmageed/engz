import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/tasks").then((tasks) => {
      setTasks(tasks);
    });
    console.log("🚀🚀🚀🚀🚀🚀 tasks");
    console.log(tasks);
    console.log("----------------------------------------------------");
    console.log();
  });
  return (
    <>
      <h2>Tasks</h2>
      {tasks && tasks.length && tasks.map((d) => <div>{d}</div>)}
    </>
  );
}

export default App;
