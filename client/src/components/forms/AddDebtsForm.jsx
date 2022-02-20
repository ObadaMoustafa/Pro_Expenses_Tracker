import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";

function AddDebtsForm() {
  //write code here
  function handleSubmit() {}
  return (
    <Form formHeader="Create new Dept" on onSubmit={handleSubmit}>
      <Input label="Title" />
      <Input label="Date of start" type="date" />
      <Input label="Amount" type="number" />
      <Input label="Deadline Date" type="date" />
      <PrimaryButton text="Create" width="50%" />
    </Form>
  );
}

export default AddDebtsForm;
