import React from 'react';
import { getBoardPins, getPin } from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/boardsForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: []
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    this.getBoardInfo(boardId);

    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.findPinsForBoard(boardId)
      .then(resp => {
        this.setState({
          pins: resp
        });
      })
      .catch(error => console.warn(error));
  }

  findPinsForBoard = boardId =>
    getBoardPins(boardId).then(resp => {
      const pinArray = [];
      resp.forEach(pin => {
        pinArray.push(getPin(pin.pinId));
      });
      return Promise.all([...pinArray]);
    });

  getBoardInfo = boardId => {
    getSingleBoard(boardId).then(response => {
      this.setState({
        board: response
      });
    });
  };

  render() {
    const { pins, board } = this.state;
    const renderPins = () =>
      // 4. map over the pins in state
      pins.map(pin => <PinsCard key={pin.firebaseKey} pin={pin} />);

    // 5. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
          {Object.keys(board).length && (
            <BoardForm board={board} onUpdate={this.getBoardInfo} />
          )}
        </AppModal>

        <h1>{board.name}</h1>
        <div className="d-flex flex-wrap container">{renderPins()}</div>
      </div>
    );
  }
}
