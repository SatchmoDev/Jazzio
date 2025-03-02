export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"

export default function Analytics() {
  const today = new Date()

  redirect(
    "/log/" +
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate(),
  )
}
