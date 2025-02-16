"use server"

import { db } from "@/lib/firebase"
import checker from "@zootools/email-spell-checker"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"

export const registerMember = async (state: any, fd: FormData) => {
  const data = Object.fromEntries(fd) as { [k: string]: string }

  const existing = await getDocs(
    query(
      collection(db, "members"),
      where("mobileNumber", "==", data.mobileNumber),
    ),
  )

  if (existing.docs.length) return existing.docs[0].id

  const email = data.email.toLowerCase()
  const checked = checker.run({ email })

  const clean = {
    ...(data.title && { title: data.title }),
    nameFirst: data.nameFirst.toLowerCase().trim(),
    nameFather: data.nameFather.toLowerCase().trim(),
    nameGrandfather: data.nameGrandfather.toLowerCase().trim(),
    mobileNumber: data.mobileNumber,
    email: checked ? checked.full : email,
    dateOfBirth: data.dateOfBirth,
    sex: data.sex,
    organization: data.customOrganization || data.organization,
    idType: data.idType,
    idNumber: data.idNumber,
    joined: Date.now(),
  }

  const { id } = await addDoc(collection(db, "members"), clean)
  return id
}
