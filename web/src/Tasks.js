import React, { useState, useEffect } from "react";
require("dotenv").config();

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const tasksApi = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
  };

  useEffect(() => {
    getTasks();
  }, 0);
  return (
    <>
      <h2>Tasks</h2>
      <ol>
        {tasks.map((task) => (
          <li>{task.title}</li>
        ))}
      </ol>
    </>
  );
}

export default Tasks;
