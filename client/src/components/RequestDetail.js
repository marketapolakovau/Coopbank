import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function RequestDetail() {
  const [request, setRequest] = useState();
  const [calculateData, setCalculateData] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/request/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        console.log(data);
      });
  }, []);

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
    <div>
      <h3 className="greenText">Detail žádosti</h3>

      <Row>
        <Col>
          <Container>
            <p className="greenText">Údaje o žadateli</p>
            <Card body>
              <Row className="row">
                <Col>Typ žadatele</Col>
                <Col>
                  {request?.applicantType === "INDIVIDUAL" && "Fyzická osoba"}
                  {request?.applicantType === "OSVC" && "Podnikatel"}
                  {request?.applicantType === "LEGAL_ENTITY" &&
                    "Právnická osoba"}
                </Col>
              </Row>
            </Card>
            <Card body>
              <Row className="row">
                <Col>Jméno</Col>
                <Col>{request?.name}</Col>
              </Row>
            </Card>
            <Card body>
              <Row>
                <Col>Příjmení</Col>
                <Col>{request?.surname}</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Rodné číslo</Col>
                <Col>{request?.birthNum}</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Státní příslušnost</Col>
                <Col>{request?.nationality}</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Email</Col>
                <Col>{request?.email}</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Telefonní číslo</Col>
                <Col>{request?.phone}</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Adresa</Col>
                <Col>
                  {request?.address.street} {request?.address.descNumber}/
                  {request?.address.indicativeNumber}
                  <br></br> {request?.address.city}{" "}
                  {request?.address.postalCode}
                </Col>
              </Row>
            </Card>
          </Container>
        </Col>
        <Col>
          <Container>
            <p className="greenText">Půjčka</p>
            <Card body>
              <Row>
                <Col>Výše úvěru</Col>
                <Col>{request?.amount?.toLocaleString()} CZK</Col>
              </Row>
            </Card>
            <Card body>
              <Row>
                <Col>Doba splácení</Col>
                <Col>{request?.numOfMonths} měsíců</Col>
              </Row>
            </Card>
            <Card body>
              <Row>
                <Col>Měsíční splátka</Col>
                <Col>{calculateData?.monthlyPayment?.toLocaleString()} CZK</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Roční úroková sazba</Col>
                <Col>{calculateData?.yearlyInterest}%</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>RPSN</Col>
                <Col>{calculateData?.RPSN}%</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Celková částka</Col>
                <Col>{calculateData?.overallAmount?.toLocaleString()} CZK</Col>
              </Row>
            </Card>{" "}
            <Card body>
              <Row>
                <Col>Stav</Col>
                <Col>{request?.status}</Col>
              </Row>
            </Card>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default RequestDetail;
