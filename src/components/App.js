import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile";
import Nav from "./Nav";
import Login from "./Login";
import Newsfeed from "./Newsfeed";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class App extends Component {
  authHandler = async authData => {
    const { uid, displayName, email, photoURL } = authData.user;
    this.uid = uid;
    const users = await base.fetch("users", { context: this });
    if (!users[uid]) {
      const userRef = firebase.database().ref("users");
      userRef.set({ [uid]: { uid, displayName, email, photoURL } });
    }
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
    this.forceUpdate();
  };

  updateProfile = updatedProfile => {
    this.setState({ [this.uid]: updatedProfile });
    this.editProfile = false;
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
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path="/" render={() => <Newsfeed {...this.props} />} />
          <Route
            path="/profile"
            render={() => (
              <Profile
                logout={this.logout}
                addPhoto={this.addPhoto}
                removePhoto={this.removePhoto}
                updateProfile={this.updateProfile}
                editProfile={this.editProfile}
                uid={this.state[this.uid].uid}
                {...this.state}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
