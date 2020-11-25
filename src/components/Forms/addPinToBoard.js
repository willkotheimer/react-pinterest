import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { addPinToBoard } from '../../helpers/data/boardData';

export default class AddPinBoard extends Component {
  state = {
    allPins: this.props.AllPins,
    board: this.props.board,
    firebaseKey: this.props.board.firebaseKey,
    pinId: '',
    userId: ''
  };

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    addPinToBoard(this.state).then(() => {
      // rerender / update state in the pins component
      this.props.onUpdate(this.props.pin.firebaseKey);
      this.setState({ isModalOpen: false });
    });
    this.props.onUpdate(this.props.board.firebaseKey);
  };

  render() {
    const { board } = this.state.board;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Pin to: {console.warn(board)}</h1>

        <select>
          <option>1</option>
          <option>2</option>
        </select>
        <button>Submit</button>
      </form>
    );
  }
}
