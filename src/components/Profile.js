import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import UserPhotos from "./UserPhotos";
import EditProfile from "./EditProfile";
import firebase from "firebase/app";
import base, { firebaseApp } from "../base";
import "../css/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.uid = this.props.uid;
    this.state = { editProfile: this.props.editPhoto };
  }

  toggleView = event => {
    const { name } = event.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  render() {
    if (this.state.showPhotos) {
      return <UserPhotos {...this.props} unMount={this.toggleView} />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>{[this.uid].handle}</p>
          <img src={this.props[this.uid].photoURL} alt="Profile" />
          <button>
            <Link to="/" onClick={this.props.logout}>
              Logout
            </Link>
          </button>
          {this.state.editProfile || !this.props.uid ? (
            <EditProfile {...this.props} toggleView={this.toggleView} />
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
