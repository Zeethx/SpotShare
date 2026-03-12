import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updatePassword,
    sendPasswordResetEmail,
    signOut,
    sendEmailVerification
} 
from "firebase/auth";


export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch(signUpError) {
        // if signuperror is email-already-in-use, return the error code
        return signUpError.code;
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
}

export const googleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential;
    } catch (error) {
        throw error;
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
}

export const userUpdatePassword = async (password) => {
    try {
        await updatePassword(auth.currentUser, password);
    } catch (error) {
        throw error;
    }
}

export const sendEmailVerificationToUser = async (user) => {
    try {
        await sendEmailVerification(user);
        return ("Email verification sent");
    } catch (error) {
      throw new Error('Email verification failed.');
    }
  };
  