import React, { Component, Fragment } from "react";
import Login from "./Login";
import UserPhotos from "./UserPhotos";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class Profile extends Component {
  state = {
    senderEditProfile: false,
    renderUserPhotos: false
  };

  authHandler = async authData => {
    const { uid, displayName, email, photoURL } = authData.user;
    this.uid = uid;
    const users = await base.fetch("users", { context: this });
    if (!users[uid]) {
      const userRef = firebase.database().ref("users");
      userRef.set({ [uid]: { uid, displayName, email, photoURL } });
    }
    this.props.history.push(`/user/`);
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

  updateProfile = updatedProfile =>
    this.setState({ [this.uid]: updatedProfile, renderEditProfile: false });

  handleEdit = () => this.setState({ renderEditProfile: true });

  handlePhotos = () => this.setState({ renderUserPhotos: true });

  addPhoto = userPhotos => {
    const newState = { ...this.state };
    newState[this.uid].photos = userPhotos;
    this.setState(newState);
  };

  removePhoto = key => {
    firebase
      .storage()
      .ref(`users/${this.uid}/${key}`)
      .delete()
      .then();
    const photos = { ...this.state[this.uid].photos };
    photos[key] = null;
    const newState = { ...this.state };
    newState[this.uid].photos = photos;
    this.setState(newState);
  };

  render() {
    if (!this.state[this.uid]) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.renderUserPhotos) {
      return (
        <UserPhotos
          user={this.state[this.uid]}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
        />
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state[this.uid].handle}</p>
          <img src={this.state[this.uid].photoURL} alt="Profile" />
          <button onClick={this.logout}>Logout</button>
          {this.state.renderEditProfile || !this.state[this.uid].handle ? (
            <EditProfile
              user={this.state[this.uid]}
              updateProfile={this.updateProfile}
            />
          ) : (
            <Fragment>
              <button onClick={this.handleEdit}>Edit Profile</button>
              <button onClick={this.handlePhotos}>My Photos</button>
            </Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default Profile;
