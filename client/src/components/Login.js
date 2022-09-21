import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UserContext from "../UserProvider";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { loginUser } = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = () => {
    loginUser(loginData);
  };
  return (
    <Form>
      <Row>
        <Form.Group
          as={Col}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Uživatelské jméno</Form.Label>
          <Form.Control onChange={handleChange} type="text" name="username" />
        </Form.Group>
        <Form.Group
          as={Col}
          className="mb-3"
          controlId="exampleForm.ControlInpu2"
        >
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
          />
        </Form.Group>
        <Button
          variant="success"
          className="btn btn-success btn-sm"
          onClick={handleSubmit}
        >
          Přihlásit
        </Button>
      </Row>
    </Form>
  );
}

export default Login;
