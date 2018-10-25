import React, { Component } from "react";
import "firebase/auth";

class Login extends Component {
  render() {
    return (
      <nav className="login">
        <h2>CapThat</h2>
        <p>Sign in or create an account.</p>
        {/* <button
          className="twitter"
          onClick={() => this.authenticate("Twitter")}
        >
          Log In With Twitter
        </button> */}
        <button
          className="facebook"
          onClick={() => this.props.authenticate("Facebook")}
        >
          Log In With Facebook
        </button>
      </nav>
    );
  }
}

export default Login;
