import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
import Admin from "../routes/Admin";

function Home() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default Home;
