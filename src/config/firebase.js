// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDs-OnbDiq0cfWmyRJxD00YIMJhp5UZJ2Q",
    authDomain: "test-project-987b3.firebaseapp.com",
    projectId: "test-project-987b3",
    storageBucket: "test-project-987b3.appspot.com",
    messagingSenderId: "462801686155",
    appId: "1:462801686155:web:f867a50f85dd3610574e8e",
    measurementId: "G-RZBGBTB3S7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage =getStorage(app)
export { db,auth,storage };
