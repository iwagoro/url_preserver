import { signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,provider} from '@/lib/FireBase'

const googleLogin = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            console.log(user.email, user.photoURL)
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential)
        });
}

const emailLogin = (email:string,password:string) => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
    });
}

const registerEmail = (email:string,password:string) => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
    });
}

const signOut = () => {
    auth.signOut().then(() => {
        console.log('sign out')
    }).catch((error) => {
        console.log(error)
    });
}

export {googleLogin,emailLogin,registerEmail,signOut}