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
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <Form.Label>Uživatelské jméno</Form.Label>

            <InputGroup className="mb-3" controlId="ControlInput1">
              <InputGroup.Text id="basic-addon1">
                <Icon size={1} path={mdiAccountOutline} />
              </InputGroup.Text>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="username"
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Heslo</Form.Label>
            <InputGroup as={Col} className="mb-3" controlId="ControlInpu2">
              <InputGroup.Text id="basic-addon1">
                <Icon size={1} path={mdiLockOpenOutline} />
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
              variant="success"
              className="btn btn-success btn-md"
              onClick={handleSubmit}
            >
              Přihlásit
            </Button>
          </InputGroup>
        </Row>
      </Container>
    </Form>
  );
}

export default Login;
