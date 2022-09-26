import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div className="home-container">
      <Row xs={1} md={2}>
        <Col className="home-main-text-container">
          <h1 className="white-text home-heading">Půjčíme vám na cokoliv</h1>
          <p className="white-text home-paragraph">
            Spočítejte si své měsíční splátky v naší kalkulačce a sjednejte si
            půjčku ihned
          </p>
          <Link to="/calculator">
            <button className="white-button home-button">
              <p className="button-text-home">Spočítat splátky</p>{" "}
            </button>
          </Link>
        </Col>
        <Col>
          <img
            className="photo"
            src="https://images.pexels.com/photos/5900228/pexels-photo-5900228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="calculate"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
