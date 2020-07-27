import { Grid, GridColumn } from "@atlaskit/page";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import { GrayHeading } from "../styled/Heading";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

function Tasks(props) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const rowsPerPage = process.env.REACT_APP_ROWS_PER_PAGE;
  const tasksEndpoint = `${endpoint}/tasks`;
  const labelsEndpoint = `${endpoint}/labels`;
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const getLabels = async (search = "") => {
    setLoading(true);
    const labelApi = await fetch(`${labelsEndpoint}/?title=${search}`);
    const labelsArray = await labelApi.json();
    setLabels(labelsArray);
    setLoading(false);
  };

  const getTasks = async (type = "", search = "") => {
    setLoading(true);
    const tasksApi = await fetch(`${tasksEndpoint}/${type}/?title=${search}`);
    const tasksArray = await tasksApi.json();
    const tasks = _.filter(tasksArray, { status: false });
    const completed = _.filter(tasksArray, { status: true });
    setTasks(_.orderBy(tasks, ["cratedAt"], ["asc"]));
    setCompletedTasks(_.orderBy(completed, ["updatedAt"], ["desc"]));

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
    // getTasks("completed");
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

          <Grid>
            <GridColumn medium={6}>
              {tasks && (
                <Grid>
                  <GridColumn>
                    <GrayHeading>Todo {tasks.length}</GrayHeading>
                  </GridColumn>
                </Grid>
              )}
              <TasksList
                type={props.type}
                tasks={tasks}
                rowsPerPage={rowsPerPage}
                setTasks={setTasks}
                setLoading={setLoading}
              />
            </GridColumn>{" "}
            <GridColumn medium={6}>
              {completedTasks && (
                <Grid>
                  <GridColumn>
                    <GrayHeading>Done {completedTasks.length}</GrayHeading>
                  </GridColumn>
                </Grid>
              )}
              <TasksList
                type="completed-tasks"
                tasks={completedTasks}
                rowsPerPage={rowsPerPage}
                setTasks={setCompletedTasks}
                setLoading={setLoading}
              />
            </GridColumn>
          </Grid>
        </>
      )}
    </>
  );
}

export default Tasks;
