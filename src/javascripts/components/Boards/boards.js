// import firebase from 'firebase/app';
// import 'firebase/auth';

import boardsData from '../../helpers/data/boardsData';

import './boards.scss';
import utilities from '../../helpers/utilities';

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
              <a href="#" class="btn btn-primary">Show Board</a>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { showTheBoards };
