import { db } from "@/lib/firebase"
import { cap } from "@/utils/client"
import { protect } from "@/utils/server"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
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
    documentType,
    documentNumber,
    dateOfBirth,
  } = document.data()!

  return (
    <>
      <h1>
        {cap(firstName)} {cap(fatherName)} {cap(grandfatherName)}
      </h1>

      <p>Phone Number: {phoneNumber}</p>
      <p>
        {documentType}: {documentNumber}
      </p>
      <p>Date of Birth: {dateOfBirth}</p>

      <button
        onClick={async () => {
          "use server"

          await addDoc(collection(db, "visits"), {
            user: id,
            timestamp: Date.now(),
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
