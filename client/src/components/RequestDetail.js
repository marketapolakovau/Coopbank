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
import ServerError from "./ServerError";
import Error404 from "./Error404";

function RequestDetail() {
  const [request, setRequest] = useState();
  const [calculateData, setCalculateData] = useState();
  const [render, setRender] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validatedMonth, setValidatedMonth] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [status, setStatus] = useState("pending");
  const [statusCode, setStatusCode] = useState();
  const cookies = new Cookies();
  let phone = request?.phone.slice(4).toLocaleString();
  phone = +phone;
  let prefix = request?.phone.slice(0, 4).toLocaleString();

  const [edit, setEdit] = useState({
    amountE: request?.amount,
    numOfMonthsE: request?.numOfMonths,
  });
  const [showEdit, setShowEdit] = useState(false);
  const { id } = useParams();
  const { approveRequest, cancelRequest, isLogedIn, user } =
    useContext(UserContext);

  //fetch data to get personal info about client
  useEffect(() => {
    fetch(`http://localhost:8000/request/${id}`)
      .then((res) => {
        if (res.status > 399) {
          setStatusCode(res.status);
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setStatus("success");
        setRequest(data);
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [render, id]);

  //fetch data to get data from calculator
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
          Promise.reject(res.status);
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  //fetch data to update client detail request
  const editRequest = () => {
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
          return Promise.reject(res.status);
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
  } else if (statusCode < 499) {
    return (
      <div className="container">
        <Error404 />
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="container">
        <ServerError />
      </div>
    );
  } else {
    return (
      <div className="requestDetail-container">
        <Row>
          <Col xs={2} md={10}>
            <h3 className="greenText">Detail ????dosti</h3>
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
                Odstranit ????dost
              </button>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <p className="greenText">??daje o ??adateli</p>
            <div className="requestDetail-row">
              <Row className="row">
                <Col>Typ ??adatele</Col>
                <Col>
                  {request?.applicantType === "INDIVIDUAL" && "Fyzick?? osoba"}
                  {request?.applicantType === "OSVC" && "Podnikatel"}
                  {request?.applicantType === "LEGAL_ENTITY" &&
                    "Pr??vnick?? osoba"}
                </Col>
              </Row>
            </div>
            <div className="requestDetail-row">
              <Row className="row">
                <Col>
                  {request?.applicantType === "LEGAL_ENTITY"
                    ? "N??zev firmy"
                    : "Jm??no"}
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
                    ? "I??O"
                    : "P????jmen??"}
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
                    "Jm??no a p????jmen??"}
                  {request?.applicantType === "INDIVIDUAL" && "Rodn?? ????slo"}
                  {request?.applicantType === "OSVC" && "I??O"}
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
                    : "St??tn?? p????slu??nost"}
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
                <Col>Telefonn?? ????slo</Col>
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
            <p className="greenText">P??j??ka</p>

            <div
              className={showEdit ? "requestDetail-edit" : "requestDetail-row"}
            >
              <Row>
                <Col>V????e ??v??ru</Col>

                {showEdit ? (
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
                    K??
                  </Col>
                ) : (
                  <Col>{request?.amount?.toLocaleString()} K??</Col>
                )}
              </Row>
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                {validated &&
                  "Zadan?? ????stka nesm?? b??t ni?????? ne?? 5 000 a vy?????? ne?? 1 200 000 K??"}
              </div>
            </div>

            <div
              className={showEdit ? "requestDetail-edit" : "requestDetail-row"}
            >
              <Row>
                <Col>Doba spl??cen??</Col>

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
                    m??s??c??
                  </Col>
                ) : (
                  <Col>{request?.numOfMonths} m??s??c??</Col>
                )}
              </Row>
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                {validatedMonth &&
                  "Po??et m??s??c?? nesm?? b??t ni?????? ne?? 5 a vy?????? ne?? 60"}
              </div>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>M??s????n?? spl??tka</Col>
                <Col>{calculateData?.monthlyPayment?.toLocaleString()} K??</Col>
              </Row>
            </div>
            <div className="requestDetail-row">
              <Row>
                <Col>Ro??n?? ??rokov?? sazba</Col>
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
                <Col>Celkov?? ????stka</Col>
                <Col>{calculateData?.overallAmount?.toLocaleString()} K??</Col>
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
                    ? "SCHV??LENO"
                    : request?.status === "CANCELLED"
                    ? "ZAM??TNUTO"
                    : "??EK?? NA VY????ZEN??"}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {/* If request is not approved than admin can refuse or accept the request */}
        {isLogedIn() && request?.status !== "APPROVED" ? (
          <div>
            <button
              className="primary-button"
              onClick={() => {
                approveRequest(request.id);

                setRender(!render);
              }}
            >
              Schv??lit
            </button>
            <button
              className="danger-button"
              onClick={() => {
                cancelRequest(request.id);
                setRender(!render);
                //setting cookies so request can be refused only 3 times
                cookies.set(
                  `requestCount${request?.id}`,
                  +cookies.get(`requestCount${request?.id}`)
                    ? +cookies.get(`requestCount${request?.id}`) + 1
                    : 1,
                  { path: "/" }
                );
              }}
            >
              Zam??tnout
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
              {showEdit ? "Zru??it ??pravy" : "Upravit"}
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
            Ulo??it zm??ny
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
