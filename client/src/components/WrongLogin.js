import React from "react";
import { Alert } from "react-bootstrap";

function WrongLogin() {
  return (
    <Alert key="danger" variant="danger">
      <Alert.Heading>Nesprávné přihlašovací údaje</Alert.Heading>
      <p> Zadali jste nesprávné uživatelské jméno nebo heslo</p>
    </Alert>
  );
}

export default WrongLogin;
