import React, { useState, useEffect } from "react";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import styled from "styled-components";
import DynamicTable from "@atlaskit/dynamic-table";

function Tasks(props) {
  console.log("🚀🚀🚀🚀🚀🚀 props");
  console.log(props);
  console.log("----------------------------------------------------");
  console.log();
  const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/tasks/`;
  const [tasks, setTasks] = useState([]);

  const Wrapper = styled.div`
    min-width: 600px;
  `;
  const getTasks = async () => {
    const tasksApi = await fetch(`${REACT_APP_API_URL}/${props.type}`);
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
  };

  const saveTaskAPI = async (task) => {
    const taskApi = await fetch(`${REACT_APP_API_URL}/create`, {
      method: "POST",
      body: JSON.stringify({ title: task }),
      headers: { "Content-Type": "application/json" },
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      getTasks();
    }
  };

  const deleteTaskAPI = async (task) => {
    if (!window.confirm("Delete the item?")) {
      return;
    }

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

  // todo move TaskForm to another component
  const TaskForm = () => (
    <Form onSubmit={(data) => saveTaskAPI(data.task)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="task" defaultValue="" label="Task" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Button type="submit" appearance="primary">
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
  const head = {
    cells: [
      {
        key: "title",
        content: "Title",
      },
    ],
  };
  const rows =
    tasks.length &&
    tasks.map((task) => ({
      key: task._id,
      cells: [
        {
          key: "task.title",
          content: <p>{task.title}</p>,
          isSortable: true,
        },
      ],
    }));
  return (
    <>
      <TaskForm />
      <h2>Tasks</h2>

      <Wrapper>
        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={() => console.log("onSort")}
          onSetPage={() => console.log("onSetPage")}
        />
      </Wrapper>
    </>
  );
}

export default Tasks;
