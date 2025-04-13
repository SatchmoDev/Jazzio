import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
  apiKey: "AIzaSyCX8OuJgK0ZhOage5ZNDU25ZtybL0mEaS0",
  authDomain: "jazzio.firebaseapp.com",
  projectId: "jazzio",
  storageBucket: "jazzio.firebasestorage.app",
  messagingSenderId: "848393366219",
  appId: "1:848393366219:web:93b33d33697ba29742094e",
  measurementId: "G-LFK6M1B5M6",
})

export const db = getFirestore(app)
export const auth = getAuth(app)
