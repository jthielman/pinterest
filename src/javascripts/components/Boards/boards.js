import $ from 'jquery';

import boardsData from '../../helpers/data/boardsData';
import singleBoard from '../SingleBoard/singleBoard';

import './boards.scss';
import utilities from '../../helpers/utilities';

const addBoardClickEvent = (e) => {
  e.preventDefault();
  singleBoard.showOneBoard(e.target.id);
};

const showTheBoards = (user) => {
  boardsData.getBoards(user.uid)
    .then((bords) => {
      let domString = '<h1>Boards</h1>';
      domString += '<div class="row">';
      bords.forEach((bord) => {
        domString += `
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${bord.name}</h5>
              <p class="card-text">${bord.description}</p>
              <a href="#" class="btn btn-primary show-board" id="${bord.id}">Show Board</a>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('body').on('click', '.show-board', addBoardClickEvent);
    })
    .catch((error) => console.error(error));
};

export default { showTheBoards };
