import React, { Component } from 'react';
import getUser from '../../helpers/data/authData';
import { AddPinToBoard, getAllUserPins } from '../../helpers/data/pinData';

export default class PinBoardForm extends Component {
  state = {
    userId: this.props.id,
    board: this.props.board,
    pin: this.props.pin,
  };

  getPins = () => {
    const UID = getUser();
    getAllUserPins(UID).then(response => {
      this.setState(
        {
          pins: response.data
        },
        this.setLoading
      );
    });
  };

  handleClick = (e) => {
    // update state for the userId, board, and pin:
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    AddPinToBoard(
      {
        boardId: this.state.board.firebaseKey,
        pinId: this.state.pin.firebaseKey,
        userId: this.state.userId
      }).then(() => this.props.redrawDom());

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <h3 className="addToDom">Add {this.state.pin.name} pin</h3>
        <h3>to:</h3>
        <h3 className="addToDom">Board {this.state.board.name}</h3>
        <input
          type="hidden"
          name="pinId"
          value={this.state.pin.firebaseKey}
        />
        <input
          type="hidden"
          name="boardId"
          value={this.state.board.firebaseKey}
        />
        <input
          type="hidden"
          name="userId"
          value={this.state.userId}
        />
        <button onClick={e => this.handleClick}>Add Pin</button>
      </form >
    );
  }
}

