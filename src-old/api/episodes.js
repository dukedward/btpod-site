import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getPublishedEpisodes() {
  const q = query(
    collection(db, "episodes"),
    where("status", "==", "published"),
    orderBy("episode_number", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getLatestEpisodes(limitCount = 3) {
  const rows = await getPublishedEpisodes();
  return rows.slice(0, limitCount);
}

export async function createEpisode(data) {
  const ref = await addDoc(collection(db, "episodes"), {
    ...data,
    created_at: Date.now(),
  });
  return ref.id;
}
