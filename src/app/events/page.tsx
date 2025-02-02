import Pending from "@/components/Pending"
import { db } from "@/lib/firebase"
import { protect } from "@/utils/server"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { redirect } from "next/navigation"

export default async function Events() {
  await protect()

  const events = await getDocs(
    query(
      collection(db, "events"),
      where("date", ">=", new Date().toISOString().split("T")[0]),
    ),
  )

  return (
    <>
      <h1>Events</h1>

      <div className="space-y-2">
        {events.docs.map((event) => {
          const { name, date, start, end } = event.data()

          return (
            <div className="input grid grid-cols-4 items-center" key={event.id}>
              <p>{name}</p>
              <p>{date}</p>
              <p>
                {start} - {end}
              </p>

              <button
                onClick={async () => {
                  "use server"

                  await deleteDoc(doc(db, "events", event.id))
                  redirect("/events")
                }}
                className="button"
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>

      <h2 className="mt-4 mb-2 text-2xl font-semibold">New</h2>
      <form
        action={async (fd) => {
          "use server"

          const { name, date, start, end } = Object.fromEntries(fd) as {
            [k: string]: string
          }

          await addDoc(collection(db, "events"), {
            name,
            date,
            start,
            end,
            timestamp: new Date(`${date}T${start}`).getTime(),
          })

          redirect("/events")
        }}
        className="flex flex-col"
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required className="input mb-2" />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className="input mb-2"
        />

        <label htmlFor="start">Start Time</label>
        <input
          id="start"
          name="start"
          type="time"
          required
          className="input mb-2"
        />

        <label htmlFor="end">End Time</label>
        <input
          id="end"
          name="end"
          type="time"
          required
          className="input mb-4"
        />

        <Pending />
      </form>
    </>
  )
}
