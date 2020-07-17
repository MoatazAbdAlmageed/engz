import React, { useState, useEffect } from "react";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";

const SearchForm = ({ getTasks }) => (
  <Form
    onSubmit={(data) => {
      getTasks(data.search);
    }}
  >
    {({ formProps }) => (
      <form {...formProps}>
        <Field name="search" defaultValue="" label="Search" isRequired>
          {({ fieldProps }) => (
            <TextField placeholder="search task" {...fieldProps} />
          )}
        </Field>{" "}
      </form>
    )}
  </Form>
);

export default SearchForm;
