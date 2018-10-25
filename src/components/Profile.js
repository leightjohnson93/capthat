import React, { Component } from "react";
import Login from "./Login";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import logo from "../logo.svg";
import "../css/App.css";

class Profile extends Component {
  state = {};

  authHandler = async authData => {
    const { uid, displayName, email } = authData.user;
    this.uid = authData.user.uid;
    const users = await base.fetch("users", { context: this });
    if (!users[uid]) {
      const userRef = firebase.database().ref("users");
      userRef.set({ [uid]: { uid, displayName, email } });
    }
    this.props.history.push(`/user/${uid}`);
    base.syncState(`users/${uid}`, {
      context: this,
      state: uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    delete this.state[this.uid];
    this.setState(this.state);
    this.props.history.push(`/`);
  };

  updateProfile = updatedProfile => {
    this.setState({ [this.uid]: updatedProfile });
  };

  render() {
    if (!Object.keys(this.state).length) {
      return <Login authenticate={this.authenticate} />;
    } else if (!this.state[this.uid].handle) {
      return (
        <EditProfile
          user={this.state[this.uid]}
          updateProfile={this.updateProfile}
        />
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to CapThat</p>
          <button onClick={this.logout}>Logout</button>
        </header>
      </div>
    );
  }
}

export default Profile;
