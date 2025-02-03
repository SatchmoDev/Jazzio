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
      where("timestamp", ">=", new Date().setHours(0, 0, 0, 0)),
    ),
  )

  return (
    <>
      <h1>Events</h1>

      <div className="space-y-2">
        {events.docs.map((event) => (
          <div
            className="input flex items-center justify-between"
            key={event.id}
          >
            <p>{event.data().name}</p>

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
        ))}
      </div>

      <h2 className="mt-4 mb-2 text-2xl font-semibold">New</h2>
      <form
        action={async (fd) => {
          "use server"

          const { name, date, start } = Object.fromEntries(fd) as {
            [k: string]: string
          }

          await addDoc(collection(db, "events"), {
            name,
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
          className="input mb-4"
        />

        <Pending />
      </form>
    </>
  )
}
