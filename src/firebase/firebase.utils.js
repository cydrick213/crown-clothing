import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAAqcURVbu3vhAnUW5HrHZLS0Rkjl4q1Og",
    authDomain: "crown-db-72d67.firebaseapp.com",
    databaseURL: "https://crown-db-72d67.firebaseio.com",
    projectId: "crown-db-72d67",
    storageBucket: "crown-db-72d67.appspot.com",
    messagingSenderId: "147708096561",
    appId: "1:147708096561:web:8bd40cab04512ff693e510",
    measurementId: "G-ZWZ3Y3Q9HW"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.id}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch (e) {
            console.log('error creating user', e.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
