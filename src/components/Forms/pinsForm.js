import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || ''
  };

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId
    });
  }

  handleChange = e => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`
      );

      imageRef.put(e.target.files[0]).then(snapshot => {
        snapshot.ref.getDownloadURL().then(imageUrl => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      console.warn('inside create', this.state);

      createPin(this.state).then(() => {
        this.props.onUpdate();
      });
    } else {
      updatePin(this.state).then(() => {
        // rerender / update state in the pins component
        this.props.onUpdate(this.props.pin.firebaseKey);
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>pin Form</h1>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="pin Name"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="pin Description"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          type="checkbox"
          name="private"
          value={this.state.private}
          onChange={this.handleChange}
          placeholder="private"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder="Enter an Image Url or upload a file"
          className="form-control form-control-lg m-1"
          required
        />
        <input
          className="m-2"
          type="file"
          id="myFile"
          name="filename"
          accept="image/*"
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}
