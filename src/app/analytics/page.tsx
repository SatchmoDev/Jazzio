import { redirect } from "next/navigation"

export default function Analytics() {
  const today = new Date()
  const format = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`

  redirect("/analytics/" + format)
}
