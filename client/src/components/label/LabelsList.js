import { useMutation } from "@apollo/client";
import Badge from "@atlaskit/badge";
import Button from "@atlaskit/button";
import DynamicTable from "@atlaskit/dynamic-table";
import InlineEdit from "@atlaskit/inline-edit";
import TextField from "@atlaskit/textfield";
import React from "react";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { DELETE_LABEL } from "../../graphql/mutations.js";
import ReadViewContainer from "../styled/ReadViewContainer";
import Wrapper from "../styled/Wrapper";
const rowsPerPage = process.env.REACT_APP_ROWS_PER_PAGE | 5;

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}
function LabelsList({ labels }) {
  const [deleteLabel] = useMutation(DELETE_LABEL);

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
        const status = await deleteLabel({ variables: { id: label.id } });
        if (status.data.deleteLabel) {
          Swal.fire("Deleted!", "Label has been deleted.", "success");
          //todo remove from list
          //   const newLabels = labels.filter(function (_lable) {
          //     return _lable._id !== label._id;
          //   });
        }
      }
    });
  };

  const updateApi = async (label) => {
    // const labelApi = await fetch(`${labelsEndpoint}/`, {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     _id: label._id,
    //     title: label.title,
    //     status: label.status,
    //     // labels: label.labels, todo
    //   }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    // const labelData = await labelApi.json();
    // if (labelData.statusCode === 200) {
    //   Swal.fire("Updated!", "Label has been updated.", "success");
    //   let newLabels = labels.map((p) =>
    //     p._id === labelData.payload._id ? { ...labelData.payload } : p
    //   );
    // }
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
          rowsPerPage={rowsPerPage}
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
