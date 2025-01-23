"use server"

import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

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
      where("firstName", ">=", firstName.toLowerCase()),
      where("firstName", "<", firstName.toLowerCase() + "\u5000"),
    )
  } else {
    conditions.push(where("firstName", ">=", ""))
  }

  if (fatherName) {
    conditions.push(
      where("fatherName", ">=", fatherName.toLowerCase()),
      where("fatherName", "<", fatherName.toLowerCase() + "\u5000"),
    )
  } else {
    conditions.push(where("fatherName", ">=", ""))
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
    query(collection(db, "members"), ...conditions),
  )

  return { docs: docs.map((doc) => ({ id: doc.id, ...doc.data() })), fd }
}
