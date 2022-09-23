import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  InputGroup,
} from "react-bootstrap";

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
  const [prefixData, setPrefixData] = useState("+420");
  const [phoneNumData, setPhoneNumData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIndividualFormData({ ...individualFormData, [name]: value });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // if (!form.checkValidity()) {
    //   setValidated(true);
    //   return;
    // }

    const result = { ...individualFormData, address: addressData };

    result.address.descNumber = +result.address.descNumber;
    result.address.indicativeNumber = +result.address.indicativeNumber;
    result.address.postalCode = +result.address.postalCode;
    result.phone = prefixData + phoneNumData;

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
    <div>
      <Form
        noValidate
        validated={validated}
        id={"form"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Row className="g-2 mb-3">
          <Col>
            <FloatingLabel controlId="name" label="Jméno">
              <Form.Control
                type="text"
                name="name"
                value={individualFormData.name}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Jméno je vyžadované
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="surname" label="Příjmení">
              <Form.Control
                type="text"
                name="surname"
                value={individualFormData.surname}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Příjmení je vyžadované
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col>
            <FloatingLabel controlId="nationality" label="Státní příslušnost">
              <Form.Control
                type="text"
                name="nationality"
                value={individualFormData.nationality}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Státní příslušnost je vyžadovaná
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="birthNum" label="Rodní číslo">
              <Form.Control
                type="text"
                name="birthNum"
                value={individualFormData.birthNum}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Rodní číslo je vyžadované
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col>
            <FloatingLabel controlId="email" label="E-mail">
              <Form.Control
                type="email"
                name="email"
                value={individualFormData.email}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Vyplňte platní e-mail
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <InputGroup>
              <Form.Select
                style={{ maxWidth: "100px" }}
                onChange={(e) => setPrefixData(e.target.value)}
              >
                <option value="+420">+420</option>
                <option value="+421">+421</option>
              </Form.Select>
              <FloatingLabel controlId="phoneNum" label="Telefon">
                <Form.Control
                  type="text"
                  pattern="\d{9}"
                  name="phoneNum"
                  value={phoneNumData}
                  required
                  onChange={(e) => setPhoneNumData(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Vyplňte platní telefonní číslo
                </Form.Control.Feedback>
              </FloatingLabel>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3 g-2">
          <Col xs={6}>
            <FloatingLabel controlId="street" label="Ulice">
              <Form.Control
                type="text"
                name="street"
                value={addressData.street}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Ulice je vyžadovaná
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="descNumber" label="Číslo popisné">
              <Form.Control
                type="text"
                pattern="\b([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])\b"
                name="descNumber"
                value={addressData.descNumber}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Vyplňte platní popisné číslo (1-9999)
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="indicativeNumber"
              label="Číslo orientační"
            >
              <Form.Control
                type="text"
                pattern="\b([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])\b"
                name="indicativeNumber"
                value={addressData.indicativeNumber}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Vyplňte platní orientační číslo (1-9999)
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col>
            <FloatingLabel controlId="city" label="Obec">
              <Form.Control
                type="text"
                name="city"
                value={addressData.city}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Obec je vyžadovaná
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="postalCode" label="PSČ">
              <Form.Control
                type="text"
                pattern="^\d{5}$"
                name="postalCode"
                value={addressData.postalCode}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Vyplňte platní PSČ ve formátu XXXXX
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button size="lg" variant="success" type="submit">
              Zažádat o půjčku
            </Button>
          </Col>
          <Col>
            <p>
              Stiskem tlačítka „Zažádat o půjčku“ souhlasíte se zpracováním
              Vašich osobních údajů.
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default IndividualForm;
