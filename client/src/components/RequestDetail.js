import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import UserContext from "../context/UserProvider";
import "../css/request-detail.css";

function RequestDetail() {
  const navigate = useNavigate();
  const [request, setRequest] = useState();
  const [calculateData, setCalculateData] = useState();
  const [render, setRender] = useState(false);
  const { id } = useParams();
  const { approveRequest, deleteRequest, cancelRequest, isLogedIn, user } =
    useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:8000/request/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        console.log(data);
      });
  }, [render]);

  useEffect(() => {
    fetch("http://localhost:8000/request/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: request?.amount,
        numOfMonths: request?.numOfMonths,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCalculateData(data);
        console.log(data);
      });
  }, [request]);
  return (
    <div className="requestDetail-container">
      <Row>
        <Col sm={10}>
          <h3 className="greenText">Detail žádosti</h3>
        </Col>
        {isLogedIn() && user?.roles[0] === "SUPERVIZOR" && (
          <Col sm={2}>
            <button
              className="danger-button delete"
              onClick={() => {
                deleteRequest(request.id);
                navigate("/admin");
              }}
            >
              <Icon size={1} path={mdiDeleteOutline} />
              Odstranit žádost
            </button>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <p className="greenText">Údaje o žadateli</p>
          <div className="requestDetail-row">
            <Row className="row">
              <Col>Typ žadatele</Col>
              <Col>
                {request?.applicantType === "INDIVIDUAL" && "Fyzická osoba"}
                {request?.applicantType === "OSVC" && "Podnikatel"}
                {request?.applicantType === "LEGAL_ENTITY" && "Právnická osoba"}
              </Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row className="row">
              <Col>
                {request?.applicantType === "LEGAL_ENTITY"
                  ? "Název firmy"
                  : "Jméno"}
              </Col>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY"
                  ? request?.companyName
                  : request?.name}
              </Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY" ? "IČO" : "Příjmení"}
              </Col>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY"
                  ? request?.IC
                  : request?.surname}
              </Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY" &&
                  "Jméno a příjmení"}
                {request?.applicantType === "INDIVIDUAL" && "Rodné číslo"}
                {request?.applicantType === "OSVC" && "IČO"}
              </Col>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY" &&
                  request.name + " " + request.surname}
                {request?.applicantType === "INDIVIDUAL" && request?.birthNum}
                {request?.applicantType === "OSVC" && request?.IC}
              </Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY"
                  ? "Funkce"
                  : "Státní příslušnost"}
              </Col>
              <Col>
                {request?.applicantType === "LEGAL_ENTITY"
                  ? request?.position
                  : request?.nationality}
              </Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Email</Col>
              <Col>{request?.email}</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Telefonní číslo</Col>
              <Col>{request?.phone}</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Adresa</Col>
              <Col>
                {request?.address.street} {request?.address.descNumber}/
                {request?.address.indicativeNumber}
                <br></br> {request?.address.city}{" "}
                {request?.address.postalCode?.toLocaleString()}
              </Col>
            </Row>
          </div>
        </Col>
        <Col>
          <p className="greenText">Půjčka</p>
          <div className="requestDetail-row">
            <Row>
              <Col>Výše úvěru</Col>
              <Col>{request?.amount?.toLocaleString()} CZK</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Doba splácení</Col>
              <Col>{request?.numOfMonths} měsíců</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Měsíční splátka</Col>
              <Col>{calculateData?.monthlyPayment?.toLocaleString()} CZK</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Roční úroková sazba</Col>
              <Col>{calculateData?.yearlyInterest}%</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>RPSN</Col>
              <Col>{calculateData?.RPSN}%</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Celková částka</Col>
              <Col>{calculateData?.overallAmount?.toLocaleString()} CZK</Col>
            </Row>
          </div>
          <div className="requestDetail-row">
            <Row>
              <Col>Stav</Col>
              <Col
                style={{
                  color:
                    request?.status === "APPROVED"
                      ? "green"
                      : request?.status === "CANCELLED"
                      ? "red"
                      : "black",
                }}
              >
                {request?.status === "APPROVED"
                  ? "SCHVÁLENO"
                  : request?.status === "CANCELLED"
                  ? "ZAMÍTNUTO"
                  : "ČEKÁ NA VYŘÍZENÍ"}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {isLogedIn() && (
        <div className="button-container">
          <button
            className="primary-button"
            onClick={() => {
              approveRequest(request.id);
              setRender(!render);
            }}
          >
            Schválit
          </button>
          <button
            className="danger-button"
            onClick={() => {
              cancelRequest(request.id);
              setRender(!render);
            }}
          >
            Zamítnout
          </button>
        </div>
      )}
    </div>
  );
}

export default RequestDetail;
