"use server"

import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createMember = async (state: string, fd: FormData) => {
  const data = Object.fromEntries(
    fd
      .entries()
      .filter(([key]) => !key.startsWith("$"))
      .map(([key, value]) => [key, (value as string).toLowerCase()]),
  )

  const ref = await addDoc(collection(db, "members"), data)

  return ref.id
}
