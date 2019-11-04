import firebase from 'firebase';

import auth from './components/Auth/auth';
import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebasekeys);
  authData.checkLoginStatus();
  auth.loginButton();
};

init();
