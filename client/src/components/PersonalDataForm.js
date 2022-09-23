import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import IndividualForm from "./IndividualFrom";
import OsvcForm from "./OsvcForm";
import LegalEntityForm from "./LegalEntityForm";

function PersonalDataForm() {
  const [applicantType, setApplicantType] = useState("Fyzická osoba");

  const displayFormType = (applicantType) => {
    console.log(applicantType);
    if (applicantType === "Fyzická osoba") {
      return <IndividualForm />;
    } else if (applicantType === "Podnikatel") {
      return <OsvcForm />;
    } else {
      return <LegalEntityForm />;
    }
  };

  return (
    <div className="container " style={{ maxWidth: "720px" }}>
      <div style={{ backgroundColor: "#00843D" }}>
        <h1 style={{ color: "#fff" }} className="text-center mt-4 mb-4">
          Osobní udaje
        </h1>
        <Row>
          <Col>
            <h2 style={{ color: "#fff" }} className="text-center">
              {applicantType}
            </h2>
          </Col>
          <Col>
            <Form.Select
              className="text-center"
              style={{ maxWidth: "300px" }}
              onChange={(e) => setApplicantType(e.target.value)}
            >
              <option value="Fyzická osoba">Fyzická osoba</option>
              <option value="Podnikatel">Podnikatel</option>
              <option value="Právnická osoba">Právnická osoba</option>
            </Form.Select>
          </Col>
        </Row>
        <br />
      </div>
      <br />
      <div>{displayFormType(applicantType)}</div>
    </div>
  );
}

export default PersonalDataForm;
