import React from 'react';
import { getAllUserPins } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
// import PinsForm from '../components/Forms/boardsForm';
import AppModal from '../components/AppModal';

export default class Pins extends React.Component {
  state = {
    pins: [],
    loading: true,
    currentUserId: ''
  };

  componentDidMount() {
    this.setState({
      currentUserId: getUid()
    });
    this.getBoards();
  }

  getBoards = () => {
    const UID = this.state.currentUserId;
    if (UID) {
      getAllUserPins(UID).then(response => {
        this.setState(
          {
            pins: response.data
          },
          this.setLoading
        );
      });
    }
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
      Object.values(pins).map(pin => (
        <PinsCard key={pin.firebaseKey} pin={pin} />
      ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <AppModal
              title={'Create Pin'}
              buttonLabel={'Create Pin'}
            ></AppModal>

            <h2>Here are all of your pins</h2>
            <div className="d-flex flex-wrap container">
              {pins && showPins()}
            </div>
          </>
        )}
      </>
    );
  }
}
