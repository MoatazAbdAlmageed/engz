import { useQuery } from "@apollo/client";
import Button from "@atlaskit/button";
import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from "@atlaskit/dropdown-menu";
import Form, { Field } from "@atlaskit/form";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import TextField from "@atlaskit/textfield";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { GET_LABELS } from "../../queries/queries.js";
import ButtonWrapper from "../styled/ButtonWrapper";

const createTaskAPI = async (task) => {
  // // todo use ApolloClient
  // const taskApi = await fetch(`${tasksEndpoint}/`, {
  //   method: "POST",
  //   body: JSON.stringify({ title: task.title, labels: task.labels }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const taskData = await taskApi.json();
  // if (taskData.errors) {
  //   setErrors(taskData.errors);
  // }
  // if (taskData.statusCode === 200) {
  //   setErrors([]);
  //   Swal.fire("Created!", "Task has been created.", "success");
  //   tasks.unshift(taskData.payload);
  //   setTasks(tasks);
  // }
};

const TaskForm = () => {
  const { loading, error, data } = useQuery(GET_LABELS);
  const [selectedLabels, setSelectedLabels] = useState([]);
  if (loading) {
    console.log("loading");
    return <Loader type="Oval" color="#00BFFF" height={80} width={80} />;
  }
  if (error) {
    console.error("error");
    console.error(error);
    return <div>Error!</div>;
  }
  const labels = data.labels;

  return (
    <Form onSubmit={(data) => createTaskAPI(data)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Page>
            <Grid>
              <GridColumn medium={7}>
                <Field name="title" defaultValue="" label="Title" isRequired>
                  {({ fieldProps }) => (
                    <TextField
                      placeholder="Task title"
                      minLength={10}
                      {...fieldProps}
                    />
                  )}
                </Field>{" "}
              </GridColumn>
              <GridColumn medium={3}>
                <Field name="labels" defaultValue="" label="Labels" isRequired>
                  {({ fieldProps }) => (
                    <DropdownMenu
                      triggerButtonProps={{
                        appearance:
                          selectedLabels.length > 0 ? "primary" : "default",
                      }}
                      trigger="Labels"
                      triggerType="button"
                      {...fieldProps}
                    >
                      <DropdownItemGroupCheckbox id="labels">
                        {labels &&
                          labels.length &&
                          labels.map((label) => {
                            const indexInSelected = selectedLabels.indexOf(
                              label._id
                            );
                            const isSelected = indexInSelected !== -1;

                            const setLabels = () => {
                              console.log("onClick");
                              alert("why not working !!");
                              if (isSelected) {
                                setSelectedLabels([
                                  ...selectedLabels.slice(0, indexInSelected),
                                  ...selectedLabels.slice(indexInSelected + 1),
                                ]);
                              } else {
                                setSelectedLabels([
                                  ...selectedLabels,
                                  label._id,
                                ]);
                              }
                            };
                            return (
                              <DropdownItemCheckbox
                                key={label._id}
                                id={label._id}
                                onClick={setLabels}
                                isSelected={isSelected}
                              >
                                {label.title}
                              </DropdownItemCheckbox>
                            );
                          })}
                      </DropdownItemGroupCheckbox>
                    </DropdownMenu>
                  )}
                </Field>{" "}
              </GridColumn>{" "}
              <GridColumn medium={2}>
                <ButtonWrapper>
                  <Button type="submit" appearance="primary">
                    Create
                  </Button>{" "}
                </ButtonWrapper>
              </GridColumn>
            </Grid>
          </Page>
        </form>
      )}
    </Form>
  );
};
export default TaskForm;
