"use server"

import { db } from "@/lib/firebase"
import { collection, getDocs, limit, query, where } from "firebase/firestore"

export const readMembers = async (
  state: { members: { id: string }[]; fd: FormData },
  fd: FormData,
) => {
  const { nameFirst, nameFather, phoneNumber } = Object.fromEntries(fd) as {
    [k: string]: string
  }

  const conditions = []

  if (nameFirst) {
    conditions.push(
      where("nameFirst", ">=", nameFirst.toLowerCase()),
      where("nameFirst", "<", nameFirst.toLowerCase() + "\u5000"),
    )
  } else {
    conditions.push(where("nameFirst", ">=", ""))
  }

  if (nameFather) {
    conditions.push(
      where("nameFather", ">=", nameFather.toLowerCase()),
      where("nameFather", "<", nameFather.toLowerCase() + "\u5000"),
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

  const members = await getDocs(
    query(collection(db, "members"), ...conditions, limit(100)),
  )

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("timestamp", ">=", Date.now() - 1000 * 60 * 60 * 5),
    ),
  )

  return {
    members: members.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    visits: visits.docs.map((doc) => ({ ...doc.data() })),
    fd,
  }
}
