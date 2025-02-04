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
  where,
} from "firebase/firestore"
import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Member({ params }: Props) {
  await protect()

  const { id } = await params
  const member = await getDoc(doc(db, "members", id))

  const {
    nameFirst,
    nameFather,
    nameGrandfather,
    phoneNumber,
    idType,
    organization,
    email,
    idNumber,
    dateOfBirth,
  } = member.data()!

  const events = await getDocs(
    query(
      collection(db, "events"),
      where("timestamp", ">=", Date.now() - 1000 * 60 * 60 * 3),
      where("timestamp", "<=", Date.now() + 1000 * 60 * 60 * 3),
    ),
  )

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("member", "==", member.id),
      where("timestamp", ">=", Date.now() - 1000 * 60 * 60 * 3),
    ),
  )

  return (
    <div className="text-xl">
      <h1>
        {cap(nameFirst)} {cap(nameFather)} {cap(nameGrandfather)}
      </h1>

      <p>
        {idType}: {idNumber}
      </p>

      <p>Phone Number: {phoneNumber}</p>
      <p>Organization: {organization}</p>
      <p>Email: {email}</p>
      <p>Date of Birth: {dateOfBirth}</p>

      {visits.empty && (
        <form
          action={async (fd) => {
            "use server"

            await addDoc(collection(db, "visits"), {
              member: id,
              event: fd.get("event"),
              timestamp: Date.now(),
            })

            redirect("/search")
          }}
          className="mt-4 flex flex-col gap-2"
        >
          <select name="event" className="input">
            {events.docs.map((event) => {
              const { name } = event.data()

              return (
                <option value={event.id} key={event.id}>
                  {name}
                </option>
              )
            })}

            <option value="v7n6zlSpJEE5hKjlygx9">Walk In</option>
          </select>

          <Pending />
        </form>
      )}
    </div>
  )
}
