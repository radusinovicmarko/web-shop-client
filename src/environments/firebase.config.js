// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCtPK_DAUX5-B9Bam-C9bzrPjidKucGq4",
  authDomain: "ip-webshop.firebaseapp.com",
  projectId: "ip-webshop",
  storageBucket: "ip-webshop.appspot.com",
  messagingSenderId: "257844627011",
  appId: "1:257844627011:web:8f321c4d0bdf832f75f6f6",
  measurementId: "G-77NDTTQ674"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
