import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const apps = getApps()

const app =
  apps[0] ||
  initializeApp({
    credential: cert({
      projectId: "jazzio",
      clientEmail: "firebase-adminsdk-fbsvc@jazzio.iam.gserviceaccount.com",
      privateKey: process.env.PRIVATE_KEY!.replace(/\\n/gm, "\n"),
    }),
  })

export const db = getFirestore(app)
export const auth = getAuth(app)
