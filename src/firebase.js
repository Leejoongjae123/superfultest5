import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/database'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAMz4-VYdJUgbj8Kb3hI4_nwcID5Cgue94",
  authDomain: "superful-ca2ba.firebaseapp.com",
  databaseURL: "https://superful-ca2ba-default-rtdb.firebaseio.com",
  projectId: "superful-ca2ba",
  storageBucket: "superful-ca2ba.appspot.com",
  messagingSenderId: "376819628708",
  appId: "1:376819628708:web:bcf4d546a8bb3a4a3b8431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService=getStorage();