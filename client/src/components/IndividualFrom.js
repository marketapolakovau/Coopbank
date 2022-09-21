import React, { useState } from "react";
import { Form } from "react-bootstrap";

function IndividualForm() {
  const [individualFormData, setIndividualFormData] = useState({
    applicantType: "",
    name: "",
    surname: "",
    birthNum: "",
    nationality: "",
    email: "",
    phone: "",
    IC: "",
    position: "",
    companyName: "",
    amount: null,
    numOfMonths: null,
    address: {
      street: "",
      descNumber: null,
      indicativeNumber: null,
      city: "",
      postalCode: null,
    },
  });

  return (
    <Form class="container">
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="First name" />
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Last name" />
        </div>
      </div>
    </Form>
  );
}

export default IndividualForm;
