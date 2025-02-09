"use server"

import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"

export const searchMembers = async (
  state: { members: any[]; visits: any[]; fd: FormData },
  fd: FormData,
) => {
  const conditions = ["nameFather", "nameFirst", "mobileNumber"].flatMap(
    (key) => {
      const value = fd.get(key) as string

      if (value) {
        return [
          where(key, ">=", value.toLowerCase()),
          where(key, "<=", value.toLowerCase() + "\u5000"),
        ]
      } else {
        return where(key, ">=", value.toLowerCase())
      }
    },
  )

  const members = await getDocs(
    query(
      collection(db, "members"),
      orderBy("joined", "desc"),
      limit(50),
      ...conditions,
    ),
  )

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("timestamp", ">=", Date.now() - 1000 * 60 * 60 * 5),
    ),
  )

  return {
    members: members.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    visits: visits.docs.map((doc) => doc.data().member),
    fd,
  }
}
