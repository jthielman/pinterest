import $ from 'jquery';
import pinsData from '../../helpers/data/pinsData';

import './singleBoard.scss';
import utilities from '../../helpers/utilities';

const backToBoards = (e) => {
  e.preventDefault();
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
};

const showOneBoard = (boardId) => {
  pinsData.getPins(boardId)
    .then((pins) => {
      let string = '<div class="row justify-content-between"><h1>Pins</h1>';
      string += '<button class="btn btn-success" id="all-boards">See all boards</button></div>';
      string += '<div class="row">';
      pins.forEach((pin) => {
        string += `
        <div class="card col-4">
          <img src="${pin.imgUrl}" class="card-img-top" alt="${pin.name}">
          <div class="card-body">
            <h5 class="card-title">${pin.name}</h5>
            <p class="card-text">${pin.description}</p>
          </div>
        </div>
      `;
      });
      string += '</div>';
      utilities.printToDom('single-board', string);
      $('#single-board').on('click', '#all-boards', backToBoards);
      $('#boards').addClass('hide');
      $('#single-board').removeClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { showOneBoard };
