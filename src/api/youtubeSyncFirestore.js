import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function findEpisodeByYouTubeVideoId(videoId) {
  const q = query(
    collection(db, "episodes"),
    where("youtube_video_id", "==", videoId),
    limit(1),
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  return {
    id: snap.docs[0].id,
    ...snap.docs[0].data(),
  };
}

export async function isKnownYouTubeVideoId(videoId) {
  const existing = await findEpisodeByYouTubeVideoId(videoId);
  return !!existing;
}

export async function upsertYouTubeVideos(videos) {
  let created = 0;
  let updated = 0;

  for (const video of videos) {
    const existing = await findEpisodeByYouTubeVideoId(video.youtube_video_id);

    if (existing) {
      await updateDoc(doc(db, "episodes", existing.id), {
        ...video,
        updated_at: Date.now(),
      });
      updated += 1;
    } else {
      await addDoc(collection(db, "episodes"), {
        ...video,
        status: "published",
        tags: [],
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      created += 1;
    }
  }

  return { created, updated, total: videos.length };
}
