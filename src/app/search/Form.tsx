"use client"

import Pending from "@/components/Pending"
import { cap } from "@/utils/client"
import { DocumentData } from "firebase/firestore"
import Link from "next/link"
import { useActionState } from "react"
import { readMembers } from "./actions"

export default function Form() {
  const [state, action] = useActionState(readMembers, {
    docs: [],
    fd: new FormData(),
  })

  return (
    <>
      <form action={action} className="flex flex-col">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          defaultValue={(state.fd.get("firstName") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="fatherName">Father&apos;s Name</label>
        <input
          id="fatherName"
          name="fatherName"
          defaultValue={(state.fd.get("fatherName") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={(state.fd.get("phoneNumber") || "") as string}
          className="input mb-4"
        />

        <Pending />
      </form>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {state.docs.map((doc: DocumentData) => {
          return (
            <Link
              href={"/member/" + doc.id}
              className="border-primary rounded border-2 p-2"
              key={doc.id}
            >
              <p>
                {cap(doc.nameFirst)} {cap(doc.nameFather)}{" "}
                {cap(doc.nameGrandfather)}
              </p>

              <p>Phone Number: {doc.phoneNumber}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
