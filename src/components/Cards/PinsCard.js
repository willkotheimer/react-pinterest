import React from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import DeletePinBtn from '../Forms/deletePin';

export default class PinsCard extends React.Component {
  state = {
    pin: this.props.pin
  };

  render() {
    const { pin } = this.state;
    return (
      <div className="card m-2">
        <img
          className="card-img-top"
          src={pin.imageUrl !== undefined ? pin.imageUrl : ''}
          alt="Card cap"
        />
        <div className="card-body" id={pin.fireBaseKey}>
          <h5 className="card-title">{pin.name}</h5>
          <p className="card-text">{pin.description}</p>
          <div className="create-delete-btn"></div>
          <Link className="btn btn-primary" to={`/pins/${pin.firebaseKey}`}>
            Edit Pin
          </Link>
          <AppModal title={'Delete Pin'} buttonLabel={'Delete Pin'}>
            This action is undoable. Delete?
            <DeletePinBtn pin={pin} redrawDom={this.props.redrawDom} />
          </AppModal>
        </div>
      </div>
    );
  }
}
