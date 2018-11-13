import React, { Component } from "react";
import { Link } from "react-router-dom";

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
