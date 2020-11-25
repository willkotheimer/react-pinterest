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

const getAllUserBoards = uid =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`)
      .then(response => {
        resolve(Object.values(response.data));
      })
      .catch(error => reject(error));
  });

const getAllBoards = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/boards.json`)
      .then(response => {
        resolve(Object.values(response.data));
      })
      .catch(error => reject(error));
  });

const getSingleBoard = boardId =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/boards/${boardId}.json`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });

const createBoard = boardObj =>
  axios.post(`${baseUrl}/boards.json`, boardObj).then(response => {
    const update = { firebaseKey: response.data.name };
    axios
      .patch(`${baseUrl}/boards/${response.data.name}.json`, update)
      .catch(error => console.warn(error));
  });

const updateBoard = boardObj =>
  new Promise((resolve, reject) => {
    console.warn(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj);
    axios
      .patch(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj)
      .then(response => {
        resolve(response.data);
      });
  });

const deleteBoard = firebaseKey =>
  axios.delete(`${baseUrl}/boards/${firebaseKey}.json`);

const addPinToBoard = (bid, pid, uid) => {
  const boardObj = {
    boardId: bid,
    pinId: pid,
    userId: uid
  };
  axios.post(`${baseUrl}/boards.json`, boardObj);
};

export {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  getAllBoards,
  deleteBoard,
  PinBoardsAll,
  deleteBoardPin,
  getBoardPins,
  addPinToBoard
};
