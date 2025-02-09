"use client"

import Pending from "@/components/Pending"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { createCookie } from "./actions"

export default function SignIn() {
  const [error, setError] = useState("")

  return (
    <>
      <h1>Sign In</h1>

      <form
        action={async (fd) => {
          await signInWithEmailAndPassword(
            auth,
            "guard@jazzio.land",
            fd.get("password") as string,
          )
            .then(async ({ user }) => createCookie(await user.getIdToken()))
            .catch(() => setError("Invalid password"))
        }}
        className="flex flex-col"
      >
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          required
          type="password"
          className="input mb-2"
        />

        {error && <p className="mb-2 text-center text-red-500">{error}</p>}
        <Pending />
      </form>
    </>
  )
}
