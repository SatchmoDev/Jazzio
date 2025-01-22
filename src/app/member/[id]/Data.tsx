"use client"

import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { DocumentData } from "firebase/firestore"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  data: DocumentData
}

export default function Data({ data }: Props) {
  const [user, setUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(true) : redirect("/")
    })
  }, [])

  const { first, last } = data

  return (
    <>
      {user && (
        <p>
          {first} {last}
        </p>
      )}
    </>
  )
}
