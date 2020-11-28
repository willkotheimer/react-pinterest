import React from 'react';
import {
  deletePin,
  deleteBoardPin,
  PinBoardsAll
} from '../../helpers/data/pinData';

export default class DeletePinBtn extends React.Component {
  state = {
    name: this.props.pin.name,
    firebaseKey: this.props.pin.firebaseKey,
    pins: this.props.pins
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
        deletePin(this.state.firebaseKey).then(() => this.props.redrawDom());
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
