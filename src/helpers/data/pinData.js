import axios from 'axios';

const baseUrl = 'https://fir-react-pinterest.firebaseio.com/';

const getBoardPins = boardId =>
  new Promise((resolve, reject) => {
    console.warn('in get boardpins');
    console.warn(
      `${baseUrl}/pins-board.json?orderBy="boardId"&equalTo="${boardId}"`
    );
    axios
      .get(`${baseUrl}/pins-board.json?orderBy="boardId"&equalTo="${boardId}"`)
      .then(response => {
        resolve(Object.values(response.data));
      })
      .catch(error => reject(error));
  });

const getPin = pinId =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/pins/${pinId}.json`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });

const getAllUserPins = userId =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });

export { getBoardPins, getPin, getAllUserPins };
