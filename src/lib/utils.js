import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isIframe = window.self !== window.top;

export function parseLocalDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export async function uploadFile(file, location) {
  if (!file) throw new Error("No file provided");
  if (!location) throw new Error("No upload location provided");

  const ext = file.name.split(".").pop()?.toLowerCase();
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const storageRef = ref(storage, `${location}/${fileName}`);

  await uploadBytes(storageRef, file, {
    contentType: file.type || "application/octet-stream",
  });

  const fileUrl = await getDownloadURL(storageRef);
  return fileUrl;
}

export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // Handle standard watch?v=
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  // Handle /embed/ already
  if (url.includes("/embed/")) return url;
  // Treat as raw ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url))
    return `https://www.youtube.com/embed/${url}`;
  return null;
}

export function getYouTubeVideoId(url) {
  if (!url) return null;

  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];

  const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  return null;
}

export function getYouTubeThumbnailUrl(url) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
