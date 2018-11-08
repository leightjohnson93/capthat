import React, { Component, Fragment } from "react";
import Login from "./Login";
import UserPhotos from "./UserPhotos";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  authHandler = async authData => {
    const { uid, displayName, email, photoURL } = authData.user;
    this.uid = uid;
    const users = await base.fetch("users", { context: this });
    if (!users[uid]) {
      const userRef = firebase.database().ref("users");
      userRef.set({ [uid]: { uid, displayName, email, photoURL } });
    }
    this.props.history.push(`/profile/`);
    base.syncState(`users/${uid}`, {
      context: this,
      state: uid
    });
  };

  authenticate = provider => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
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
    this.setState({ [this.uid]: updatedProfile, editProfile: false });

  toggleView = event => {
    const { name } = event.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  addPhoto = photo => {
    const newState = { ...this.state };
    newState[this.uid].photos = photo;
    this.setState(newState);
  };

  removePhoto = key => {
    firebase
      .storage()
      .ref(`users/${this.uid}/${key}`)
      .delete()
      .then(() => {
        const state = { ...this.state };
        state[this.uid].photos[key] = null;
        this.setState(state);
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.authHandler({ user });
    });
  }

  render() {
    if (!this.state || !this.state[this.uid]) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.showPhotos) {
      return (
        <UserPhotos
          user={this.state[this.uid]}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
          unMount={this.toggleView}
        />
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state[this.uid].handle}</p>
          <img src={this.state[this.uid].photoURL} alt="Profile" />
          <button onClick={this.logout}>Logout</button>
          {this.state.editProfile || !this.state[this.uid].handle ? (
            <EditProfile
              user={this.state[this.uid]}
              updateProfile={this.updateProfile}
            />
          ) : (
            <Fragment>
              <button name="editProfile" onClick={this.toggleView}>
                Edit Profile
              </button>
              <button name="showPhotos" onClick={this.toggleView}>
                My Photos
              </button>
            </Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default Profile;
