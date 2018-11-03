import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/storage";

class UserPhotos extends Component {
  handleFileSelect = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  handleUpload = () => {
    const key = Date.now();
    const uploadTask = firebase
      .storage()
      .ref(`users/${this.props.user.uid}/${key}`)
      .put(this.state.selectedFile);
    delete this.state.selectedFile;
    uploadTask.on(
      "state_changed",
      () => {},
      error => console.log(`Error: ${error}`),
      () =>
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState({ [key]: downloadURL });
          this.props.addPhoto(this.state);
        })
    );
  };

  render() {
    return (
      <div className="App App-header">
        <input type="file" onChange={this.handleFileSelect} />
        <button
          onClick={this.handleUpload}
          disabled={!this.state || !this.state.selectedFile}
        >
          Upload
        </button>
        <div className="user-photos">
          {this.props.user.photos ? (
            Object.keys(this.props.user.photos).map(key => (
              <div className="photo" key={this.props.user.photos[key]}>
                <img src={this.props.user.photos[key]} alt="user uploaded" />
                <button onClick={() => this.props.removePhoto(key)}>
                  &times;
                </button>
              </div>
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
