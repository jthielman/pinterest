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

const makeBoard = (e) => {
  e.stopImmediatePropagation();
  const user = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    uid: user.uid,
    description: $('#board-description').val(),
  };
  boardsData.createBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      showTheBoards(user);
    })
    .catch((error) => console.error(error));
};

const boardModalEvent = (e) => {
  e.preventDefault();
  const domString = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Board</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="board-name">Name</label>
              <input type="text" class="form-control" id="board-name" placeholder="Enter Name">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="board-description" placeholder="Tell us about this board">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="add-new-board">Save</button>
        </div>
      </div>
    </div>
  `;
  utilities.printToDom('exampleModal', domString);
  $('body').on('click', '#add-new-board', makeBoard);
};

const showTheBoards = (user) => {
  boardsData.getBoards(user.uid)
    .then((bords) => {
      let domString = '<div class="row justify-content-between">';
      domString += '<h1>Boards</h1>';
      domString += '<button class="btn btn-success" id="new-board" data-toggle="modal" data-target="#exampleModal">Add board</button>';
      domString += '</div>';
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
      $('body').on('click', '#new-board', boardModalEvent);
    })
    .catch((error) => console.error(error));
};

export default { showTheBoards };
