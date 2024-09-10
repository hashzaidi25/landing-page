import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrqcUHe_nMch2fOel3clET7-TjR5BXCDc",
  authDomain: "otp-verification-b75dd.firebaseapp.com",
  projectId: "otp-verification-b75dd",
  storageBucket: "otp-verification-b75dd.appspot.com",
  messagingSenderId: "460914113385",
  appId: "1:460914113385:web:5ca7f3b00895b8eb6c1bf8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };