import React, { useState, useEffect } from "react";
require("dotenv").config();
function Tasks(props) {
  const getTasksUrl = `${process.env.REACT_APP_API_URL}/tasks/${props.type}`;
  const createTasksUrl = `${process.env.REACT_APP_API_URL}/tasks/create`;
  console.log("🚀🚀🚀🚀🚀🚀 this.props");
  console.log(props);
  console.log("----------------------------------------------------");
  console.log();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);

  const getTasks = async () => {
    const tasksApi = await fetch(getTasksUrl);
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
  };

  const saveTaskAPI = async () => {
    const taskApi = await fetch(createTasksUrl, {
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
  useEffect(() => {
    getTasks();
  }, [getTasksUrl, createTasksUrl]);

  return (
    <>
      <input
        onChange={(e) => setTask(e.target.value)}
        type="text"
        value={task}
        placeholder="task title here"
      />
      <button onClick={saveTaskAPI}>Save</button>
      <h2>{props.type.toUpperCase()} Tasks</h2>
      <ol>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ol>
    </>
  );
}

export default Tasks;
