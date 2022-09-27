import React from "react";
import { Alert } from "react-bootstrap";

function Error404() {
  return (
    <Alert key="danger" variant="danger">
      <Alert.Heading>Tato žádost neexistuje</Alert.Heading>
      <p> Žádost byla pravděpodobně smazána nebo bylo zadáno chybné ID</p>
    </Alert>
  );
}

export default Error404;
