"use server" // Specifies that this function runs on the server side.

import { db } from "@/lib/firebase" // Imports Firestore database instance.
import checker from "@zootools/email-spell-checker" // Imports an email spell checker utility.
import { addDoc, collection, getDocs, query, where } from "firebase/firestore" // Imports Firestore functions for querying and adding documents.

export const registerMember = async (state: any, fd: FormData) => {
  // Converts the submitted form data into a JavaScript object.
  const data = Object.fromEntries(fd) as { [k: string]: string }

  // Checks if a member with the same mobile number already exists in Firestore.
  const existing = await getDocs(
    query(
      collection(db, "members"), // References the "members" collection.
      where("mobileNumber", "==", data.mobileNumber), // Filters documents where 'mobileNumber' matches the input.
    ),
  )

  // If a member with the same mobile number exists, return the existing member's ID.
  if (existing.docs.length) return existing.docs[0].id

  // Converts the email to lowercase to ensure consistency.
  const email = data.email.toLowerCase()

  // Uses the email spell checker to correct potential mistakes in the email domain.
  const checked = checker.run({
    email,
    topLevelDomains: [...checker.POPULAR_TLDS, "edu.et"], // Includes common top-level domains plus 'edu.et'.
  })

  // Constructs the cleaned and structured member data object.
  const clean = {
    ...(data.title && { title: data.title }), // Includes the title if it exists.
    nameFirst: data.nameFirst.toLowerCase().trim(), // Converts first name to lowercase and removes extra spaces.
    nameFather: data.nameFather.toLowerCase().trim(), // Converts father's name to lowercase and trims spaces.
    nameGrandfather: data.nameGrandfather.toLowerCase().trim(), // Converts grandfather's name to lowercase and trims spaces.
    mobileNumber: data.mobileNumber, // Stores the mobile number as is.
    email: checked ? checked.full : email, // Uses the corrected email if available; otherwise, keeps the original.
    dateOfBirth: data.dateOfBirth, // Stores the date of birth.
    sex: data.sex, // Stores gender information.
    organization: data.customOrganization || data.organization, // Uses custom organization if provided; otherwise, uses the standard one.
    idType: data.idType, // Stores the type of identification document.
    idNumber: data.idNumber, // Stores the identification number.
    joined: Date.now(), // Stores the current timestamp as the join date.
  }

  // Adds the new member's data to the "members" collection in Firestore.
  const { id } = await addDoc(collection(db, "members"), clean)

  // Returns the newly created member's ID.
  return id
}
