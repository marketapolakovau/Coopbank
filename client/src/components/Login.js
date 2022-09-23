import { useState, useContext } from "react";
import UserContext from "../context/UserProvider";
import WrongLogin from "./WrongLogin";

import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountOutline, mdiLockOpenOutline } from "@mdi/js";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { loginUser, user } = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = () => {
    loginUser(loginData);
  };
  return (
    <Form>
      {user?.error && <WrongLogin />}
      <Container className="container">
        <Row xs={1} md={2}>
          <Col>
            <Form.Label className="greyText">Uživatelské jméno</Form.Label>

            <InputGroup className="mb-3" controlId="ControlInput1">
              <InputGroup.Text
                style={{ backgroundColor: "white", borderRight: "none" }}
                id="basic-addon1"
              >
                <Icon size={1} path={mdiAccountOutline} className="icon" />
              </InputGroup.Text>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="username"
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label className="greyText">Heslo</Form.Label>
            <InputGroup as={Col} className="mb-3" controlId="ControlInpu2">
              <InputGroup.Text
                style={{ backgroundColor: "white" }}
                id="basic-addon1"
              >
                <Icon size={1} path={mdiLockOpenOutline} className="icon" />
              </InputGroup.Text>

              <Form.Control
                onChange={handleChange}
                type="password"
                name="password"
              />
            </InputGroup>
          </Col>
          <InputGroup>
            <Button
              style={{ backgroundColor: "#00843d" }}
              variant="success"
              className="btn btn-success btn-md"
              onClick={handleSubmit}
            >
              Přihlásit se
            </Button>
          </InputGroup>
        </Row>
      </Container>
    </Form>
  );
}

export default Login;
