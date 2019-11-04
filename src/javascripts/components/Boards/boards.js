import boardsData from '../../helpers/data/boardsData';

import './boards.scss';
import utilities from '../../helpers/utilities';

const showTheBoards = () => {
  boardsData.getBoards()
    .then((bords) => {
      let domString = '';
      bords.forEach((bord) => {
        domString += `${bord.name}`;
      });
      utilities.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { showTheBoards };
