// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2CehbDJx7goQzXefaZ92nuB9xLhv9H6I",
  authDomain: "simple-project-tailwind.firebaseapp.com",
  projectId: "simple-project-tailwind",
  storageBucket: "simple-project-tailwind.appspot.com",
  messagingSenderId: "495590474273",
  appId: "1:495590474273:web:015136e8938e2935ba9960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;