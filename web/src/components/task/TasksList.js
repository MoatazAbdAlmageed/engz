import React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import styled from "styled-components";
import DynamicTable from "@atlaskit/dynamic-table";
import Moment from "react-moment";
import InlineEdit from "@atlaskit/inline-edit";
import Swal from "sweetalert2";
import { Checkbox } from "@atlaskit/checkbox";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Badge from "@atlaskit/badge";
import ReadViewContainer from "../shared/ReadViewContainer";

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function TasksList({ setLoading, type, tasks, setTasks }) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const tasksEndpoint = `${endpoint}/tasks`;
  const Wrapper = styled.div`
    min-width: 600px;
  `;

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
        setLoading(true);
        const taskApi = await fetch(`${tasksEndpoint}/${task._id}`, {
          method: "DELETE",
        });
        const taskData = await taskApi.json();
        if (taskData.statusCode === 200) {
          Swal.fire("Deleted!", "Task has been deleted.", "success");
          const newTasks = tasks.filter(function (tas) {
            return tas._id !== task._id;
          });
          setTasks(newTasks);
        }
        setLoading(false);
      }
    });
  };
  const updateTaskAPI = async (task) => {
    setLoading(true);
    const taskApi = await fetch(`${tasksEndpoint}/`, {
      method: "PUT",
      body: JSON.stringify({
        _id: task._id,
        title: task.title,
        status: task.status,
        // labels: task.labels, todo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      Swal.fire("Updated!", "Task has been updated.", "success");
      let newTasks = tasks.map((p) =>
        p._id === taskData.payload._id ? { ...taskData.payload } : p
      );

      // remove task if marked as completed
      if (type == "" && taskData.payload.status) {
        newTasks = newTasks.filter(function (el) {
          return el.status == false;
        });
      }
      // remove task if marked as uncompleted
      if (type == "completed" && !taskData.payload.status) {
        newTasks = newTasks.filter(function (el) {
          return el.status == true;
        });
      }
      setTasks(newTasks);
      setLoading(false);
    }
  };

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
        key: "label",
        content: "Label",
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
      key: createKey(task._id),
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
                  <TextField {...fieldProps} autoFocus />
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
          key: createKey(
            task.labels && task.labels.length ? task.labels[0].title : task._id
          ),
          content: task.labels && task.labels.length && (
            <ul>
              {task.labels.map((label) => (
                <li key={label._id}>
                  <Badge>{label.title}</Badge>
                </li>
              ))}
            </ul>
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
      <Wrapper>
        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={5}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          onSort={() => console.log("onSort")}
          onSetPage={() => console.log("onSetPage")}
        />
      </Wrapper>
    </>
  );
}

export default TasksList;
