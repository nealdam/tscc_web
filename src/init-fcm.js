import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
    apiKey: "AIzaSyDH_z2YwgYAlEhMheZVAnZ0e9KKAHZCyX0",
  authDomain: "tscc-2020.firebaseapp.com",
  databaseURL: "https://tscc-2020.firebaseio.com",
  projectId: "tscc-2020",
  storageBucket: "tscc-2020.appspot.com",
  messagingSenderId: "1008876266372",
  appId: "1:1008876266372:web:ab7aae7788940aa2f433d1",
  measurementId: "G-6NJ914F24R"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BIWbfKURLbzSUYChe4is6Zy-XA-g8WFFFk7scRn3nwf4BFGELmye92eu_3_jVXP-5q3HuHzstCLj7BAqtxFV-R4"
);
export { messaging };