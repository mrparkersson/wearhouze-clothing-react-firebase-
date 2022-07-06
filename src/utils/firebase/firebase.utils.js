import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6EGQyHE_GRmIb-052HTyKI-QHBSC2gx0',
  authDomain: 'wearhouze-clothing-db.firebaseapp.com',
  projectId: 'wearhouze-clothing-db',
  storageBucket: 'wearhouze-clothing-db.appspot.com',
  messagingSenderId: '217874336597',
  appId: '1:217874336597:web:3c8f1b6942f9f378c87ddc',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//create Auth
export const auth = getAuth();

//signinWithPopup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//signinWithRedirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//create database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //check if there is an existing user
  const userDocRef = doc(db, 'users', userAuth.uid);

  //capture snapshot of user
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error occured creating the user', error.message);
    }
  }

  return userDocRef;
};
