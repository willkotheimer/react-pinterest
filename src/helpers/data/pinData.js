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

const PinBoardsAll = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/pins-board.json`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });

const deleteBoardPin = firebaseKey =>
  axios.delete(`${baseUrl}/pins-board/${firebaseKey}.json`);

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
        if (response.data) {
          resolve(Object.values(response.data));
        }
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

const deletePin = firebaseKey =>
  axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const AddPinToBoard = (pinBoardObj) => {
  axios.post(`${baseUrl}/pins-board.json`, pinBoardObj);
  // .catch(error => console.warn(error));
  // .then(response => {
  // const update = { firebaseKey: response.data.name };
  // axios
  //   .patch(`${baseUrl}/pins-board/${response.data.name}.json`, update)
  //   .catch(error => console.warn(error));
};


export {
  getBoardPins,
  getPin,
  getAllUserPins,
  getAllPins,
  createPin,
  updatePin,
  deletePin,
  PinBoardsAll,
  deleteBoardPin,
  AddPinToBoard
};
