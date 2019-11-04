import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      boardsDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      // nobody is logged in; we should not see boards
      boardsDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };