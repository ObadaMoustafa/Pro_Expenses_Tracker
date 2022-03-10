import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";

function EditNameForm() {
  const [fullName, setFullName] = useState("");
  //! make the put request here

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Form formHeader="Edit your name" formWidth="100%" onSubmit={handleSubmit}>
      <Input
        isRequired={false}
        placeholder="Write full name"
        value={fullName}
        setValue={setFullName}
      />
      <PrimaryButton text="Edit" width="150px" />
    </Form>
  );
}

export default EditNameForm;
