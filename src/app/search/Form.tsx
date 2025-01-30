"use client"

import Pending from "@/components/Pending"
import { cap } from "@/utils/client"
import { DocumentData } from "firebase/firestore"
import Link from "next/link"
import { useActionState } from "react"
import { readMembers } from "./actions"

export default function Form() {
  const [{ members, visits, fd }, action] = useActionState(readMembers, {
    members: [],
    visits: [],
    fd: new FormData(),
  })

  return (
    <>
      <form action={action} className="flex flex-col">
        <label htmlFor="nameFirst">First Name</label>
        <input
          id="nameFirst"
          name="nameFirst"
          defaultValue={(fd.get("nameFirst") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="nameFather">Father&apos;s Name</label>
        <input
          id="nameFather"
          name="nameFather"
          defaultValue={(fd.get("nameFather") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={(fd.get("phoneNumber") || "") as string}
          className="input mb-4"
        />

        <Pending />
      </form>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((m: DocumentData) => {
          return (
            <Link
              href={"/member/" + m.id}
              className={
                "border-primary rounded border-2 p-2 " +
                (visits.some((visit) => visit.member === m.id) && "bg-blue-500")
              }
              key={m.id}
            >
              <p>
                {cap(m.nameFirst)} {cap(m.nameFather)} {cap(m.nameGrandfather)}
              </p>

              <p>Phone Number: {m.phoneNumber}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
