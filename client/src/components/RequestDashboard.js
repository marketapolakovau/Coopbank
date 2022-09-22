import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Icon from "@mdi/react";
import {
  mdiArrowDownDropCircleOutline,
  mdiArrowUpDropCircleOutline,
} from "@mdi/js";

function RequestDashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/request/list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
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

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID žádosti </th>
          <th>Druh žádost</th>
          <th>
            Částka k půjčení
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
        </tr>
      </thead>
      <tbody>
        {data.map((element) => {
          return (
            <tr>
              <td>{element.id}</td>
              <td></td>
              <td>{element.amount}</td>
              <td>{element.numOfMonths} měsíců</td>
              <td>{element.status}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RequestDashboard;
