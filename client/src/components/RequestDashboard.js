import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiArrowDownDropCircleOutline,
  mdiArrowUpDropCircleOutline,
  mdiFilterOutline,
} from "@mdi/js";
import UserContext from "../context/UserProvider";
import Loading from "./Loading";
import ServerError from "./ServerError";

function RequestDashboard() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [status, setStatus] = useState("pending");
  //fetch data to render information about loaning of each client
  useEffect(() => {
    fetch("http://localhost:8000/request/list", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
        setData(data);
        setAllData(data);
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [user.token]);

  const sortDataAsc = () => {
    const copy = [...data];
    const newData = copy.sort((a, b) => a.amount - b.amount);
    setData(newData);
  };
  const sortDataDesc = () => {
    const copy = [...data];
    const newData = copy.sort((a, b) => b.amount - a.amount);
    setData(newData);
  };
  const sortSurnameAsc = () => {
    const copy = [...data];
    const newData = copy.sort((a, b) => a.surname.localeCompare(b.surname));
    setData(newData);
  };
  const sortSurnameDesc = () => {
    const copy = [...data];
    const newData = copy.sort((a, b) => b.surname.localeCompare(a.surname));
    setData(newData);
  };

  const filterByApplicantType = (applicant) => {
    if (applicant === "ALL") {
      setData(allData);
    } else {
      setData(
        allData.filter((i) => {
          return i.applicantType === applicant;
        })
      );
    }
  };
  const handleChange = (e) => {
    filterByApplicantType(e.target.value);
  };

  if (status === "pending") {
    return <Loading />;
  } else if (status === "error") {
    return (
      <div className="container">
        <ServerError />
      </div>
    );
  } else {
    return (
      <>
        <Container className="container">
          <div className="input-container">
            <i className="input-icon">
              <Icon size={1} path={mdiFilterOutline} className="icon" />
            </i>
            <select onChange={handleChange} className="input">
              <option value="ALL">V??e</option>
              <option value="INDIVIDUAL">Fyzick?? osoba</option>
              <option value="OSVC">Podnikatel</option>
              <option value="LEGAL_ENTITY">Pr??vnick?? osoba</option>
            </select>
          </div>

          <Table responsive>
            <thead className="thead">
              <tr>
                <th>Typ ??adatele</th>
                <th>
                  N??zev firmy{" "}
                  <Icon
                    onClick={sortSurnameAsc}
                    size={0.8}
                    path={mdiArrowUpDropCircleOutline}
                  />
                  <Icon
                    onClick={sortSurnameDesc}
                    size={0.8}
                    path={mdiArrowDownDropCircleOutline}
                  />
                </th>
                <th>
                  Jm??no{" "}
                  <Icon
                    onClick={sortSurnameAsc}
                    size={0.8}
                    path={mdiArrowUpDropCircleOutline}
                  />
                  <Icon
                    onClick={sortSurnameDesc}
                    size={0.8}
                    path={mdiArrowDownDropCircleOutline}
                  />
                </th>
                <th>
                  P????jmen??
                  <Icon
                    onClick={sortSurnameAsc}
                    size={0.8}
                    path={mdiArrowUpDropCircleOutline}
                  />
                  <Icon
                    onClick={sortSurnameDesc}
                    size={0.8}
                    path={mdiArrowDownDropCircleOutline}
                  />
                </th>
                <th>
                  V????e ??v??ru
                  <Icon
                    onClick={sortDataAsc}
                    size={0.8}
                    path={mdiArrowUpDropCircleOutline}
                  />
                  <Icon
                    onClick={sortDataDesc}
                    size={0.8}
                    path={mdiArrowDownDropCircleOutline}
                  />
                </th>
                <th>
                  Doba spl??cen??{" "}
                  <Icon
                    onClick={sortDataAsc}
                    size={0.8}
                    path={mdiArrowUpDropCircleOutline}
                  />
                  <Icon
                    onClick={sortDataDesc}
                    size={0.8}
                    path={mdiArrowDownDropCircleOutline}
                  />
                </th>
                <th>Stav ????dosti</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => {
                return (
                  <tr key={element.id}>
                    <td>
                      {element?.applicantType === "INDIVIDUAL" &&
                        "Fyzick?? osoba"}
                      {element?.applicantType === "OSVC" && "Podnikatel"}
                      {element?.applicantType === "LEGAL_ENTITY" &&
                        "Pr??vnick?? osoba"}
                    </td>
                    <td>
                      {element?.applicantType === "LEGAL_ENTITY"
                        ? element?.companyName
                        : "-"}
                    </td>
                    <td>{element?.name}</td>
                    <td>{element?.surname}</td>
                    <td>{element?.amount?.toLocaleString()} CZK</td>
                    <td>{element?.numOfMonths} m??s??c??</td>
                    <td>
                      {" "}
                      {element?.status === "APPROVED"
                        ? "SCHV??LENO"
                        : element?.status === "CANCELLED"
                        ? "ZAM??TNUTO"
                        : "??EK?? NA VY????ZEN??"}
                    </td>
                    <td>
                      <Link
                        to={`/request/${element.id}`}
                        className="outline-button"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default RequestDashboard;
