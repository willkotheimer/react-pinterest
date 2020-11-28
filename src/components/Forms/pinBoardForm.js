import React from 'react';
import { AddPinToBoard } from '../../helpers/data/pinData';

export default class PinBoardForm extends React.Component {
  state = {
    userId: this.props.id,
    boardId: this.props.board.firebaseKey,
    pinId: this.props.pin.firebaseKey,
  };

  handleClick = (e) => {
    // update state for the userId, board, and pin:
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });

    AddPinToBoard(this.state).then(() => this.props.redrawDom());


  };

  render() {
    const { userId, board, pin } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>

        <h3 className="addToDom">Add {this.props.pin.name} pin</h3>
        <h3>to:</h3>
        <h3 className="addToDom">Board {this.props.board.name}</h3>
        <input
          type="hidden"
          name="pinId"
          value={pin}
        />
        <input
          type="hidden"
          name="boardId"
          value={board}
        />
        <input
          type="hidden"
          name="userId"
          value={userId}
        />
        <button onClick={e => this.handleClick}>Add Pin</button>
      </form >
    );
  }
}

