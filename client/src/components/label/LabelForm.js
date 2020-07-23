import React from "react";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import Button from "@atlaskit/button";
import ButtonWrapper from "../styled/ButtonWrapper";

const LabelForm = ({ createTaskAPI, errors }) => (
  <Form onSubmit={(data) => createTaskAPI(data.label)}>
    {({ formProps }) => (
      <form {...formProps}>
        <Page>
          <Grid>
            <GridColumn medium={3}>
              <h4 className="gray">Create New Label</h4>
            </GridColumn>
            <GridColumn medium={4}>
              <Field name="label" defaultValue="" label="Label" isRequired>
                {({ fieldProps }) => (
                  <TextField minLength={5} {...fieldProps} />
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

export default LabelForm;
