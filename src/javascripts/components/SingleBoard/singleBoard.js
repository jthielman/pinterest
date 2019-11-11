import $ from 'jquery';
import axios from 'axios';
import pinsData from '../../helpers/data/pinsData';

import './singleBoard.scss';
import utilities from '../../helpers/utilities';
import apiKeys from '../../helpers/apiKeys.json';

const baseUrl = apiKeys.firebasekeys.databaseURL;

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const pinIdToDelete = e.target.id.split('delete-')[1];
  axios.get(`${baseUrl}/pins/${pinIdToDelete}.json`)
    .then((response) => {
      console.log('pin', response);
    })
    .catch((error) => console.error(error));

  pinsData.deletePin(pinIdToDelete);
  // .then((boardIdOfDeletedPin) => {
  //   // eslint-disable-next-line no-use-before-define
  //   showOneBoard(boardIdOfDeletedPin);
  // })
  // .catch((err) => console.error(err));
};

const backToBoards = (e) => {
  e.preventDefault();
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
};

const showOneBoard = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      // console.log('from showOneBoard on singleBoard.js', pins);
      let string = `
        <div class="row justify-content-between">
          <h1>Pins</h1>
          <button class="btn btn-success" id="all-boards">See all boards</button>
        </div>`;
      string += '<div class="row">';
      pins.forEach((pin) => {
        string += `
        <div class="card col-4">
          <img src="${pin.imgUrl}" class="card-img-top" alt="${pin.name}">
          <div class="card-body">
            <h5 class="card-title">${pin.name}</h5>
            <p class="card-text">${pin.description}</p>
          </div>
          <div class="card-footer">
          <button class="btn btn-danger delete-pin" id="delete-${pin.id}">Delete pin</button>
          </div>
        </div>
      `;
      });
      string += '</div>';
      utilities.printToDom('single-board', string);
      $('#single-board').on('click', '.delete-pin', deletePin);
      $('#single-board').on('click', '#all-boards', backToBoards);
      $('#boards').addClass('hide');
      $('#single-board').removeClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { showOneBoard };
