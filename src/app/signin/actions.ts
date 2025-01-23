"use server"

import { auth } from "@/lib/admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const createCookie = async (token: string) => {
  const store = await cookies()
  const age = 60 * 60 * 24 * 5

  const cookie = await auth.createSessionCookie(token, {
    expiresIn: age * 1000,
  })

  store.set("session", cookie, {
    httpOnly: true,
    secure: true,
    maxAge: age,
    sameSite: "strict",
  })

  redirect("/search")
}
