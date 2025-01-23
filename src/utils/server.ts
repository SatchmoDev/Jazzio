import { auth } from "@/lib/admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const protect = async () => {
  const store = await cookies()
  const session = store.get("session")

  if (!session) {
    redirect("/signin")
  }

  auth.verifySessionCookie(session.value, true).catch(() => {
    redirect("/signin")
  })
}
