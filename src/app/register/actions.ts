"use server"

import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createMember = async (state: string, fd: FormData) => {
  const { first, last, phone, type, number } = Object.fromEntries(fd) as {
    [k: string]: string
  }

  const ref = await addDoc(collection(db, "members"), {
    first: first.toLowerCase(),
    last: last.toLowerCase(),
    phone,
    type,
    number,
  })

  return ref.id
}
