import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Row, Col, Container, InputGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiArrowDownDropCircleOutline,
  mdiArrowUpDropCircleOutline,
  mdiFilterOutline,
} from "@mdi/js";
import UserContext from "../context/UserProvider";

function RequestDashboard() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/request/list", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setAllData(data);
      });
  }, []);

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
  console.log(data);
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

  return (
    <>
      <Container className="container">
        <div className="input-container">
          <i className="input-icon">
            <Icon size={1} path={mdiFilterOutline} className="icon" />
          </i>
          <select onChange={handleChange} className="input">
            <option value="ALL">Vše</option>
            <option value="INDIVIDUAL">Fyzická osoba</option>
            <option value="OSVC">Podnikatel</option>
            <option value="LEGAL_ENTITY">Právnická osoba</option>
          </select>
        </div>

        <Table responsive>
          <thead className="thead">
            <tr>
              <th>Typ žadatele</th>
              <th>
                Název firmy{" "}
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
                Jméno{" "}
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
                Příjmení
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
                Výše úvěru
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
                Doba splácení{" "}
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
              <th>Stav žádosti</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <tr>
                  <td>
                    {element?.applicantType === "INDIVIDUAL" && "Fyzická osoba"}
                    {element?.applicantType === "OSVC" && "Podnikatel"}
                    {element?.applicantType === "LEGAL_ENTITY" &&
                      "Právnická osoba"}
                  </td>
                  <td>
                    {element?.applicantType === "LEGAL_ENTITY"
                      ? element?.companyName
                      : "-"}
                  </td>
                  <td>{element?.name}</td>
                  <td>{element?.surname}</td>
                  <td>{element?.amount?.toLocaleString()} CZK</td>
                  <td>{element?.numOfMonths} měsíců</td>
                  <td>
                    {" "}
                    {element?.status === "APPROVED"
                      ? "SCHVÁLENO"
                      : element?.status === "CANCELLED"
                      ? "ZAMÍTNUTO"
                      : "ČEKÁ NA VYŘÍZENÍ"}
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

export default RequestDashboard;
