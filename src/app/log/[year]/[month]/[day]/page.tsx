import { db } from "@/lib/firebase"
import { cap } from "@/utils/client"
import { protect } from "@/utils/server"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import Link from "next/link"

interface Props {
  params: Promise<{ year: string; month: string; day: string }>
}

export default async function Day({ params }: Props) {
  const { year, month, day } = await params
  await protect()

  const date = new Date(`${year}-${month}-${day}`)

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("timestamp", ">=", date.getTime()),
      where("timestamp", "<=", date.getTime() + 1000 * 60 * 60 * 24),
    ),
  )

  const members = await Promise.all(
    visits.docs.map(async (visit) => {
      const data = visit.data()
      return { member: await getDoc(doc(db, "members", data.member)), visit }
    }),
  )

  return (
    <>
      <h1>
        {Intl.DateTimeFormat("en-us", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date)}
      </h1>

      <p>Attendance: {members.length}</p>
      <div className="mt-4 space-y-4">
        {members.map(({ member, visit }, i) => {
          const {
            nameFirst,
            nameFather,
            nameGrandfather,
            organization,
            email,
            mobileNumber,
          } = member.data()!

          return (
            <div className="">
              <Link href={"/member/" + member.id}>
                {cap(nameFirst)} {cap(nameFather)} {cap(nameGrandfather)}
              </Link>

              <p>{organization}</p>
              <p>{email}</p>
              <p>{mobileNumber}</p>

              <p>
                {Intl.DateTimeFormat("en-us", {
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: "Africa/Nairobi",
                  hourCycle: "h24",
                }).format(visit.data().timestamp)}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
