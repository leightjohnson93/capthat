import React, { Component } from "react";
import firebase from "firebase";
import logo from "../logo.svg";
import "../css/App.css";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userId: props.match.params.userId
  //   };
  // }

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
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
