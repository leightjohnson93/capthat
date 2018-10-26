import React, { Component } from "react";
import Login from "./Login";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/App.css";

class Profile extends Component {
  state = { editProfile: false };

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
    this.setState({ [this.uid]: updatedProfile, editProfile: false });
  };

  handleEdit = () => this.setState({ editProfile: true });

  render() {
    if (!this.state[this.uid]) {
      return <Login authenticate={this.authenticate} />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state[this.uid].handle}</p>
          <button onClick={this.logout}>Logout</button>
          {this.state.editProfile || !this.state[this.uid].handle ? (
            <EditProfile
              user={this.state[this.uid]}
              updateProfile={this.updateProfile}
            />
          ) : (
            <button onClick={this.handleEdit}>Edit Profile</button>
          )}
        </header>
      </div>
    );
  }
}

export default Profile;
