import axios from 'axios';

const baseUrl = 'https://fir-react-pinterest.firebaseio.com';

const getBoardPins = boardId =>
  new Promise((resolve, reject) => {
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

const getAllPins = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/pins.json`)
      .then(response => {
        resolve(Object.values(response.data));
      })
      .catch(error => reject(error));
  });

const createPin = pinObj =>
  axios.post(`${baseUrl}/pins.json`, pinObj).then(response => {
    const update = { firebaseKey: response.data.name };
    axios
      .patch(`${baseUrl}/pins/${response.data.name}.json`, update)
      .catch(error => console.warn(error));
  });

const updatePin = pinObj =>
  new Promise((resolve, reject) => {
    axios
      .patch(`${baseUrl}/pins/${pinObj.firebaseKey}.json`, pinObj)
      .then(response => {
        resolve(response.data);
      });
  });

export {
  getBoardPins,
  getPin,
  getAllUserPins,
  getAllPins,
  createPin,
  updatePin
};
