import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const boardsDiv = $('#boards');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.addClass('hide');
        logoutButton.addClass('hide');
        boardsDiv.addClass('hide');
      })
      .catch((err) => console.error('You are still logged in', err));
  });
};

export default { logoutEvent };
