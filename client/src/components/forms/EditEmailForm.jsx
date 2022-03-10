import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";

function EditEmailForm() {
  const [email, setEmail] = useState("");
  //! make the put request here

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Form formHeader="Edit your email" formWidth="100%" onSubmit={handleSubmit}>
      <Input
        isRequired={false}
        placeholder="example@email.com"
        value={email}
        setValue={setEmail}
      />
      <PrimaryButton text="Edit" width="150px" />
    </Form>
  );
}

export default EditEmailForm;
