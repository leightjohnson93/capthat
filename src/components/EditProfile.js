import React, { Component } from "react";

class EditProfile extends Component {
  handleChange = event => {
    const updatedProfile = {
      ...this.props.user,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.setState({ ...updatedProfile });
  };

  handleSave = event => {
    event.preventDefault();
    this.props.updateProfile({ ...this.state });
  };

  render() {
    return (
      <form className="EditProfile">
        <label>
          Handle:
          <input
            type="text"
            name="handle"
            defaultValue={this.props.user.handle}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="displayName"
            defaultValue={this.props.user.displayName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            defaultValue={this.props.user.email}
            onChange={this.handleChange}
          />
        </label>
        <button onClick={this.handleSave}>Save</button>
      </form>
    );
  }
}

export default EditProfile;
