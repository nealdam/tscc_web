import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8sbs3FnsB7KzTjrrNNIhKOcJZDId5vOc",
    authDomain: "tscc-sp20.firebaseapp.com",
    databaseURL: "https://tscc-sp20.firebaseio.com",
    projectId: "tscc-sp20",
    storageBucket: "tscc-sp20.appspot.com",
    messagingSenderId: "395815500688",
    appId: "1:395815500688:web:3c1f37ac394a088a2f9115",
    measurementId: "G-D0KS15LPDF"
};

// const webPushCertificate = "BMCO65zRJqjd3XjjTUEwvF9iICnaVwgYcAm2DnpndYxypaPTOofUKEEy7lkzjS1_2czZf23dBl-3N_IzT9cGBmU";

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);
// const message = initializedFirebaseApp.messaging();
// message.usePublicVapidKey(webPushCertificate);

// message.onMessage(payload => {
//     console.log('Message received. ', payload);
// });

export const auth = initializedFirebaseApp.auth();
// export { message };




