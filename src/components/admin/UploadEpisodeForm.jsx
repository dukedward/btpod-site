import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  uploadFile,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
} from "../../lib/utils";
import { createEpisode } from "../../api/episodes";

const TAG_OPTIONS = [
  "sports",
  "music",
  "current events",
  "interview",
  "highlights",
];

export default function UploadEpisodeForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    episode_number: "",
    youtube_url: "",
    thumbnail_url: "",
    date: "",
    tags: [],
    status: "published",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleYouTubeChange = (e) => {
    const rawUrl = e.target.value;
    const embedUrl = getYouTubeEmbedUrl(rawUrl) || "";
    const thumbnailUrl = getYouTubeThumbnailUrl(rawUrl);

    setForm((prev) => ({
      ...prev,
      youtube_url: embedUrl,
      thumbnail_url: thumbnailUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error("Please enter a title");

    setUploading(true);
    try {
      const data = {
        ...form,
        episode_number: form.episode_number
          ? Number(form.episode_number)
          : undefined,
      };

      if (thumbnail) {
        const { file_url } = await uploadFile({
          file: thumbnail,
          location: "episode/thumbnail",
        });
        data.thumbnail_url = file_url;
      }
      if (video) {
        const { file_url } = await uploadFile({
          file: video,
          location: "episode/video",
        });
        data.video_url = file_url;
      }

      await createEpisode(data);
      toast.success("Episode created!");
      setForm({
        title: "",
        description: "",
        episode_number: "",
        youtube_url: "",
        thumbnail_url: "",
        date: "",
        tags: [],
        status: "published",
      });
      setThumbnail(null);
      setVideo(null);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create episode");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Episode title"
            className="bg-secondary border-border"
          />
        </div>
        <div className="space-y-2">
          <Label>Episode Number</Label>
          <Input
            type="number"
            value={form.episode_number}
            onChange={(e) =>
              setForm((p) => ({ ...p, episode_number: e.target.value }))
            }
            placeholder="#"
            className="bg-secondary border-border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Episode summary..."
          className="bg-secondary border-border h-20"
        />
      </div>

      <div className="space-y-2">
        <Label>Air Date</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          className="bg-secondary border-border"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* <FileInput
          label="Thumbnail"
          accept="image/*"
          file={thumbnail}
          onChange={setThumbnail}
        /> 
        <FileInput
          label="Video"
          accept="video/*"
          file={video}
          onChange={setVideo}
        />
        */}
        <div className="space-y-2">
          <Label>YouTube Link</Label>
          <Input
            type="text"
            value={form.youtube_url}
            onChange={handleYouTubeChange}
            placeholder="YouTube link"
            className="bg-secondary border-border"
          />
        </div>
        <div className="space-y-2">
          <Label>Thumbnail Link</Label>
          <Input
            type="text"
            value={form.thumbnail_url}
            onChange={(e) =>
              setForm((p) => ({ ...p, thumbnail_url: e.target.value }))
            }
            placeholder="Thumbnail auto-fills from YouTube link"
            className="bg-secondary border-border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <Badge
              key={tag}
              variant={form.tags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={uploading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        {uploading ? "Creating Episode..." : "Create Episode"}
      </Button>
    </form>
  );
}

function FileInput({ label, accept, file, onChange }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border border-dashed border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files[0])}
          className="hidden"
          id={`upload-${label}`}
        />
        <label htmlFor={`upload-${label}`} className="cursor-pointer">
          <Upload className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground truncate">
            {file ? file.name : `Select ${label.toLowerCase()}`}
          </p>
        </label>
      </div>
    </div>
  );
}
