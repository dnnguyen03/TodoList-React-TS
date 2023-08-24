import { useEffect, useState } from "react"
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore"
import { db } from "./config"

const useFirestore = (collectionName: string) => {
  const [documents, setDocuments] = useState<DocumentData[]>([])

  useEffect(() => {
    const collectionRef = collection(db, collectionName)

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setDocuments(documents)
      }
    )

    return unsubscribe
  }, [collectionName])

  return documents
}

export default useFirestore
