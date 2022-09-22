import React, { useState, useEffect } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

function IndividualForm() {
  const [validated, setValidated] = useState(false);
  const [requestAddCall, setRequestAddCall] = useState({ state: "inactive" });
  const [individualFormData, setIndividualFormData] = useState({
    applicantType: "INDIVIDUAL",
    name: "",
    surname: "",
    birthNum: "",
    nationality: "",
    email: "",
    phone: "",
    IC: "",
    position: "",
    companyName: "",
    amount: 10000,
    numOfMonths: 8,
    address: {},
  });

  const [addressData, setAddressData] = useState({
    street: "",
    descNumber: null,
    indicativeNumber: null,
    city: "",
    postalCode: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIndividualFormData({ ...individualFormData, [name]: value });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);

      return;
    }

    const result = { ...individualFormData, address: addressData };

    result.address.descNumber = +result.address.descNumber;
    result.address.indicativeNumber = +result.address.indicativeNumber;
    result.address.postalCode = +result.address.postalCode;

    setRequestAddCall({ state: "pending" });

    const res = await fetch(`http://localhost:8000/request/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    const data = await res.json();

    if (res.status >= 400) {
      setRequestAddCall({ state: "error", error: data });
    } else {
      console.log(data);
      setRequestAddCall({ state: "success", data });
    }
  };

  return (
    <Form className="container" noValidate validated={validated} id={"form"}>
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="name" label="Jméno">
            <Form.Control
              type="text"
              name="name"
              value={individualFormData.name}
              required
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="surname" label="Příjmení">
            <Form.Control
              type="text"
              name="surname"
              value={individualFormData.surname}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="nationality" label="Státní příslušnost">
            <Form.Control
              type="text"
              name="nationality"
              value={individualFormData.nationality}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="birthNum" label="Rodní číslo">
            <Form.Control
              type="text"
              name="birthNum"
              value={individualFormData.birthNum}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="email" label="E-mail">
            <Form.Control
              type="email"
              name="email"
              value={individualFormData.email}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="phone" label="Telefon">
            <Form.Control
              type="text"
              name="phone"
              value={individualFormData.phone}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="mb-3 g-2">
        <Col>
          <FloatingLabel controlId="street" label="Ulice">
            <Form.Control
              type="text"
              name="street"
              value={addressData.street}
              onChange={handleChangeAddress}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="descNumber" label="Číslo popisné">
            <Form.Control
              type="text"
              name="descNumber"
              value={addressData.descNumber}
              onChange={handleChangeAddress}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="indicativeNumber" label="Číslo orientační">
            <Form.Control
              type="text"
              name="indicativeNumber"
              value={addressData.indicativeNumber}
              onChange={handleChangeAddress}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="city" label="Obec">
            <Form.Control
              type="text"
              name="city"
              value={addressData.city}
              onChange={handleChangeAddress}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="postalCode" label="PSČ">
            <Form.Control
              type="text"
              name="postalCode"
              value={addressData.postalCode}
              onChange={handleChangeAddress}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default IndividualForm;
