import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import base, { firebaseApp } from "../base";

class Login extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.authHandler({ user });
        // console.log(user);
      }
    });
  }

  // authHandler = async authData => {
  //   // 1 .Look up the current store in the firebase database
  //   const store = await base.fetch(this.props.storeId, { context: this });
  //   // 2. Claim it if there is no owner
  //   if (!store.owner) {
  //     // save it as our own
  //     await base.post(`${this.props.storeId}/owner`, {
  //       data: authData.user.uid
  //     });
  //   }
  //   // 3. Set the state of the inventory component to reflect the current user
  //   this.setState({
  //     uid: authData.user.uid,
  //     owner: store.owner || authData.user.uid
  //   });
  // };

  authHandler = async authData => {
    const { uid, displayName } = authData.user;
    const users = await base.fetch("users", { context: this });
    for (const user in users) {
      if (users[user].uid === uid) {
        this.props.history.push(`/user/${uid}`);
        return authData;
      }
      const userRef = firebase.database().ref("users");
      userRef.push({ uid, displayName });
      this.props.history.push(`/user/${uid}`);
    }
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
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
          onClick={() => this.authenticate("Facebook")}
        >
          Log In With Facebook
        </button>
      </nav>
    );
  }
}

export default Login;
