import React, { Component } from 'react';
import { getAllPins } from '../../helpers/data/pinData';
import PinsCard from '../Cards/PinsCard';
import Loader from '../Loader';

export default class PinsHome extends Component {
  state = {
    pins: [],
    loading: true
  };

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    getAllPins().then(response => {
      const allPins = Object.values(response).filter(x => x.private === false);
      this.setState(
        {
          pins: allPins
        },
        this.setLoading
      );
    });
  };

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, loading } = this.state;
    const showPins = () =>
      pins.map(pin => <PinsCard key={pin.firebaseKey} pin={pin} />);
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>Here are all of your pins</h2>
            <div className="d-flex flex-wrap container">{showPins()}</div>
          </>
        )}
      </>
    );
  }
}
