import React, { Component, Fragment } from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";
import App from "./App";

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <Link to="/profile">Profile</Link>
      </nav>
    );
  }
}

export default Nav;
