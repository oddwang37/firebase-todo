// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBkznL7104UbDkgZWHB30Mk9-nzmj2yiIQ',

  authDomain: 'todo-24aa6.firebaseapp.com',

  projectId: 'todo-24aa6',

  storageBucket: 'todo-24aa6.appspot.com',

  messagingSenderId: '86068723956',

  appId: '1:86068723956:web:9d99fe4fe57ab90d081ea1',

  databaseURL: 'https://todo-24aa6-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
