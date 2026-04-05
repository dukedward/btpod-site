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

export async function listMedias() {
  let q = collection(db, "medias");
  q = query(q, orderBy("created_at", "asc"));

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function filterMedias(
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

export async function createMedia(data) {
  const now = Date.now();

  const ref = await addDoc(collection(db, "medias"), {
    title: data.title ?? "",
    description: data.description ?? "",
    type: data.type ?? "video",
    file_url: data.file_url ?? "",
    episode_id: data.episode_id ?? "",
    tags: (tag.items || []).map((item) => ({
      tag_id: item.tag_id || "",
      type: item.type || "",
    })),
    created_at: now,
    updated_at: now,
  });

  return ref.id;
}

export async function updateMedia(id, data) {
  await updateDoc(doc(db, "medias", id), {
    ...data,
    updated_at: Date.now(),
  });
}

export async function deleteMedia(id) {
  await deleteDoc(doc(db, "medias", id));
}
