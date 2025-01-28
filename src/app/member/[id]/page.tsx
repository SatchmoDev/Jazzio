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
  where,
} from "firebase/firestore"
import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Member({ params }: Props) {
  await protect()

  const { id } = await params
  const document = await getDoc(doc(db, "members", id))

  const {
    firstName,
    fatherName,
    grandfatherName,
    phoneNumber,
    idType,
    idNumber,
    dateOfBirth,
    gender,
  } = document.data()!

  return (
    <>
      <h1>
        {cap(firstName)} {cap(fatherName)} {cap(grandfatherName)}
      </h1>

      <p>Phone Number: {phoneNumber}</p>
      <p>
        {idType}: {idNumber}
      </p>
      <p>Date of Birth: {dateOfBirth}</p>
      <p>Gender: {gender}</p>

      <button
        onClick={async () => {
          "use server"

          const events = await getDocs(
            query(
              collection(db, "events"),
              where("start", ">=", Date.now() - 1800000),
              where("start", "<=", Date.now() + 1800000),
            ),
          )

          await addDoc(collection(db, "visits"), {
            member: id,
            timestamp: Date.now(),
            event: events.empty ? "" : events.docs[0].id,
          })

          redirect("/search")
        }}
        className="button mt-4"
      >
        Sign In
      </button>
    </>
  )
}
