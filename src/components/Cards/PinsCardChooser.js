import React from 'react';
import AppModalPins from '../AppModalPins';
import PinBoardForm from '../Forms/pinBoardForm';

export default function PinsCardChooser({ board, pin, id, addPin, redrawDom }) {
  return (
    <>
      <AppModalPins title={pin.name} buttonLabel={pin.name}>
        <h1>(Add Pin?)</h1>
        <PinBoardForm pin={pin} board={board} id={id} redrawDom={redrawDom} addPin={addPin} />
      </AppModalPins>
    </>
  );
}
