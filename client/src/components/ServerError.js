import React from "react";
import { Alert } from "react-bootstrap";

function ServerError() {
  return (
    <Alert key="danger" variant="danger">
      <Alert.Heading>Něco se pokazilo</Alert.Heading>
      <p> Chyba je na naší straně, ale pracujeme na tom</p>
    </Alert>
  );
}

export default ServerError;
