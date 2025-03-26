import { db } from "@/lib/firebase"
import { cap } from "@/utils/client"
import { protect } from "@/utils/server"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Member({ params }: Props) {
  const { id } = await params
  await protect()

  const member = await getDoc(doc(db, "members", id))
  if (!member.exists()) notFound()

  const {
    idType,
    idNumber,
    title,
    nameFirst,
    nameFather,
    nameGrandfather,
    mobileNumber,
    organization,
    dateOfBirth,
    comments,
  } = member.data()!

  const now = Date.now() - 1000 * 60 * 60 * 5
  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("member", "==", member.id),
      where("timestamp", ">=", now),
    ),
  )

  return (
    <>
      <h1>
        {title && title + "."} {cap(nameFirst)} {cap(nameFather)}{" "}
        {cap(nameGrandfather)}
      </h1>

      <div className="flex flex-col gap-3 text-lg">
        <p className="input">
          {idType}: {idNumber}
        </p>

        <p className="input">Mobile Number: {mobileNumber}</p>
        <p className="input">Organization: {organization}</p>
        <p className="input">Date of Birth: {dateOfBirth}</p>

        <div className="flex h-18 gap-4 text-xl">
          <Link
            href="/search"
            className="button flex w-full items-center justify-center bg-green-500"
          >
            Back to Search
          </Link>

          <button
            onClick={async () => {
              "use server"

              const visits = await getDocs(
                query(
                  collection(db, "visits"),
                  where("member", "==", member.id),
                  where("timestamp", ">=", now),
                ),
              )

              if (visits.empty) {
                await addDoc(collection(db, "visits"), {
                  member: id,
                  timestamp: Date.now(),
                })
              }

              redirect("/search")
            }}
            className="button w-full"
          >
            Sign In
          </button>
        </div>
      </div>

      <form
        action={async (fd) => {
          "use server"

          const nc = (fd.get("comments") as string).trim()

          if (nc !== comments) {
            await updateDoc(doc(db, "members", id), { comments: nc })
            revalidatePath("/member/" + id)
          }
        }}
        className="mt-3 flex flex-col gap-3"
      >
        <textarea
          name="comments"
          defaultValue={comments}
          placeholder="Comments"
          className="input border-secondary h-42 text-lg"
        />

        <button className="button bg-secondary h-18 text-xl">
          Submit Comment
        </button>
      </form>
    </>
  )
}
