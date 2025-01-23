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
      <h1>Sign In</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await signInWithEmailAndPassword(auth, email, password).then(
            async ({ user }) => createCookie(await user.getIdToken()),
          )
        }}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          required
          placeholder="Email"
          className="input mb-2"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          required
          placeholder="Password"
          className="input mb-4"
        />

        <Pending />
      </form>
    </>
  )
}
