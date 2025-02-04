import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR646RRMYTQMUKe9tArtWMyqoa0nSquPw",
  authDomain: "erpsystem-90a66.firebaseapp.com",
  projectId: "erpsystem-90a66",
  storageBucket: "erpsystem-90a66.appspot.com",
  messagingSenderId: "954314907926",
  appId: "1:954314907926:web:2ee433a111d96af01b7037"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);