"use server"

import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createMember = async (state: string, fd: FormData) => {
  const data = Object.fromEntries(
    fd.entries().filter(([key]) => !key.startsWith("$")),
  ) as { [k: string]: string }

  const ref = await addDoc(collection(db, "members"), {
    ...data,
    firstName: data.firstName.toLowerCase(),
    fatherName: data.fatherName.toLowerCase(),
    grandfatherName: data.grandfatherName.toLowerCase(),
  })

  return ref.id
}
