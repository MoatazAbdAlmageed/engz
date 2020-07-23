import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import SearchForm from "./SearchForm";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

function Tasks(props) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const tasksEndpoint = `${endpoint}/tasks`;
  const labelsEndpoint = `${endpoint}/labels`;
  const [tasks, setTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const getLabels = async (search = "") => {
    setLoading(true);
    const labelApi = await fetch(
      `${labelsEndpoint}/${props.type}/?title=${search}`
    );
    const labelsArray = await labelApi.json();
    setLabels(labelsArray);
    setLoading(false);
  };

  const getTasks = async (search = "") => {
    setLoading(true);
    const tasksApi = await fetch(
      `${tasksEndpoint}/${props.type}/?title=${search}`
    );
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
    setLoading(false);
  };

  const createTaskAPI = async (task) => {
    setLoading(true);
    const taskApi = await fetch(`${tasksEndpoint}/`, {
      method: "POST",
      body: JSON.stringify({ title: task.title, labels: task.labels }),
      headers: { "Content-Type": "application/json" },
    });

    const taskData = await taskApi.json();
    if (taskData.errors) {
      setErrors(taskData.errors);
    }
    if (taskData.statusCode === 200) {
      setErrors([]);
      Swal.fire("Created!", "Task has been created.", "success");
      tasks.unshift(taskData.payload);
      setTasks(tasks);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLabels();
  }, [`${labelsEndpoint}`]);

  useEffect(() => {
    const title = `${props.type} Tasks | Engz`;
    document.title = title.toUpperCase();
    getTasks();
  }, [`${tasksEndpoint}/${props.type}`]);

  return (
    <>
      {loading ? (
        <>
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        </>
      ) : (
        <>
          <TaskForm
            createTaskAPI={createTaskAPI}
            errors={errors}
            labels={labels}
          />

          <h4 className="uppercase gray">
            {" "}
            {props.type} Tasks ({tasks.length}){" "}
          </h4>

          <SearchForm getTasks={getTasks} />

          <TasksList
            type={props.type}
            tasks={tasks}
            setTasks={setTasks}
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
}

export default Tasks;
