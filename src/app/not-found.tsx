import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <h1>Not Found</h1>

      <Link href="/search" className="text-xl underline">
        Search
      </Link>
    </>
  )
}
