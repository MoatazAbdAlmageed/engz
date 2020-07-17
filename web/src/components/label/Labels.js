import React, { useState, useEffect } from "react";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import styled from "styled-components";
import DynamicTable from "@atlaskit/dynamic-table";
import Moment from "react-moment";
import InlineEdit from "@atlaskit/inline-edit";
import { fontSize, gridSize } from "@atlaskit/theme";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import Swal from "sweetalert2";
import { Checkbox, CheckboxIcon } from "@atlaskit/checkbox";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Badge from "@atlaskit/badge";
import SearchForm from "./SearchForm";
import LabelForm from "./LabelForm";
import ReadViewContainer from "../shared/ReadViewContainer";

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function Labels(props) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const labelsEndpoint = `${endpoint}/labels`;

  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const Wrapper = styled.div`
    min-width: 600px;
  `;

  const getLabels = async (search = "") => {
    setLoading(true);
    const labelsApi = await fetch(`${labelsEndpoint}/?title=${search}`);
    const labelsArray = await labelsApi.json();
    setLabels(labelsArray);
    setLoading(false);
  };

  const createTaskAPI = async (label) => {
    setLoading(true);
    const taskApi = await fetch(`${labelsEndpoint}/`, {
      method: "POST",
      body: JSON.stringify({ title: label }),
      headers: { "Content-Type": "application/json" },
    });
    const taskData = await taskApi.json();
    // todo set errors
    if (taskData.errors) {
      setErrors(taskData.errors);
    }
    if (taskData.statusCode === 200) {
      setErrors([]);
      Swal.fire("Created!", "Label has been created.", "success");

      labels.unshift(taskData.payload);
      setLabels(labels);
    }
    setLoading(false);
  };

  // todo use this
  const deleteTaskAPI = (label) => {
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
        const taskApi = await fetch(`${labelsEndpoint}/${label._id}`, {
          method: "DELETE",
        });
        const taskData = await taskApi.json();
        if (taskData.statusCode === 200) {
          Swal.fire("Deleted!", "Label has been deleted.", "success");
          const newLabels = labels.filter(function (_lable) {
            return _lable._id !== label._id;
          });
          setLabels(newLabels);
        }
        setLoading(false);
      }
    });
  };
  const updateTaskAPI = async (label) => {
    setLoading(true);
    const taskApi = await fetch(`${labelsEndpoint}/`, {
      method: "PUT",
      body: JSON.stringify({
        _id: label._id,
        title: label.title,
        status: label.status,
        // labels: label.labels, todo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const taskData = await taskApi.json();
    if (taskData.statusCode === 200) {
      Swal.fire("Updated!", "Label has been updated.", "success");
      let newLabels = labels.map((p) =>
        p._id === taskData.payload._id ? { ...taskData.payload } : p
      );

      // remove label if marked as completed
      if (props.type == "" && taskData.payload.status) {
        newLabels = newLabels.filter(function (el) {
          return el.status == false;
        });
      }
      // remove label if marked as uncompleted
      if (props.type == "completed" && !taskData.payload.status) {
        newLabels = newLabels.filter(function (el) {
          return el.status == true;
        });
      }
      setLabels(newLabels);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Labels" | Engz ';
    getLabels();
  }, [`${labelsEndpoint}/${props.type}`]);

  const head = {
    cells: [
      {
        key: "title",
        content: "Title",
      },
      {
        key: "tasks",
        content: "Tasks",
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
    labels.length &&
    labels.map((label) => ({
      key: createKey(label._id),
      cells: [
        {
          key: createKey(label.title),
          content: (
            <div>
              {" "}
              <InlineEdit
                defaultValue={label.title}
                editView={(fieldProps) => (
                  <TextField {...fieldProps} autoFocus />
                )}
                readView={() => (
                  <ReadViewContainer>
                    {label.title || "Click to enter value"}
                  </ReadViewContainer>
                )}
                onConfirm={(value) => {
                  updateTaskAPI({ ...label, title: value });
                }}
              />{" "}
            </div>
          ),
          isSortable: true,
        },
        {
          key: createKey(label._id),
          content: <Badge>{label.tasks && label.tasks.length}</Badge>,
          isSortable: true,
        },
        {
          key: createKey(label.createdAt),
          content: (
            <p>
              <Moment fromNow>{label.createdAt}</Moment>
            </p>
          ),
          isSortable: true,
        },
        {
          key: createKey(label.updatedAt),
          content: (
            <p>
              <Moment fromNow>{label.updatedAt}</Moment>
            </p>
          ),
          isSortable: true,
        },
        {
          key: createKey(label._id),
          content: (
            <p>
              <Button appearance="danger" onClick={() => deleteTaskAPI(label)}>
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
      {loading ? (
        <>
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        </>
      ) : (
        <>
          {!props.type && (
            <LabelForm createTaskAPI={createTaskAPI} errors={errors} />
          )}
          <h4 className="gray"> {labels.length} Labels</h4>

          <SearchForm getLabels={getLabels} />

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
      )}
    </>
  );
}

export default Labels;
