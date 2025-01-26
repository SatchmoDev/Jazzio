import { protect } from "@/utils/server"

export default async function Admin() {
  await protect()

  return (
    <>
      <h1>Admin</h1>
    </>
  )
}
