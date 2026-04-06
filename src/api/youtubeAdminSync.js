import { fetchAllVideos, fetchLatestVideos } from "@/lib/youtubeSync";
import {
  isKnownYouTubeVideoId,
  upsertYouTubeVideos,
} from "@/api/youtubeSyncFirestore";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export async function fullYouTubeSync() {
  if (!API_KEY) throw new Error("Missing VITE_YOUTUBE_API_KEY");
  if (!CHANNEL_ID) throw new Error("Missing VITE_YOUTUBE_CHANNEL_ID");

  const videos = await fetchAllVideos(API_KEY, CHANNEL_ID, 20);
  return await upsertYouTubeVideos(videos);
}

export async function latestYouTubeSync() {
  if (!API_KEY) throw new Error("Missing VITE_YOUTUBE_API_KEY");
  if (!CHANNEL_ID) throw new Error("Missing VITE_YOUTUBE_CHANNEL_ID");

  const videos = await fetchLatestVideos(
    API_KEY,
    CHANNEL_ID,
    isKnownYouTubeVideoId,
    3,
  );

  if (videos.length === 0) {
    return { created: 0, updated: 0, total: 0 };
  }

  return await upsertYouTubeVideos(videos);
}
