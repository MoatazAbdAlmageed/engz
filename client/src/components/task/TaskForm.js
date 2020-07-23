import React, { useState } from "react";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import Button from "@atlaskit/button";
import ButtonWrapper from "../styled/ButtonWrapper";
import DropdownMenu, {
  DropdownItemGroupCheckbox,
  DropdownItemCheckbox,
} from "@atlaskit/dropdown-menu";
const TaskForm = ({ createTaskAPI, errors, labels }) => {
  const [selectedLabels, setSelectedLabels] = useState([]);
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
            {errors && errors.length ? (
              <ul className="validation">
                {errors.map((error) => (
                  <li key={error.msg}>{error.msg}</li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </Page>
        </form>
      )}
    </Form>
  );
};
export default TaskForm;
