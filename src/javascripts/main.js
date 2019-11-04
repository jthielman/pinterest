import firebase from 'firebase';

import auth from './components/Auth/auth';

import apiKeys from './helpers/apiKeys';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebasekeys);
  auth.loginButton();
};

init();
