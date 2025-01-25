import { protect } from "@/utils/server"
import { Metadata } from "next"
import Form from "./Form"

export const metadata: Metadata = { title: "Search" }

export default async function Search() {
  await protect()

  return (
    <>
      <h1>Search</h1>
      <Form />
    </>
  )
}
