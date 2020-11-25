import React from 'react';
import {
  deleteBoard,
  deleteBoardPin,
  PinBoardsAll
} from '../../helpers/data/boardData';

export default class DeleteBoardBtn extends React.Component {
  state = {
    name: this.props.board.name,
    firebaseKey: this.props.board.firebaseKey,
    board: this.props.board
  };

  handleSubmit = e => {
    e.preventDefault();

    PinBoardsAll().then(response => {
      if (response) {
        for (const [key, value] of Object.entries(response)) {
          if (Object.values(value).includes(this.state.firebaseKey)) {
            // 1 if needed, delete the board-pin [key]
            deleteBoardPin(key);
          }
        }
        // 2 delete the pin
        // Update state
        deleteBoard(this.state.firebaseKey).then(() => this.props.redrawDom());
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="deleteGrade">{this.state.name}</h1>
        <input
          type="hidden"
          name="firebaseKey"
          value={this.state.firebaseKey}
        />
        <button onClick={e => this.handleClick}>Delete</button>
      </form>
    );
  }
}
