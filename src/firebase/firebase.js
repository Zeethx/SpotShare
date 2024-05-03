import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import conf from "../conf/conf";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: conf.fbApiKey,
    authDomain: conf.fbAuthDomain,
    projectId: conf.fbProjectId,
    storageBucket: conf.fbStorageBucket,
    messagingSenderId: conf.fbMessagingSenderId,
    appId: conf.fbAppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};