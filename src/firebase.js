// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_TmrPNkYANkqbtKCmhm6sguUBcd-We8U",
  authDomain: "spotshare-c26b4.firebaseapp.com",
  projectId: "spotshare-c26b4",
  storageBucket: "spotshare-c26b4.appspot.com",
  messagingSenderId: "1019862944954",
  appId: "1:1019862944954:web:243ba62dd0636492228683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};