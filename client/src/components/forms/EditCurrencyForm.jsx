import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";

function EditCurrencyForm() {
  const [currency, setCurrency] = useState("");
  //! make the put request here

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Form formHeader="Edit currency" formWidth="100%" onSubmit={handleSubmit}>
      <Input
        isRequired={false}
        placeholder="e.g. EGP, EUR, USD"
        value={currency}
        setValue={setCurrency}
      />
      <PrimaryButton text="Edit" width="150px" />
    </Form>
  );
}

export default EditCurrencyForm;
