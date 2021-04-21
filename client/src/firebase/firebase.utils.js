import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDwDgPhdpZXC70m8TlJZ-wsYQtcV4Rav14",
    authDomain: "crowndb-9c6bd.firebaseapp.com",
    projectId: "crowndb-9c6bd",
    storageBucket: "crowndb-9c6bd.appspot.com",
    messagingSenderId: "102186394176",
    appId: "1:102186394176:web:6a947e00351509f92435a5",
    measurementId: "G-X53BKJR4GH"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log(error);
        }
    }
    return userRef;
};

export const addColletionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(objectsToAdd);

    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const converCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            routeNme: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth=> {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;