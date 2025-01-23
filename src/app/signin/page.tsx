"use client"

import Pending from "@/components/Pending"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { createCookie } from "./actions"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <h1>SignIn</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await signInWithEmailAndPassword(auth, email, password).then(
            async ({ user }) => createCookie(await user.getIdToken()),
          )
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <Pending />
      </form>
    </>
  )
}
