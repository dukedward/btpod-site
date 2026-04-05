import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { createEpisode } from "@/api/episodes";
import { uploadFile } from "@/api/uploads";
import { queryClient } from "@/lib/query-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  title: "",
  description: "",
  episode_number: "",
  date: "",
  tags: "",
  status: "published",
};

export default function UploadEpisodeForm() {
  const { isAdmin } = useAuth();
  const [form, setForm] = useState(initialState);
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAdmin) {
      toast.error("This form is limited to the configured admin email.");
      return;
    }

    if (!form.title) {
      toast.error("Title is required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        episode_number: form.episode_number ? Number(form.episode_number) : null,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      if (thumbnail) payload.thumbnail_url = await uploadFile(thumbnail, "thumbnails");
      if (video) payload.video_url = await uploadFile(video, "episodes/video");
      if (audio) payload.audio_url = await uploadFile(audio, "episodes/audio");

      await createEpisode(payload);
      await queryClient.invalidateQueries({ queryKey: ["episodes"] });
      await queryClient.invalidateQueries({ queryKey: ["episodes-latest"] });
      setForm(initialState);
      setThumbnail(null);
      setVideo(null);
      setAudio(null);
      toast.success("Episode created.");
    } catch (error) {
      toast.error(error.message || "Episode creation failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="episode-title">Title</Label>
        <Input id="episode-title" value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Episode 14 - Week recap" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="episode-description">Description</Label>
        <Textarea id="episode-description" value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="What happened in this episode?" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="episode-number">Episode number</Label>
          <Input id="episode-number" type="number" value={form.episode_number} onChange={(event) => updateField("episode_number", event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="episode-date">Date</Label>
          <Input id="episode-date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="episode-status">Status</Label>
          <select
            id="episode-status"
            className="flex h-11 w-full rounded-xl border bg-transparent px-4 py-2 text-sm outline-none"
            value={form.status}
            onChange={(event) => updateField("status", event.target.value)}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="episode-tags">Tags</Label>
          <Input id="episode-tags" value={form.tags} onChange={(event) => updateField("tags", event.target.value)} placeholder="nfl, interviews, betting" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="episode-thumb">Thumbnail</Label>
          <input id="episode-thumb" type="file" accept="image/*" onChange={(event) => setThumbnail(event.target.files?.[0] || null)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="episode-video">Video</Label>
          <input id="episode-video" type="file" accept="video/*" onChange={(event) => setVideo(event.target.files?.[0] || null)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="episode-audio">Audio</Label>
          <input id="episode-audio" type="file" accept="audio/*" onChange={(event) => setAudio(event.target.files?.[0] || null)} />
        </div>
      </div>
      <Button className="w-full" disabled={submitting}>
        {submitting ? "Creating..." : "Create episode"}
      </Button>
    </form>
  );
}
