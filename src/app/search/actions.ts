"use server"

import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export const readMembers = async (state: any, fd: FormData) => {
  const { first, last, phone, type, number } = Object.fromEntries(fd) as {
    [k: string]: string
  }

  const conditions = []

  if (first) {
    conditions.push(
      where("first", ">=", first.toLowerCase()),
      where("first", "<", first.toLowerCase() + "\u5000"),
    )
  }

  if (last) {
    conditions.push(
      where("last", ">=", last.toLowerCase()),
      where("last", "<", last.toLowerCase() + "\u5000"),
    )
  }

  if (type) {
    conditions.push(where("type", "==", type))
  }

  const { docs } = await getDocs(
    query(collection(db, "members"), ...conditions),
  )

  return { docs: docs.map((doc) => ({ id: doc.id, ...doc.data() })), fd }
}
