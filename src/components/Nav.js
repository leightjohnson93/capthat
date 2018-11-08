import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <Link to="/profile">
        <button>hmm</button>
      </Link>
    );
  }
}

export default Nav;
