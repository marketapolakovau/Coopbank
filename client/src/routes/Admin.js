import { useContext } from "react";
import UserContext from "../context/UserProvider";
import RequestDashboard from "../components/RequestDashboard";
import Login from "../components/Login";

function Admin() {
  const { isLogedIn } = useContext(UserContext);
  return <div>{isLogedIn() ? <RequestDashboard /> : <Login />}</div>;
}

export default Admin;
