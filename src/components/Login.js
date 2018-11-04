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
    <a href="https://www.freeprivacypolicy.com/privacy/view/f99a94fbeb02fc46134d1e819ed53a22">
      Privacy Policy
    </a>
  </nav>
);

export default Login;
