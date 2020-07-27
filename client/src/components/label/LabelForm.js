import Button from "@atlaskit/button";
import Form, { Field } from "@atlaskit/form";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import TextField from "@atlaskit/textfield";
import React from "react";
import ButtonWrapper from "../styled/ButtonWrapper";

const LabelForm = ({ createTaskAPI, errors }) => (
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
