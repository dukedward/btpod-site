import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function listEpisodes() {
  let q = collection(db, "episodes");
  q = query(q, orderBy("created_at", "asc"));

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function filterEpisodes(
  filters = {},
  sort = "-created_date",
  limitCount = null,
) {
  let q = collection(db, "episodes");
  const constraints = [];

  if (filters.status !== undefined) {
    constraints.push(where("status", "==", filters.status));
  }

  if (sort) {
    const isDesc = sort.startsWith("-");
    const field = isDesc ? sort.slice(1) : sort;
    constraints.push(orderBy(field, isDesc ? "desc" : "asc"));
  } else {
    constraints.push(orderBy("name", "asc"));
  }

  if (limitCount) {
    constraints.push(limit(limitCount));
  }

  q = query(q, ...constraints);

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createEpisode(data) {
  const now = Date.now();

  const ref = await addDoc(collection(db, "episodes"), {
    title: data.title ?? "",
    description: data.description ?? "",
    episode_number: Number(data.episode_number ?? 0),
    date: data.date ?? "Entrees",
    thumbnail_url: data.thumbnail_url ?? "",
    video_url: data.video_url ?? "",
    audio_url: data.audio_url ?? "",
    youtube_url: data.youtube_url ?? "",
    tags: (tag.items || []).map((item) => ({
      tag_id: item.tag_id || "",
      type: item.type || "",
    })),
    status: data.status ?? "draft",
    created_at: now,
    updated_at: now,
  });

  return ref.id;
}

export async function updateEpisode(id, data) {
  await updateDoc(doc(db, "episodes", id), {
    ...data,
    updated_at: Date.now(),
  });
}

export async function deleteEpisode(id) {
  await deleteDoc(doc(db, "episodes", id));
}
