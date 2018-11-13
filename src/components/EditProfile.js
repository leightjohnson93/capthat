import React, { Component } from "react";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { handle, email, displayName } = this.props[this.props.uid];
    Object.assign(this, { handle, email, displayName });
  }

  componentDidMount() {
    this.setState({
      handle: this.handle,
      email: this.email,
      displayName: this.displayName
    });
  }

  handleChange = event =>
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });

  handleSave = event => {
    event.preventDefault();
    const { handle, email, displayName } = this.state;
    this.props.updateProfile({ handle, email, displayName });
    this.props.toggleView(event);
  };

  render() {
    return (
      <form className="EditProfile">
        <label>
          Handle:
          <input
            type="text"
            name="handle"
            defaultValue={this.handle}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="displayName"
            defaultValue={this.displayName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            defaultValue={this.email}
            onChange={this.handleChange}
          />
        </label>
        <button
          name="editProfile"
          onClick={this.handleSave}
          disabled={
            !(this.state.handle && this.state.email && this.state.displayName)
          }
        >
          Save
        </button>
      </form>
    );
  }
}

export default EditProfile;
