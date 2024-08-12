import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/user.context";
import { StaffProvider } from "./context/staff.context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <StaffProvider>
        <App />
      </StaffProvider>
    </UserProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
