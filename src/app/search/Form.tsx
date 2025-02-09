"use client"

import Pending from "@/components/Pending"
import { useActionState } from "react"
import { searchMembers } from "./actions"
import { cap } from "@/utils/client"
import Link from "next/link"

export default function Form() {
  const [{ members, visits, fd }, action] = useActionState(searchMembers, {
    members: [],
    visits: [],
    fd: new FormData(),
  })

  console.log(members)

  return (
    <>
      <form action={action} className="flex flex-col">
        <label htmlFor="nameFirst">First Name</label>
        <input
          name="nameFirst"
          id="nameFirst"
          defaultValue={(fd.get("nameFirst") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="nameFather">Father Name</label>
        <input
          name="nameFather"
          id="nameFather"
          defaultValue={(fd.get("nameFather") || "") as string}
          className="input mb-2"
        />

        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          name="mobileNumber"
          id="mobileNumber"
          defaultValue={(fd.get("mobileNumber") || "") as string}
          className="input mb-4"
        />

        <Pending />
      </form>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {members.map((member: any) => {
          return (
            <Link
              href={"/member/" + member.id}
              className={
                "input flex justify-between " +
                (visits.includes(member.id) && "bg-primary/30")
              }
              key={member.id}
            >
              <p>
                {cap(member.nameFirst)} {cap(member.nameFather)}
              </p>

              <p>{member.mobileNumber}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
