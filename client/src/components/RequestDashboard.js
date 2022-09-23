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
        <Row xs={4}>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text style={{ backgroundColor: "white" }}>
                <Icon size={1} path={mdiFilterOutline} />
              </InputGroup.Text>
              <Form.Select
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="ALL">Vše</option>
                <option value="INDIVIDUAL">Fyzická osoba</option>
                <option value="OSVC">Podnikatel</option>
                <option value="LEGAL_ENTITY">Právnická osoba</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
        <Table responsive>
          <thead className="thead">
            <tr>
              <th>Typ žadatele</th>
              <th>Jméno </th>
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
              <th>Doba splácení</th>
              <th>Stav žádosti</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <tr>
                  <td>
                    {element.applicantType === "INDIVIDUAL" && "Fyzická osoba"}
                    {element.applicantType === "OSVC" && "Podnikatel"}
                    {element.applicantType === "LEGAL_ENTITY" &&
                      "Právnická osoba"}
                  </td>
                  <td>{element.name}</td>
                  <td>{element.surname}</td>
                  <td>{element.amount.toLocaleString()} CZK</td>
                  <td>{element.numOfMonths} měsíců</td>
                  <td>{element.status}</td>
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
