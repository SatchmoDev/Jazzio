import { protect } from "@/utils/server"
import Form from "./Form"

export default async function Search() {
  await protect()

  return (
    <>
      <h1>Search</h1>
      <Form />
    </>
  )
}
