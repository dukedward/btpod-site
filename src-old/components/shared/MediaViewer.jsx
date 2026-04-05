export default function MediaViewer({ item }) {
  if (!item?.file_url) return null;

  if (item.type === "image") {
    return <img src={item.file_url} alt={item.title} className="max-h-[70vh] w-full rounded-2xl object-contain" />;
  }

  if (item.type === "audio") {
    return <audio src={item.file_url} controls className="w-full" />;
  }

  return <video src={item.file_url} controls className="max-h-[70vh] w-full rounded-2xl bg-black" />;
}
