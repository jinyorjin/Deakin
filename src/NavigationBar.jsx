import React from "react";
import { Outlet, Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/about">
        About
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
      <Outlet />
    </div>
  );
}

export default NavigationBar;
