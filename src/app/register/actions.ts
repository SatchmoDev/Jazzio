"use server"

import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createMember = async (state: string, fd: FormData) => {
  const data = Object.fromEntries(fd) as { [k: string]: string }

  const clean = {
    nameFirst: data.nameFirst.toLowerCase().trim(),
    nameFather: data.nameFather.toLowerCase().trim(),
    nameGrandfather: data.nameGrandfather.toLowerCase().trim(),
    phoneNumber: data.phoneNumber,
    idType: data.idType,
    idNumber: data.idNumber.toUpperCase().trim(),
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    email: fixEmail(data.email.toLowerCase().trim()),
    organization:
      data.organization === "Other"
        ? data.organizationCustom
        : data.organization,
    joined: Date.now(),
  }

  const ref = await addDoc(collection(db, "members"), clean)
  return ref.id
}

const fixEmail = (email: string) => {
  email = email.replace(/\.con$/, ".com")

  const domains = [[["gmale.com", "gmial.com", "mail.com"], "gmail.com"]]

  const parts = email.split("@")
  const domain = parts[1]

  for (const [typos, correct] of domains) {
    if (typos.includes(domain)) {
      return parts[0] + "@" + correct
    }
  }

  return email
}
