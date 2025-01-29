"use server"

import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createMember = async (state: string, fd: FormData) => {
  const data = Object.fromEntries(fd) as { [k: string]: string }

  const clean = {
    nameFirst: data.nameFirst.toLowerCase(),
    nameFather: data.nameFather.toLowerCase(),
    nameGrandfather: data.nameGrandfather.toLowerCase(),
    phoneNumber: data.phoneNumber,
    idType: data.idType,
    idNumber: data.idNumber,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    email: data.email ? data.email + "@" + data.domain : data.fullEmail,
    organization:
      data.organization === "Other"
        ? data.organizationCustom
        : data.organization,
    joined: Date.now(),
  }

  const ref = await addDoc(collection(db, "members"), clean)
  return ref.id
}
