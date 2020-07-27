import Button from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import DynamicTable from "@atlaskit/dynamic-table";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import InlineEdit from "@atlaskit/inline-edit";
import TextField from "@atlaskit/textfield";
import React from "react";
import Swal from "sweetalert2";
import ReadViewContainer from "../styled/ReadViewContainer";
function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function TasksList({ setLoading, type, tasks, setTasks, rowsPerPage = 5 }) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const tasksEndpoint = `${endpoint}/tasks`;

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
      if (type === "" && taskData.payload.status) {
        newTasks = newTasks.filter(function (el) {
          return el.status === false;
        });
      }
      // remove task if marked as uncompleted
      if (type === "completed" && !taskData.payload.status) {
        newTasks = newTasks.filter(function (el) {
          return el.status === true;
        });
      }
      setTasks(newTasks);
      setLoading(false);
    }
  };

  const head = {
    cells: [
      {
        key: "Status",
        content: "Status",
      },
      {
        key: "title",
        content: "Title",
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
          key: createKey(task._id),
          content: (
            <p>
              <Button
                title="Delete"
                iconBefore={<TrashIcon />}
                appearance="danger"
                onClick={() => deleteTaskAPI(task)}
              ></Button>
            </p>
          ),
          isSortable: true,
        },
      ],
    }));
  return (
    <>
      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={rowsPerPage}
        defaultPage={1}
        loadingSpinnerSize="small"
        isLoading={false}
        isFixedSize
        onSort={() => console.log("onSort")}
        onSetPage={() => console.log("onSetPage")}
      />
    </>
  );
}

export default TasksList;
