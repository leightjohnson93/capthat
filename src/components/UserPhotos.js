import React, { Component } from "react";
import Photo from "./Photo";
import firebase from "firebase/app";
import "firebase/storage";

class UserPhotos extends Component {
  state = { progress: "" };
  handleFileSelect = event => {
    this.setState({ selectedFile: event.target.files[0], progress: "" });
  };
  handleUpload = () => {
    const key = Date.now();
    const uploadTask = firebase
      .storage()
      .ref(`users/${this.props.user.uid}/${key}`)
      .put(this.state.selectedFile);
    const newState = { ...this.state };
    newState.selectedFile = null;
    this.setState(newState);
    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = `(${Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )}%)`;
        this.setState({ progress });
      },
      error => console.log(`Error: ${error}`),
      () =>
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState({ progress: "" });
          this.props.addPhoto({ [key]: downloadURL });
        })
    );
  };

  render() {
    return (
      <div className="App App-header">
        <button onClick={this.props.handlePhotos}>Back</button>
        <input
          type="file"
          onChange={this.handleFileSelect}
          disabled={this.state.progress !== ""}
        />
        <button
          onClick={this.handleUpload}
          disabled={!this.state || !this.state.selectedFile}
        >
          Upload {this.state.progress}
        </button>
        <div className="user-photos">
          {this.props.user.photos ? (
            Object.keys(this.props.user.photos).map(key => (
              <Photo
                key={key}
                photoKey={key}
                url={this.props.user.photos[key]}
                removePhoto={this.props.removePhoto}
              />
            ))
          ) : (
            <h2>Upload photos you want captioned!</h2>
          )}
        </div>
      </div>
    );
  }
}

export default UserPhotos;
