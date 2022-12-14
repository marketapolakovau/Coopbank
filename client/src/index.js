import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import Admin from "./routes/Admin";
import Home from "./components/Home";
import Calculator from "./components/Calculator";
import PersonalDataForm from "./components/PersonalDataForm";
import RequestDetail from "./components/RequestDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/form" element={<PersonalDataForm />} />
            <Route path="/request/:id" element={<RequestDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
