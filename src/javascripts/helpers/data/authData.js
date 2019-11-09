import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import boards from '../../components/Boards/boards';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');
const homeDiv = $('#home');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      boardsDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boards.showTheBoards(user);
    } else {
      // nobody is logged in; we should not see boards
      boardsDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
