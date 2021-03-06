import React from 'react';
import { getBoardPins, getPin, getAllPins } from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/boardsForm';
import AppModal from '../components/AppModal';
import PinsCardChooser from '../components/Cards/PinsCardChooser';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
    allPins: [],
    show: false
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
          pins: resp,
          show: false
        });
      })
      .catch(error => console.warn(error));

    // Fetch all the pins ahead of time to allow users to choose to add them:
    this.getterAllPins();
  }


  findPinsForBoard = boardId =>
    getBoardPins(boardId).then(resp => {
      const pinArray = [];
      resp.forEach(pin => {
        pinArray.push(getPin(pin.pinId));
      });
      return Promise.all([...pinArray]);
    });

  getPinsForSelection = (all, mine) => {
    return Object.values(all.filter(f => !mine.includes(f.firebaseKey)));
  }


  getPins = () => {
    this.findPinsForBoard(this.props.match.params.id)
      .then(resp => {
        this.setState({
          pins: resp
        });
      })
      .catch(error => console.warn(error));
  }


  getterAllPins = () => {
    getAllPins().then(response => {
      this.setState({ allPins: response });
    });
  }

  getBoardInfo = boardId => {
    getSingleBoard(boardId).then(response => {
      this.setState({
        board: response
      });
    });
  };

  toggleChoices = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { pins, board, allPins } = this.state;
    const renderPins = () =>
      pins.map(pin => <PinsCard key={pin.firebaseKey} pin={pin} redrawDom={this.getPins} />);
    const renderAllPins = () =>
      allPins.map(anypin => <PinsCardChooser key={anypin.firebaseKey} board={board} pin={anypin} id={anypin.userId} redrawDom={this.getPins} />);

    return (
      <div>
        <div className="side-by-side-buttons">
          <AppModal title={'Edit Board'} buttonLabel={'Edit Board'}>
            {Object.keys(board).length && (
              <BoardForm board={board} onUpdate={this.getBoardInfo} />
            )}
          </AppModal>
          <button className="btn btn-primary addPinButton" onClick={this.toggleChoices}>Add pin</button>
        </div>
        <h1>{board.name}</h1>
        <div className="boardpinsContainer">
          <div className="pinsContainer d-flex flex-wrap container ">
            {this.state.pins && renderPins()}
          </div>
          <div className="pinsChooser">
            {this.state.show && renderAllPins()}
          </div>
        </div>
      </div>
    );
  }
}
