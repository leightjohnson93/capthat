import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Profile from "./Profile";
import NotFound from "./NotFound";
import UserPhotos from "./UserPhotos";
import EditProfile from "./EditProfile";
import Nav from "./Nav";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default Router;
