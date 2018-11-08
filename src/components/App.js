import React, { Component, Fragment } from "react";
import Profile from "./Profile";
import Nav from "./Nav";
import Login from "./Login";
import UserPhotos from "./UserPhotos";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Profile />
      </Fragment>
    );
  }
}

export default App;
