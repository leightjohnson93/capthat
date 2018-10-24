import React, { Component } from "react";
import firebase from "firebase";
import logo from "../logo.svg";
import "../css/App.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.userId
    };
  }

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
    this.props.history.push(`/`);
  };

  // componentWillMount() {
  //   const userRef = firebase.database().ref("user");
  //   userRef.push(this.state.userId);
  // }

  render() {
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
