import React, { useState, useEffect } from "react";
require("dotenv").config();
function Tasks(props) {
  const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/tasks/`;
  console.log("🚀🚀🚀🚀🚀🚀 this.props");
  console.log(props);
  console.log("----------------------------------------------------");
  console.log();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);

  const getTasks = async () => {
    const tasksApi = await fetch(`${REACT_APP_API_URL}/${props.type}`);
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
  };

  const saveTaskAPI = async () => {
    const taskApi = await fetch(`${REACT_APP_API_URL}/create`, {
      method: "POST",
      body: JSON.stringify({ title: task }),
      headers: { "Content-Type": "application/json" },
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      getTasks();
      setTask("");
    }
  };

  const deleteTaskAPI = async (task) => {
    const taskApi = await fetch(`${REACT_APP_API_URL}/delete/${task._id}`, {
      method: "DELETE",
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      getTasks();
    }
  };
  useEffect(() => {
    getTasks();
  }, [`${REACT_APP_API_URL}/${props.type}`]);

  return (
    <>
      <input
        onChange={(e) => setTask(e.target.value)}
        type="text"
        value={task}
        placeholder="task title here"
      />
      <button onClick={saveTaskAPI}>Save</button>
      <h2>
        {props.type.toUpperCase()} Tasks {tasks.length}{" "}
      </h2>
      <ol>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}{" "}
            <button onClick={(e) => deleteTaskAPI(task)}>Delete</button>{" "}
          </li>
        ))}
      </ol>
    </>
  );
}

export default Tasks;
