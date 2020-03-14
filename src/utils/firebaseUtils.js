import firebase from 'firebase';

export const firebaseAuth = (username, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
}