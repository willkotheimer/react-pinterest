import React from 'react';
import { getPin } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import PinForm from '../components/Forms/pinsForm';
import AppModal from '../components/AppModal';

export default class SinglePin extends React.Component {
  state = {
    pin: []
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const pinId = this.props.match.params.id;
    // 2. Make a call to the API that returns the pin associated with this pin and set to state.
    getPin(pinId)
      .then(resp => {
        this.setState({
          pin: resp
        });
      })
      .catch(error => console.warn(error));
  }

  getPinInfo = pinId => {
    getPin(pinId).then(response => {
      this.setState({
        pin: response
      });
    });
  };

  render() {
    const { pin } = this.state;
    const renderPins = () => <PinsCard key={pin.firebaseKey} pins={pin} />;

    // 5. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
          {Object.keys(pin).length && (
            <PinForm pin={pin} onUpdate={this.getPinInfo} />
          )}
        </AppModal>

        <h1>{pin.name}</h1>
        <PinsCard pin={pin} />
        <div className="d-flex flex-wrap container"></div>
      </div>
    );
  }
}
