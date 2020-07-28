import { useQuery } from "@apollo/client";
import Badge from "@atlaskit/badge";
import { Grid, GridColumn } from "@atlaskit/page";
import * as _ from "lodash";
import React from "react";
import Loader from "react-loader-spinner";
import { GET_TASKS } from "../../queries/queries.js";
import { GrayHeading } from "../styled/Heading";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

function Tasks(props) {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) {
    console.log("loading");
    return <Loader type="Oval" color="#00BFFF" height={80} width={80} />;
  }
  if (error) {
    console.error("error");
    console.error(error);
    return <div>Error!</div>;
  }

  const tasksArray = data.tasks;
  const tasks = _.orderBy(
    _.filter(tasksArray, { status: false }),
    ["updatedAt"],
    ["desc"]
  );
  const completedTasks = _.orderBy(
    _.filter(tasksArray, { status: true }),
    ["updatedAt"],
    ["desc"]
  );

  return (
    <>
      <TaskForm />

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
          <TasksList type={props.type} tasks={tasks} />
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
          <TasksList type="completed-tasks" tasks={completedTasks} />
        </GridColumn>
      </Grid>
    </>
  );
}

export default Tasks;
