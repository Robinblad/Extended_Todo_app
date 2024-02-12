import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <h2 className="headerLabelName">task MANAGER</h2>
        <div className="block22"></div>
        <div className={"nav-container"}>
          <Link to="/worktable" className="nav-item">
            Worktable
          </Link>
          <Link to="/sprint" className="nav-item">
            Sprint
          </Link>
          <Link to="/admin" className="nav-item">
            Admin
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
