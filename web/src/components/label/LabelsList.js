import React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import DynamicTable from "@atlaskit/dynamic-table";
import Moment from "react-moment";
import InlineEdit from "@atlaskit/inline-edit";
import Swal from "sweetalert2";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Badge from "@atlaskit/badge";
import ReadViewContainer from "../shared/ReadViewContainer";
import Wrapper from "../shared/Wrapper";

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function LabelsList({ setLoading, labels, setLabels }) {
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const labelsEndpoint = `${endpoint}/labels`;

  // todo use this
  const deleteApi = (label) => {
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
        const labelApi = await fetch(`${labelsEndpoint}/${label._id}`, {
          method: "DELETE",
        });
        const labelData = await labelApi.json();
        if (labelData.statusCode === 200) {
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

  const updateApi = async (label) => {
    setLoading(true);
    const labelApi = await fetch(`${labelsEndpoint}/`, {
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
    const labelData = await labelApi.json();
    if (labelData.statusCode === 200) {
      Swal.fire("Updated!", "Label has been updated.", "success");
      let newLabels = labels.map((p) =>
        p._id === labelData.payload._id ? { ...labelData.payload } : p
      );
      setLabels(newLabels);
      setLoading(false);
    }
  };

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
                  updateApi({ ...label, title: value });
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
              <Button appearance="danger" onClick={() => deleteApi(label)}>
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
export default LabelsList;
