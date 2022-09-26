import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import IndividualForm from "./IndividualFrom";
import OsvcForm from "./OsvcForm";
import LegalEntityForm from "./LegalEntityForm";

function PersonalDataForm(props) {
  const [applicantType, setApplicantType] = useState("Fyzická osoba");

  const displayFormType = (applicantType) => {
    if (applicantType === "Fyzická osoba") {
      return (
        <IndividualForm amount={props.amount} numOfMonths={props.numOfMonths} />
      );
    } else if (applicantType === "Podnikatel") {
      return <OsvcForm amount={props.amount} numOfMonths={props.numOfMonths} />;
    } else {
      return (
        <LegalEntityForm
          amount={props.amount}
          numOfMonths={props.numOfMonths}
        />
      );
    }
  };

  return (
    <div >
      <div className="formMain">
        <div className="container maxWidth">
          <div>
            <h1 className="text-center mt-4 mb-4 headingPrimary">
              Osobní údaje
            </h1>
            <Row>
              <Col>
                <h2 className="text-center headingSecondary">
                  Půjčku sjednává
                </h2>
              </Col>
              <Col>
                <div className="formSelectContainer">
                  <Form.Select
                    className="text-center formSelect borderRadius"
                    onChange={(e) => setApplicantType(e.target.value)}
                  >
                    <option value="Fyzická osoba">Fyzická osoba</option>
                    <option value="Podnikatel">Podnikatel</option>
                    <option value="Právnická osoba">Právnická osoba</option>
                  </Form.Select>
                </div>
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
