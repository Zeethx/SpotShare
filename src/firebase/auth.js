// write the firebase authentication code here
import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updatePassword,
    sendPasswordResetEmail,
    signOut, 
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
        return ("Signin failed:", error);
    }
}

export const googleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential;
    } catch (error) {
        return ("Google Signin failed:", error);
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
        return ("Signout successful");
    } catch (error) {
        return ("Signout failed:", error);
    }
}

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return ("Password reset email sent");
    } catch (error) {
        return ("Password reset failed:", error);
    }
}

export const userUpdatePassword = async (password) => {
    try {
        await updatePassword(auth.currentUser, password);
        return ("Password updated");
    } catch (error) {
        return ("Password update failed:", error);
    }
}

