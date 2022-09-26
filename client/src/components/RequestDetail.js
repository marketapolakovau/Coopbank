import { useEffect, useState, useContext } from "react";

import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import UserContext from "../context/UserProvider";
import "../css/request-detail.css";
import DeleteModal from "./DeleteModal";
import Cookies from "universal-cookie";
import Loading from "./Loading";

function RequestDetail() {
  const [request, setRequest] = useState();
  const [calculateData, setCalculateData] = useState();
  const [render, setRender] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validatedMonth, setValidatedMonth] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [status, setStatus] = useState("pending");
  const cookies = new Cookies();
  console.log(cookies.get(`requestCount${request?.id}`));
  let phone = request?.phone.slice(4).toLocaleString();
  phone = +phone;
  let prefix = request?.phone.slice(0, 4).toLocaleString();

  const [edit, setEdit] = useState({
    amountE: request?.amount,
    numOfMonthsE: request?.numOfMonths,
  });
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState();
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
        if (res.status > 399) {
          setStatus("error");
          Promise.reject("error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setCalculateData(data);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [request]);
  console.log(String(request?.phone.slice(4, 13)));

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const editRequest = () => {
    console.log(+edit.amountE);
    fetch(`http://localhost:8000/request/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: +edit.amountE || +request.amount,
        numOfMonths: +edit.numOfMonthsE || +request.numOfMonths,
      }),
    })
      .then((res) => {
        if (res.status > 399) {
          Promise.reject("error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setStatus("success");
        setShowEdit(false);
        setTimeout(() => setRender(!render), 500);
      })
      .catch((err) => {
        setStatus("error");
      });
  };
  if (status === "pending") {
    return <Loading />;
  } else if (status === "error") {
    return <div className="container">error</div>;
  } else {
    return (
      <div className="requestDetail-container">
        <Row>
          <Col xs={2} md={10}>
            <h3 className="greenText">Detail žádosti</h3>
          </Col>
          {isLogedIn() && user?.roles[0] === "SUPERVIZOR" && (
            <Col sm={2}>
              <button
                className="danger-button delete"
                onClick={() => {
                  setShowDeleteModal(!showDeleteModal);
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
                  {request?.applicantType === "LEGAL_ENTITY" &&
                    "Právnická osoba"}
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
                  {request?.applicantType === "LEGAL_ENTITY"
                    ? "IČO"
                    : "Příjmení"}
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
                <Col>
                  {prefix} {phone.toLocaleString()}
                </Col>
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

            <div
              className={showEdit ? "requestDetail-edit" : "requestDetail-row"}
            >
              <Row>
                <Col>Výše úvěru</Col>

                {showEdit ? (
                  // <Col>
                  //   <span
                  //     contentEditable
                  //     onInput={(e) => {
                  //       const tmpAmount = +e.target.textContent.replace(
                  //         /\s/g,
                  //         ""
                  //       );

                  //       if (tmpAmount > 1200000 || tmpAmount < 5000) {
                  //         setValidated(!validated);
                  //       } else {
                  //         handleEditChange(e, "amountE");
                  //         setValidated(false);
                  //       }
                  //     }}
                  //   >
                  //     {request?.amount?.toLocaleString()}
                  //   </span>{" "}
                  //   Kč
                  // </Col>
                  <Col>
                    <input
                      className="request-input"
                      type="number"
                      value={edit.amountE}
                      defaultValue={request?.amount}
                      name="amountE"
                      step={1000}
                      min={5000}
                      max={1200000}
                      onChange={(e) => {
                        const tmpAmount = +e.target.value.replace(/\s/g, "");

                        if (tmpAmount > 1200000 || tmpAmount < 5000) {
                          setValidated(!validated);
                          handleEditChange(e);
                        } else {
                          handleEditChange(e);
                          setValidated(false);
                        }
                      }}
                    />{" "}
                    Kč
                  </Col>
                ) : (
                  <Col>{request?.amount?.toLocaleString()} Kč</Col>
                )}
              </Row>
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                {validated &&
                  "Zadaná částka nesmí být nižší než 5 000 a vyšší než 1 200 000 Kč"}
              </div>
            </div>

            <div
              className={showEdit ? "requestDetail-edit" : "requestDetail-row"}
            >
              <Row>
                <Col>Doba splácení</Col>

                {showEdit ? (
                  <Col>
                    <input
                      className="request-input"
                      type="number"
                      value={edit.numOfMonthsE}
                      defaultValue={request?.numOfMonths}
                      name="numOfMonthsE"
                      min={5}
                      max={60}
                      onChange={(e) => {
                        const tmpAmount = +e.target.value.replace(/\s/g, "");

                        if (tmpAmount < 5 || tmpAmount > 60) {
                          setValidatedMonth(!validatedMonth);
                          handleEditChange(e);
                        } else {
                          handleEditChange(e);
                          setValidatedMonth(false);
                        }
                      }}
                    />{" "}
                    měsíců
                  </Col>
                ) : (
                  //   <Col>
                  //     <input
                  //       className="input"
                  //       name="numOfMonthsE"
                  //       value={edit.numOfMonthsE}
                  //       defaultValue={request?.numOfMonths}
                  //       type="number"
                  //       onChange={handleEditChange}
                  //       min={5}
                  //       max={60}
                  //     />
                  //     <Form.Control.Feedback type="invalid">
                  //       Doba splácení může být od 5 do 60 měsíců
                  //     </Form.Control.Feedback>
                  //   </Col>
                  <Col>{request?.numOfMonths} měsíců</Col>
                )}
              </Row>
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                {validatedMonth &&
                  "Počet měsíců nesmí být nižší než 5 a vyšší než 60"}
              </div>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>Měsíční splátka</Col>
                <Col>{calculateData?.monthlyPayment?.toLocaleString()} Kč</Col>
              </Row>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>Roční úroková sazba</Col>
                <Col>{calculateData?.yearlyInterest?.toFixed(1)}%</Col>
              </Row>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>RPSN</Col>
                <Col>{calculateData?.RPSN?.toFixed(1)}%</Col>
              </Row>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>Celková částka</Col>
                <Col>{calculateData?.overallAmount?.toLocaleString()} Kč</Col>
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

        {isLogedIn() ? (
          <div>
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
                cookies.set(
                  `requestCount${request?.id}`,
                  +cookies.get(`requestCount${request?.id}`)
                    ? +cookies.get(`requestCount${request?.id}`) + 1
                    : 1,
                  { path: "/" }
                );
              }}
            >
              Zamítnout
            </button>
          </div>
        ) : (
          !isLogedIn() &&
          (+cookies.get(`requestCount${request?.id}`) < 3 ||
            !cookies.get(`requestCount${request?.id}`)) &&
          request?.status !== "APPROVED" && (
            <button
              className={showEdit ? "outline-dark-button" : "primary-button"}
              onClick={() => {
                setShowEdit(!showEdit);
              }}
            >
              {showEdit ? "Zrušit úpravy" : "Upravit"}
            </button>
          )
        )}
        {showEdit && (
          <button
            disabled={validated || validatedMonth}
            className="primary-button"
            onClick={() => {
              editRequest();
            }}
          >
            Uložit změny
          </button>
        )}
        {showDeleteModal === true && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            id={request.id}
          />
        )}
      </div>
    );
  }
}

export default RequestDetail;
