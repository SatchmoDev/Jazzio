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

interface Props {
  params: Promise<{ year: string; month: string; day: string }>
}

export default async function Day({ params }: Props) {
  await protect()

  const { year, month, day } = await params

  const date = new Date(`${year}-${month}-${day}`)

  const visits = await getDocs(
    query(
      collection(db, "visits"),
      where("timestamp", ">", date.getTime()),
      where("timestamp", "<", date.getTime() + 86400000),
    ),
  )

  const full = []

  for (const visit of visits.docs) {
    const data = visit.data()
    const member = await getDoc(doc(db, "members", data.member))

    full.push({ member: member.data()! })
  }

  return (
    <>
      <h1>
        {Intl.DateTimeFormat("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date)}
      </h1>

      <p className="mb-4">Attendance: {full.length}</p>

      {full.map(({ member }, i) => {
        return (
          <p key={i}>
            {cap(member.nameFirst)} {cap(member.nameFather)}{" "}
            {cap(member.nameGrandfather)}
          </p>
        )
      })}
    </>
  )
}
