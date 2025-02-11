import Pending from "@/components/Pending"
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
    nameFirst,
    nameFather,
    nameGrandfather,
    mobileNumber,
    comments,
  } = member.data()!

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("member", "==", member.id),
      where("timestamp", ">=", Date.now() - 1000 * 60 * 60 * 5),
    ),
  )

  return (
    <>
      <h1>
        {cap(nameFirst)} {cap(nameFather)} {cap(nameGrandfather)}
      </h1>

      <div className="flex flex-col gap-2">
        <p className="input text-xl">
          {idType}: {idNumber}
        </p>

        <p className="input text-xl">Mobile: {mobileNumber}</p>

        {visits.empty && (
          <button
            onClick={async () => {
              "use server"

              await addDoc(collection(db, "visits"), {
                member: id,
                timestamp: Date.now(),
              })

              redirect("/search")
            }}
            className="button"
          >
            Sign In
          </button>
        )}

        <form
          action={async (fd) => {
            "use server"

            await updateDoc(doc(db, "members", id), {
              comments: fd.get("comments"),
            })
          }}
          className="mt-8 flex flex-col gap-2"
        >
          <textarea
            name="comments"
            defaultValue={comments}
            className="input h-40 text-xl"
          />
          <Pending />
        </form>
      </div>
    </>
  )
}
