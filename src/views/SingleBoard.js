import React from 'react';
import { getBoardPins, getPin, getAllPins } from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/boardsForm';
import AddPinBoard from '../components/Forms/addPinToBoard';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
    AllPins: []
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

    // 4. Make a call to api to get all pins so to allow adding any pin
    // your board

    getAllPins()
      .then(resp => {
        this.setState({
          AllPins: resp
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
    const { pins, board, AllPins } = this.state;
    const renderPins = () =>
      pins.map(pin => <PinsCard key={pin.firebaseKey} pin={pin} />);
    return (
      <div>
        <AppModal title={'Edit Board'} buttonLabel={'Edit Board'}>
          {Object.keys(board).length && (
            <BoardForm board={board} onUpdate={this.getBoardInfo} />
          )}
        </AppModal>
        <AppModal title={'Add Pin to Board'} buttonLabel={'Add Pin To Board'}>
          {Object.keys(board).length && (
            <AddPinBoard
              board={board}
              pins={AllPins}
              onUpdate={this.getBoardInfo}
            />
          )}
        </AppModal>

        <h1>{board.name}</h1>
        <div className="d-flex flex-wrap container">{renderPins()}</div>
      </div>
    );
  }
}
