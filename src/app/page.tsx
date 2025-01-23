import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>Habinout</h1>

      <div className="flex flex-col">
        <Link href="/register" className="w-min">
          Register
        </Link>

        <Link href="/search" className="w-min">
          Search
        </Link>
      </div>
    </>
  )
}
