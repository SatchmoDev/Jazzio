"use client"

import Pending from "@/components/Pending"
import { auth } from "@/lib/firebase"
import { cap } from "@/utils"
import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { readMembers } from "./actions"

export default function Search() {
  const [user, setUser] = useState(false)
  const [state, action] = useActionState(readMembers, {
    docs: [],
    fd: new FormData(),
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(true) : redirect("/")
    })
  }, [])

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Search</h1>

      {user && (
        <>
          <form action={action} className="flex flex-col">
            <label htmlFor="first">First Name</label>
            <input
              id="first"
              name="first"
              placeholder="First Name"
              defaultValue={(state.fd.get("first") || "") as string}
              className="input mb-2"
            />

            <label htmlFor="last">Last Name</label>
            <input
              id="last"
              name="last"
              placeholder="Last Name"
              defaultValue={(state.fd.get("last") || "") as string}
              className="input mb-2"
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone Number"
              defaultValue={(state.fd.get("phone") || "") as string}
              className="input mb-2"
            />

            <label htmlFor="type">ID Type</label>
            <select
              id="type"
              name="type"
              defaultValue={(state.fd.get("type") || "") as string}
              className="input mb-2 h-[42px]"
            >
              <option></option>
              <option value="kebele">Kebele</option>
              <option value="passport">Passport</option>
              <option value="license">License</option>
            </select>

            <label htmlFor="number">ID Number</label>
            <input
              id="number"
              name="number"
              placeholder="ID Number"
              defaultValue={(state.fd.get("number") || "") as string}
              className="input mb-4"
            />

            <Pending />
          </form>

          <div className="mt-4 flex flex-col gap-4">
            {state.docs.map((doc: any) => {
              return (
                <Link
                  href={"/member/" + doc.id}
                  className="grid grid-cols-3 rounded-md border border-primary p-2"
                  key={doc.phone}
                >
                  <p>
                    {cap(doc.first)} {cap(doc.last)}
                  </p>

                  <p>Phone: {doc.phone}</p>

                  <p>
                    {cap(doc.type)} {doc.number}
                  </p>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
