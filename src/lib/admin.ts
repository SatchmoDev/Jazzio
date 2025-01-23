import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const apps = getApps()

const app = apps.length
  ? apps[0]
  : initializeApp({
      credential: cert({
        projectId: "habinout",
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
      }),
    })

export const auth = getAuth(app)
