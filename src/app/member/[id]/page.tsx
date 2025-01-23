import { db } from "@/lib/firebase"
import { cap } from "@/utils/client"
import { protect } from "@/utils/server"
import { doc, getDoc } from "firebase/firestore"

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
    </>
  )
}
