import { createContext, useState } from "react";
import { encode } from "base-64";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const loginUser = (loginData) => {
    fetch("http://localhost:8000/login", {
      headers: {
        Authorization: `Basic ${encode(
          `${loginData.username}:${loginData.password}`
        )}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  };
  const isLogedIn = () => {
    if (user?.error || !user) {
      return false;
    } else {
      return true;
    }
  };
  const logOut = () => {
    setUser(false);
  };
  const approveRequest = (id) => {
    fetch(`http://localhost:8000/request/${id}/approve`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const deleteRequest = (id) => {
    fetch(`http://localhost:8000/request/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const cancelRequest = (id) => {
    fetch(`http://localhost:8000/request/${id}/cancel`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };
  const value = {
    loginUser,
    isLogedIn,
    user,
    logOut,
    approveRequest,
    cancelRequest,
    deleteRequest,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
