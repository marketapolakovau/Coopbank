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
    <div className="container">
      <h3 className="greenText">Přihlásit se do portálu bankéře</h3>

      <Form>
        {user?.error && <WrongLogin />}

        <Row xs={1} md={2}>
          <Col>
            <Form.Label className="greyText">Uživatelské jméno</Form.Label>

            <div className="input-container">
              <i className="input-icon">
                <Icon size={1} path={mdiAccountOutline} className="icon" />
              </i>
              <input
                className="input"
                onChange={handleChange}
                type="text"
                name="username"
              />
            </div>
          </Col>
          <Col>
            <Form.Label className="greyText">Heslo</Form.Label>
            <div className="input-container">
              <i className="input-icon">
                <Icon size={1} path={mdiLockOpenOutline} className="icon" />
              </i>

              <input
                className="input"
                onChange={handleChange}
                type="password"
                name="password"
              />
            </div>
          </Col>
          <InputGroup>
            <button
              type="button"
              className="primary-button"
              onClick={handleSubmit}
            >
              Přihlásit se
            </button>
          </InputGroup>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
