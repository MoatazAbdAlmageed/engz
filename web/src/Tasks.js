import React, { useState, useEffect } from "react";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import styled from "styled-components";
import DynamicTable from "@atlaskit/dynamic-table";
import Moment from "react-moment";
import InlineEdit from "@atlaskit/inline-edit";
import { fontSize, gridSize } from "@atlaskit/theme";
import Textfield from "@atlaskit/textfield";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import Swal from "sweetalert2";
import { Checkbox, CheckboxIcon } from "@atlaskit/checkbox";

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function Tasks(props) {
  const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/tasks`;
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const title = `(${tasks.length}) ` + (props.type ? props.type : "Todo");
  const Wrapper = styled.div`
    min-width: 600px;
  `;

  const ButtonWrapper = styled.div`
    margin-top: 1.9em;
  `;
  const getTasks = async () => {
    const tasksApi = await fetch(`${REACT_APP_API_URL}/${props.type}`);
    const tasksArray = await tasksApi.json();
    setTasks(tasksArray);
  };

  const createTaskAPI = async (task) => {
    const taskApi = await fetch(`${REACT_APP_API_URL}/create`, {
      method: "POST",
      body: JSON.stringify({ title: task }),
      headers: { "Content-Type": "application/json" },
    });
    const taskData = await taskApi.json();
    // todo set errors
    if (taskData.errors) {
      setErrors(taskData.errors);
    }
    if (taskData.statusCode === 200) {
      setErrors([]);
      Swal.fire("Created!", "Task has been created.", "success");
      getTasks();
    }
  };

  // todo use this
  const deleteTaskAPI = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        const taskApi = await fetch(`${REACT_APP_API_URL}/delete/${task._id}`, {
          method: "DELETE",
        });
        const taskData = await taskApi.json();
        if (taskData.statusCode === 200) {
          Swal.fire("Deleted!", "Task has been deleted.", "success");
          getTasks();
        }
      }
    });
  };
  const updateTaskAPI = async (task) => {
    const taskApi = await fetch(`${REACT_APP_API_URL}/update`, {
      method: "PUT",
      body: JSON.stringify({
        _id: task._id,
        title: task.title,
        status: task.status,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      Swal.fire("Updated!", "Task has been updated.", "success");
      getTasks();
    }
  };

  useEffect(() => {
    document.title = title.toUpperCase() + " | Engz";
    getTasks();
  }, [`${REACT_APP_API_URL}/${props.type}`]);

  // todo move TaskForm to another component
  const TaskForm = () => (
    <Form onSubmit={(data) => createTaskAPI(data.task)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Page>
            <Grid>
              <GridColumn medium={8}>
                <Field name="task" defaultValue="" label="Task" isRequired>
                  {({ fieldProps }) => (
                    <TextField minlength={10} {...fieldProps} />
                  )}
                </Field>{" "}
              </GridColumn>
              <GridColumn medium={4}>
                <ButtonWrapper>
                  <Button type="submit" appearance="primary">
                    Submit
                  </Button>{" "}
                </ButtonWrapper>
              </GridColumn>
            </Grid>
            {errors && errors.length && (
              <ul className="validation">
                {errors.map((error) => (
                  <li>{error.msg}</li>
                ))}
              </ul>
            )}
          </Page>
        </form>
      )}
    </Form>
  );

  const ReadViewContainer = styled.div`
    display: flex;
    font-size: ${fontSize()}px;
    line-height: ${(gridSize() * 2.5) / fontSize()};
    max-width: 100%;
    min-height: ${(gridSize() * 2.5) / fontSize()}em;
    padding: ${gridSize()}px ${gridSize() - 2}px;
    word-break: break-word;
  `;

  const head = {
    cells: [
      {
        key: "Check",
        content: "Check",
      },
      {
        key: "title",
        content: "Title",
      },
      {
        key: "createdAt",
        content: "createdAt",
      },
      {
        key: "updatedAt",
        content: "updatedAt",
      },
      {
        key: "DeleteAction",
        content: "Delete?",
      },
    ],
  };
  const rows =
    tasks.length &&
    tasks.map((task) => ({
      key: task._id,
      cells: [
        {
          key: createKey("check"),
          content: (
            <p>
              <Checkbox
                defaultChecked={task.status ? " checked" : ""}
                onChange={(e) => {
                  updateTaskAPI({
                    ...task,
                    status: !task.status,
                  });
                }}
                name="checkbox-basic"
              />
            </p>
          ),
          isSortable: true,
        },
        {
          key: createKey(task.title),
          content: (
            <div>
              {" "}
              <InlineEdit
                defaultValue={task.title}
                editView={(fieldProps) => (
                  <Textfield {...fieldProps} autoFocus />
                )}
                readView={() => (
                  <ReadViewContainer>
                    {task.title || "Click to enter value"}
                  </ReadViewContainer>
                )}
                onConfirm={(value) => {
                  updateTaskAPI({ ...task, title: value });
                }}
              />{" "}
            </div>
          ),
          isSortable: true,
        },
        {
          key: createKey(task.createdAt),
          content: (
            <p>
              <Moment fromNow>{task.createdAt}</Moment>
            </p>
          ),
          isSortable: true,
        },
        {
          key: createKey(task.updatedAt),
          content: (
            <p>
              <Moment fromNow>{task.updatedAt}</Moment>
            </p>
          ),
          isSortable: true,
        },
        {
          key: createKey(task._id),
          content: (
            <p>
              <Button appearance="danger" onClick={() => deleteTaskAPI(task)}>
                Delete
              </Button>
            </p>
          ),
          isSortable: true,
        },
      ],
    }));
  return (
    <>
      {!props.type && <TaskForm />}
      <h2 className="uppercase">{title} tasks</h2>

      <Wrapper>
        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={5}
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
