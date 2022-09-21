import { createContext, useState } from "react";
import { encode } from "base-64";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  console.log(user);
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
  const value = { loginUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
