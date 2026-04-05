import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getClips() {
  const q = query(collection(db, "mediaClips"), orderBy("created_at", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createClip(data) {
  const ref = await addDoc(collection(db, "mediaClips"), {
    ...data,
    created_at: Date.now(),
  });
  return ref.id;
}
