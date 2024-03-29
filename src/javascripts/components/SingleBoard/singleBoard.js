import $ from 'jquery';
import pinsData from '../../helpers/data/pinsData';

import './singleBoard.scss';
import utilities from '../../helpers/utilities';

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const pinIdToDelete = e.target.id.split('delete-')[1];

  pinsData.deletePin(pinIdToDelete)
    .then(() => {
      const boardIdOfDeletedPin = $(e.target).attr('boardInfo');
      // eslint-disable-next-line no-use-before-define
      showOneBoard(boardIdOfDeletedPin);
    })
    .catch((err) => console.error(err));
};

const makePin = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('add-new-pin-')[1];
  const newPin = {
    name: $('#pin-name').val(),
    siteUrl: $('#link').val(),
    imgUrl: $('#pin-image-url').val(),
    description: $('#description').val(),
    boardId,
  };
  pinsData.createPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      showOneBoard(boardId);
    })
    .catch((error) => console.error(error));
  return newPin;
};

const pinModalEvent = (e) => {
  e.preventDefault();
  const boardId = e.target.id.split('new-pin-')[1];
  const string = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Pin</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="pin-name">Name</label>
              <input type="text" class="form-control" id="pin-name" placeholder="Enter Name">
            </div>
            <div class="form-group">
              <label for="link">Link</label>
              <input type="text" class="form-control" id="link" placeholder="Enter link">
            </div>
            <div class="form-group">
              <label for="pin-image-url">Image Url</label>
              <input type="text" class="form-control" id="pin-image-url" placeholder="Enter image Url">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="description" placeholder="Tell us about this pin">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="add-new-pin-${boardId}">Save</button>
        </div>
      </div>
    </div>
  `;
  utilities.printToDom('exampleModal', string);
  $('body').on('click', `#add-new-pin-${boardId}`, makePin);
};

const backToBoards = (e) => {
  e.preventDefault();
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
};

const showOneBoard = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let string = `
        <div class="row justify-content-between">
          <h1 class="col-9">Pins</h1>
          <button class="btn btn-success" id="new-pin-${boardId}" data-toggle="modal" data-target="#exampleModal">Add pin</button>
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
          <button class="btn btn-danger delete-pin" id="delete-${pin.id}" boardInfo="${pin.boardId}">Delete pin</button>
          </div>
        </div>
      `;
      });
      string += '</div>';
      utilities.printToDom('single-board', string);
      $('#single-board').on('click', '.delete-pin', deletePin);
      $('#single-board').on('click', `#new-pin-${boardId}`, pinModalEvent);
      $('#single-board').on('click', '#all-boards', backToBoards);
      $('#boards').addClass('hide');
      $('#single-board').removeClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { showOneBoard };
