import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import singleBoard from '../SingleBoard/singleBoard';

import './boards.scss';
import utilities from '../../helpers/utilities';

const showSingleBoardClickEvent = (e) => {
  e.preventDefault();
  singleBoard.showOneBoard(e.target.id);
};

const deleteSingleBoardClickEvent = (e) => {
  e.preventDefault();
  const boardIdToDelete = e.target.id.split('delete-')[1];
  console.log(boardIdToDelete);
  boardsData.deleteBoard(boardIdToDelete)
    .then(() => {
      const user = firebase.auth().currentUser;
      // eslint-disable-next-line no-use-before-define
      showTheBoards(user);
      pinsData.getPinsByBoardId(boardIdToDelete)
        .then((pins) => {
          pins.forEach((pinn) => pinsData.deletePin(pinn.id));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
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
              <form class="form-inline justify-content-between">
                <a href="#" class="btn btn-primary show-board" id="${bord.id}">Show Board</a>
                <a href="#" class="btn btn-danger delete-board" id="delete-${bord.id}">Delete Board</a>
              </form>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('body').on('click', '.show-board', showSingleBoardClickEvent);
      $('body').on('click', '.delete-board', deleteSingleBoardClickEvent);
    })
    .catch((error) => console.error(error));
};

export default { showTheBoards };
