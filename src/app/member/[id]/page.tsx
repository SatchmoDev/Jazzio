import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import Data from "./Data"

interface Props {
  params: Promise<{ id: string }>
}
export default async function Member({ params }: Props) {
  const { id } = await params
  const document = await getDoc(doc(db, "members", id))

  return <Data data={document.data()!} />
}
