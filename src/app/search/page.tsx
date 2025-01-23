import { capitalize } from "@/utils/client"
import { protect } from "@/utils/server"

export default async function Search() {
  await protect()

  return (
    <>
      <h1>Search</h1>
      <p>{capitalize("test capitalize")}</p>
    </>
  )
}
