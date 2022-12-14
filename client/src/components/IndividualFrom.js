import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../css/personal-data-form.css";

function IndividualForm(props) {
  const [newRequestData, setNewRequestData] = useState();
  const [showModal, setShowModal] = useState(false);
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
    amount: null,
    numOfMonths: null,
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

  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    const result = { ...individualFormData, address: addressData };

    result.amount = props.amount;
    result.numOfMonths = props.numOfMonths;
    result.address.descNumber = +result.address.descNumber;
    result.address.indicativeNumber = +result.address.indicativeNumber;
    result.address.postalCode = result.address.postalCode.replace(/\s/g, "");
    result.address.postalCode = +result.address.postalCode;
    result.phone = prefixData + phoneNumData;

    setRequestAddCall({ state: "pending" });

    const res = await fetch(`request/create`, {
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
      setNewRequestData(data);
      handleShowModal();
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
        <Row className="g-3 mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Jm??no</Form.Label>
              <Form.Control
                type="text"
                name="name"
                className="borderRadius"
                value={individualFormData.name}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte jm??no
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>P????jmen??</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                className="borderRadius"
                value={individualFormData.surname}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte p????jmen??
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col>
            <Form.Group>
              <Form.Label>St??tn?? p????slu??nost</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                className="borderRadius"
                value={individualFormData.nationality}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte st??tn?? p????slu??nost
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Rodn?? ????slo</Form.Label>
              <Form.Control
                type="text"
                name="birthNum"
                className="borderRadius"
                pattern="[0-9]{2}[0,1,5][0-9][0-9]{2}/?[0-9]{4}"
                value={individualFormData.birthNum}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte rodn?? ????slo ve validn??m form??tu
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                className="borderRadius"
                value={individualFormData.email}
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte e-mail ve validn??m form??tu
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Telefon</Form.Label>
              <InputGroup>
                <Form.Select
                  className="borderRadius"
                  style={{ maxWidth: "120px" }}
                  onChange={(e) => setPrefixData(e.target.value)}
                >
                  <option value="+420">+420</option>
                  <option value="+421">+421</option>
                </Form.Select>

                <Form.Control
                  type="text"
                  pattern="^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$"
                  name="phoneNum"
                  value={phoneNumData}
                  required
                  onChange={(e) => setPhoneNumData(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Zadejte telefonn?? ????slo ve validn??m form??tu
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 g-3">
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Ulice</Form.Label>
              <Form.Control
                type="text"
                name="street"
                className="borderRadius"
                value={addressData.street}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte ulici
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>????slo popisn??</Form.Label>
              <Form.Control
                type="text"
                pattern="^\d[0-9a-zA-Z]*$"
                name="descNumber"
                className="borderRadius"
                value={addressData.descNumber}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte ????slo popisn?? ve validn??m form??tu
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>????slo orienta??n??</Form.Label>
              <Form.Control
                type="text"
                pattern="^\d[0-9a-zA-Z]*$"
                name="indicativeNumber"
                className="borderRadius"
                value={addressData.indicativeNumber}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte ????slo orienta??n?? ve validn??m form??tu
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Obec</Form.Label>
              <Form.Control
                type="text"
                name="city"
                className="borderRadius"
                value={addressData.city}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte obec
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>PS??</Form.Label>
              <Form.Control
                type="text"
                pattern="\d{3}[ ]?\d{2}"
                name="postalCode"
                className="borderRadius"
                value={addressData.postalCode}
                required
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte PS?? ve validn??m form??tu
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />
        {requestAddCall?.error && (
          <div>
            <Alert key="danger" variant="danger">
              <Alert.Heading>Error 400 (Bad Request)</Alert.Heading>
              <p> {requestAddCall.error.errorMessage}</p>
            </Alert>
          </div>
        )}
        <Row>
          <Col>
            <button type="submit" className="primary-button">
              Za????dat o p??j??ku
            </button>
          </Col>
          <Col>
            <p>
              Stiskem tla????tka ???Za????dat o p??j??ku??? souhlas??te se zpracov??n??m
              Va??ich osobn??ch ??daj??.
            </p>
          </Col>
        </Row>
      </Form>
      <Modal show={showModal} centered>
        <Modal.Header className="modalHeader">
          <Modal.Title className="modalHeading">Potvrzen??</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modalText">
            D??kujeme za vyu??it?? slu??eb Coopbank. P??ehled svoj?? ????dosti si m????ete
            prohl??dnout na nasleduj??c??m odkazu.
          </p>
          <div className="modalBtnContainer">
            <Link to={`/request/${newRequestData?.id}`}>
              <button className="primary-button">P??ehled V?????? ????dosti</button>
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalHomeBtn">
          <Link to={`/`}>
            <button className="outline-button">Hlavn?? stranka</button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IndividualForm;
