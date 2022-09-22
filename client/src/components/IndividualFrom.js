import React, { useState, useEffect } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

function IndividualForm() {
  const [validated, setValidated] = useState(false);
  const [requestAddCall, setRequestAddCall] = useState({ state: "inactive" });
  const [individualFormData, setIndividualFormData] = useState({
    applicantType: "INDIVIDUAL",
    name: "",
    surname: "Taufer",
    birthNum: "",
    nationality: "",
    email: "jakubtaufer95@gmail.com",
    phone: "",
    IC: null,
    companyName: null,
    amount: null,
    numOfMonths: null,
    position: null,
    address: [],
  });

  const emptyAddress = () => {
    return {
      street: "",
      descNumber: null,
      indicativeNumber: null,
      city: "",
      postalCode: null,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIndividualFormData({ ...individualFormData, [name]: value });
    console.log(individualFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    // const newData = [...individualFormData];

    setRequestAddCall({ state: "pending" });

    const res = await fetch(`http://localhost:8000/request/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(individualFormData),
    });

    const data = await res.json();
    console.log(data);

    if (res.status >= 400) {
      setRequestAddCall({ state: "error", error: data });
    } else {
      console.log(data);
      setRequestAddCall({ state: "success", data });
    }
  };

  return (
    <Form
      className="container"
      noValidate
      validated={validated}
      id={"form"}
      onSubmit={handleSubmit}
    >
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="name" label="Jméno">
            <Form.Control
              type="text"
              name="name"
              required
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Příjmení">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Státní příslušnost"
          >
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Rodní číslo">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="E-mail">
            <Form.Control type="email" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Telefon">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="mb-3 g-2">
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Ulice">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Číslo popisné">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Číslo orientační">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Row className="g-2">
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Obec">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="PSČ">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default IndividualForm;
