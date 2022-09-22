import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import IndividualForm from "./IndividualFrom";
import OsvcForm from "./OsvcForm";
import LegalEntityForm from "./LegalEntityForm";

function PersonalDataForm() {
  const [applicantType, setApplicantType] = useState("Fyzická osoba");

  const displayFormType = (applicantType) => {
    console.log(applicantType);
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
        <div
          key="inline-radio"
          className="mb-3"
          onChange={(e) => setApplicantType(e.target.value)}
        >
          <Form.Check
            inline
            label="Fyzická osoba"
            name="group1"
            type="radio"
            id="inline-radio-1"
            value="Fyzická osoba"
            checked={applicantType === "Fyzická osoba"}
          />
          <Form.Check
            inline
            label="OSVC"
            name="group1"
            type="radio"
            id="inline-radio-2"
            value="OSVC"
            checked={applicantType === "OSVC"}
          />
          <Form.Check
            inline
            label="Právnická osoba"
            name="group1"
            type="radio"
            id="inline-radio-3"
            value="Právnická osoba"
            checked={applicantType === "Právnická osoba"}
          />
        </div>
        <div>{displayFormType(applicantType)}</div>
      </Form>
    </div>
  );
}

export default PersonalDataForm;
