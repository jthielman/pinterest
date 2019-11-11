import axios from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/database';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebasekeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      // console.log('from getPinsByBoardId on pinsData', response.data);
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getPinById = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`)
    .then((response) => {
      console.log('from getPinById on pinsData', response.data.boardId);
      // const demPins = response.data;
      const pinBoardId = response.data.boardId;
      /* Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      }); */
      resolve(pinBoardId);
    })
    .catch((error) => reject(error));
});

const deletePin = (pinId) => {
  let BOARDID;
  getPinById(pinId)
    .then((bordId) => {
      // console.log('BOARDID?', bordId);
      BOARDID = bordId;
    })
    .catch((error) => console.error(error));
  axios.delete(`${baseUrl}/pins/${pinId}.json`);
  return BOARDID;
};

export default { getPinsByBoardId, deletePin, getPinById };
