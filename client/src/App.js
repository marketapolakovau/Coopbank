import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import UserContext from "./context/UserProvider";
import { mdiCalculator } from "@mdi/js";
import Icon from "@mdi/react";

function App() {
  const { isLogedIn, logOut } = useContext(UserContext);
  return (
    <div>
      <Navbar fixed="top" expand={"sm"} className="mb-3 navbar" variant="dark">
        <Container fluid>
          <Link to="/" className="navigation">
            <h5>COOPBANK</h5>
          </Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                <Link to="/" className="navigation">
                  <h5>COOPBANK</h5>
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!isLogedIn() && (
                  <div>
                    <Link
                      className="navigation d-none
                    d-md-block"
                      to="/calculator"
                    >
                      <Icon size={1} path={mdiCalculator} className="icon" />
                      Kalkulačka
                    </Link>
                    <Link
                      className="button-text d-block
                    d-md-none"
                      to="/calculator"
                    >
                      <Icon size={1} path={mdiCalculator} className="icon" />
                      Kalkulačka
                    </Link>
                  </div>
                )}
              </Nav>
              {isLogedIn() && (
                <div>
                  <button
                    type="button"
                    className="outline-white-button  d-none
                    d-md-block"
                    onClick={logOut}
                  >
                    Odhlásit se
                  </button>
                  <button
                    type="button"
                    className="button-text  d-block
                    d-md-none"
                    onClick={logOut}
                  >
                    Odhlásit se
                  </button>
                </div>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
