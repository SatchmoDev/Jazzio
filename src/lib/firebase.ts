import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
  apiKey: "AIzaSyDz_lHqP9l6DofKtMzZ2cMKV5kPdBmT6KI",
  authDomain: "habinout.firebaseapp.com",
  projectId: "habinout",
  storageBucket: "habinout.firebasestorage.app",
  messagingSenderId: "305053736120",
  appId: "1:305053736120:web:3b8e4c40ec56becc39e84d",
})

export const db = getFirestore(app)
export const auth = getAuth(app)
