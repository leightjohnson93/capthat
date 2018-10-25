import React, { Component } from "react";

class EditProfile extends Component {
  render() {
    return (
      <form>
        <input type="text" className="handle" />
        <input type="text" className="name" />
      </form>
    );
  }
}

export default EditProfile;
