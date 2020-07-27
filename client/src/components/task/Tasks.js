import { gql, useQuery } from "@apollo/client";
import Badge from "@atlaskit/badge";
import { Grid, GridColumn } from "@atlaskit/page";
import * as _ from "lodash";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import { GrayHeading } from "../styled/Heading";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

function Tasks(props) {
  const endpoint = process.env.REACT_APP_API_URL;
  const rowsPerPage = process.env.REACT_APP_ROWS_PER_PAGE;
  const tasksEndpoint = `${endpoint}/tasks`;
  const labelsEndpoint = `${endpoint}/labels`;
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [errors, setErrors] = useState([]);

  const GET_TASKS = gql`
    query getTasks {
      tasks {
        id
        title
        status
        createdAt
        updatedAt
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TASKS);
  if (loading) {
    <Loader type="Oval" color="#00BFFF" height={80} width={80} />;
  } else if (data) {
    const tasksArray = data.tasks;
    const tasksArr = _.filter(tasksArray, { status: false });
    const completed = _.filter(tasksArray, { status: true });
    setTasks(_.orderBy(tasksArr, ["cratedAt"], ["asc"]));
    setCompletedTasks(_.orderBy(completed, ["updatedAt"], ["desc"]));
  }

  const createTaskAPI = async (task) => {
    // todo use ApolloClient
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
    }
  };

  return (
    <>
      <TaskForm createTaskAPI={createTaskAPI} errors={errors} labels={labels} />

      <Grid>
        <GridColumn medium={6}>
          {tasks && (
            <Grid>
              <GridColumn>
                <GrayHeading>
                  Todo <Badge> {tasks.length}</Badge>
                </GrayHeading>
              </GridColumn>
            </Grid>
          )}
          <TasksList
            type={props.type}
            tasks={tasks}
            rowsPerPage={rowsPerPage}
            setTasks={setTasks}
          />
        </GridColumn>{" "}
        <GridColumn medium={6}>
          {completedTasks && (
            <Grid>
              <GridColumn>
                <GrayHeading>
                  Done <Badge> {completedTasks.length}</Badge>
                </GrayHeading>
              </GridColumn>
            </Grid>
          )}
          <TasksList
            type="completed-tasks"
            tasks={completedTasks}
            rowsPerPage={rowsPerPage}
            setTasks={setCompletedTasks}
          />
        </GridColumn>
      </Grid>
    </>
  );
}

export default Tasks;
