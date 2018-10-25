import React, { Component } from "react";

class EditProfile extends Component {
  handleChange = event => {
    const updatedProfile = {
      ...this.props.user,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.setState({ ...updatedProfile });
  };

  handleClick = event => {
    event.preventDefault();
    this.props.updateProfile({ ...this.state });
  };

  render() {
    return (
      <form>
        <label>
          Handle:
          <input type="text" name="handle" onChange={this.handleChange} />
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
        <button value="Save" onClick={this.handleClick}>
          Save
        </button>
      </form>
    );
  }
}

export default EditProfile;
