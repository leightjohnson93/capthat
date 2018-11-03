import React from "react";
import "firebase/auth";

const Login = props => (
  <nav className="App-header">
    <h2>CapThat</h2>
    <p>Sign in or create an account.</p>
    {/* <button
          className="twitter"
          onClick={() => this.authenticate("Twitter")}
        >
          Log In With Twitter
        </button> */}
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
  </nav>
);

export default Login;
