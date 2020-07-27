import Button from "@atlaskit/button";
import Form, { Field } from "@atlaskit/form";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import TextField from "@atlaskit/textfield";
import React from "react";
import ButtonWrapper from "../styled/ButtonWrapper";

const createTaskAPI = async (label) => {
  // todo use ApolloClient
  // const taskApi = await fetch(`${labelsEndpoint}/`, {
  //   method: "POST",
  //   body: JSON.stringify({ title: label }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const taskData = await taskApi.json();
  // // todo set errors
  // if (taskData.errors) {
  // }
  // if (taskData.statusCode === 200) {
  //   Swal.fire("Created!", "Label has been created.", "success");
  //   labels.unshift(taskData.payload);
  // }
};

const LabelForm = ({ createTaskAPI }) => (
  <Form onSubmit={(data) => createTaskAPI(data.label)}>
    {({ formProps }) => (
      <form {...formProps}>
        <Page>
          <Grid>
            <GridColumn medium={4}>
              <Field
                name="label"
                defaultValue=""
                label="New Label title"
                isRequired
              >
                {({ fieldProps }) => (
                  <TextField minLength={5} {...fieldProps} />
                )}
              </Field>{" "}
            </GridColumn>
            <GridColumn medium={4}>
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

export default LabelForm;
