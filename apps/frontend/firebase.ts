// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9FgYiTM46sxrSdm-mvxCeq3MiyNY1cqo',
  authDomain: 'film-ce235.firebaseapp.com',
  projectId: 'film-ce235',
  storageBucket: 'film-ce235.appspot.com',
  messagingSenderId: '802718280596',
  appId: '1:802718280596:web:5086ecfa7f8bc2faedbd81',
  measurementId: 'G-6K245G9XBY',
};

const app = getApps.length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
