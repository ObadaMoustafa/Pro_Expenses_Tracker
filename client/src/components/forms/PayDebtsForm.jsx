import React from "react";
import Form from "./Form";
import Input from "./Input";

function PayDebtsForm() {
  //write code here

  return (
    <Form formHeader="Pay debt">
      {/*TODO should make a list of user debts */}
      <Input label="Date" type="date" />
      <Input label="Number" type="number" />
      <PrimaryButton text="submit" width="50%" />
    </Form>
  );
}

export default PayDebtsForm;
