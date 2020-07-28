import { useMutation } from "@apollo/client";
import Button from "@atlaskit/button";
import Form, { Field } from "@atlaskit/form";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import TextField from "@atlaskit/textfield";
import React from "react";
import Swal from "sweetalert2";
import { ADD_LABEL } from "../../graphql/mutations";
import ButtonWrapper from "../styled/ButtonWrapper";

const LabelForm = () => {
  const [addLabel] = useMutation(ADD_LABEL);

  const createTaskAPI = async (title) => {
    const status = await addLabel({ variables: { title } });
    if (status.data.addLabel) {
      Swal.fire("Created!", "Label has been created.", "success");
      //todo add to  list
    }
  };

  return (
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
};

export default LabelForm;
