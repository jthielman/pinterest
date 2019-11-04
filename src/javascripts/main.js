import firebase from 'firebase';

import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import boards from './components/Boards/boards';
import myNavbar from './components/MyNavbar/myNavbar';

import apiKeys from './helpers/apiKeys';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebasekeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  boards.showTheBoards();
};

init();
