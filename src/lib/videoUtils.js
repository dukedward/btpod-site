import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

let ffmpeg;

async function getFFmpeg() {
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    await ffmpeg.load();
  }
  return ffmpeg;
}

export async function convertVideoToMp4(file) {
  if (!file) throw new Error("No file provided");

  if (!file.type.startsWith("video/")) {
    return file;
  }

  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "mp4" && file.type === "video/mp4") {
    return file;
  }

  const ff = await getFFmpeg();

  const inputName = `input.${ext || "mov"}`;
  const outputName = "output.mp4";

  await ff.writeFile(inputName, await fetchFile(file));

  await ff.exec([
    "-i",
    inputName,
    "-c:v",
    "libx264",
    "-crf",
    "18",
    "-preset",
    "veryfast",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    outputName,
  ]);

  const data = await ff.readFile(outputName);

  return new File([data.buffer], file.name.replace(/\.[^.]+$/, ".mp4"), {
    type: "video/mp4",
  });
}
