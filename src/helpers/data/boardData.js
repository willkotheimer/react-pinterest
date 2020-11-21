import axios from 'axios';

const baseUrl = 'https://fir-react-pinterest.firebaseio.com/';

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
    axios
      .patch(`${baseUrl}/${boardObj.firebaseKey}.json`, boardObj)
      .then(response => {
        resolve(response.data);
      });
  });
export {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  getAllBoards
};
