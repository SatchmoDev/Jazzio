"use server"

import { db } from "@/lib/firebase"
import { collection, getDocs, limit, query, where } from "firebase/firestore"

export const readMembers = async (
  state: { docs: { id: string }[]; fd: FormData },
  fd: FormData,
) => {
  const { firstName, fatherName, phoneNumber } = Object.fromEntries(fd) as {
    [k: string]: string
  }

  const conditions = []

  if (firstName) {
    conditions.push(
      where("nameFirst", ">=", firstName.toLowerCase()),
      where("nameFirst", "<", firstName.toLowerCase() + "\u5000"),
    )
  } else {
    conditions.push(where("nameFirst", ">=", ""))
  }

  if (fatherName) {
    conditions.push(
      where("nameFather", ">=", fatherName.toLowerCase()),
      where("nameFather", "<", fatherName.toLowerCase() + "\u5000"),
    )
  } else {
    conditions.push(where("nameFather", ">=", ""))
  }

  if (phoneNumber) {
    conditions.push(
      where("phoneNumber", ">=", phoneNumber),
      where("phoneNumber", "<", phoneNumber + "\u5000"),
    )
  } else {
    conditions.push(where("phoneNumber", ">=", ""))
  }

  const { docs } = await getDocs(
    query(collection(db, "members"), ...conditions, limit(25)),
  )

  return { docs: docs.map((doc) => ({ id: doc.id, ...doc.data() })), fd }
}
