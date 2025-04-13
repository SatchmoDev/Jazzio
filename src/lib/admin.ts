import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const app =
  getApps()[0] ||
  initializeApp({
    credential: cert({
      projectId: "jazzio",
      clientEmail: "firebase-adminsdk-fbsvc@jazzio.iam.gserviceaccount.com",
      privateKey: process.env.PRIVATE_KEY!.replaceAll("\\n", "\n"),
    }),
  })

export const auth = getAuth(app)
