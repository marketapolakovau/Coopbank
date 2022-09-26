import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import IndividualForm from "./IndividualFrom";
import OsvcForm from "./OsvcForm";
import LegalEntityForm from "./LegalEntityForm";
import styles from "../css/personal-data-form.css";

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
    <div>
      <div className="formMain">
        <div className="container maxWidth">
          <div>
            <h1 className="text-center mt-4 mb-4 headingPrimary">
              Osobní udaje
            </h1>
            <Row>
              <Col>
                <h2 className="text-center headingSecondary">
                  Půjčku sjednává
                </h2>
              </Col>
              <Col>
                <Form.Select
                  className="text-center formSelect"
                  onChange={(e) => setApplicantType(e.target.value)}
                >
                  <option value="Fyzická osoba">Fyzická osoba</option>
                  <option value="Podnikatel">Podnikatel</option>
                  <option value="Právnická osoba">Právnická osoba</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="container maxWidth marginTop">
        {displayFormType(applicantType)}
      </div>
    </div>
  );
}

export default PersonalDataForm;
