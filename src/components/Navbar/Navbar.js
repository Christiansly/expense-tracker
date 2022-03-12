import React from "react";
import "./Navbar.css";
function Navbar(props) {
  const handleLogout = () => {
    props.onLogout();
  };
  return (
    <div className="navbar">
      <div className="navbar__controls">
        <div className="navbar__control">Hi, {props.name}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
