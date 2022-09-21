import React, { useState } from "react";
import { Form } from "react-bootstrap";
import IndividualForm from "./IndividualFrom";
import OsvcForm from "./OsvcForm";
import LegalEntityForm from "./LegalEntityForm";

function PersonalDataForm() {
  const [applicantType, setApplicantType] = useState("Fyzická osoba");

  const displayFormType = (applicantType) => {
    if (applicantType === "Fyzická osoba") {
      return <IndividualForm />;
    } else if (applicantType === "OSVC") {
      return <OsvcForm />;
    } else {
      return <LegalEntityForm />;
    }
  };

  return (
    <div>
      <Form>
        <Form.Label>Zvolte</Form.Label>
        <Form.Group
          className="mb-3"
          onChange={(e) => setApplicantType(e.target.value)}
        >
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Fyzická osoba"
              checked
            />
            <label class="form-check-label" for="inlineRadio1">
              Fyzická osoba
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="OSVC"
            />
            <label class="form-check-label" for="inlineRadio2">
              OSVC
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="Právnická osoba"
            />
            <label class="form-check-label" for="inlineRadio3">
              Právnická osoba
            </label>
          </div>
        </Form.Group>
        <div>{displayFormType(applicantType)}</div>
      </Form>
    </div>
  );
}

export default PersonalDataForm;
