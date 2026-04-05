import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { createClip } from "@/api/clips";
import { uploadFile } from "@/api/uploads";
import { queryClient } from "@/lib/query-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UploadMediaForm() {
  const { isAdmin } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("video");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAdmin) {
      toast.error("This form is limited to the configured admin email.");
      return;
    }

    if (!title || !file) {
      toast.error("Add a title and choose a file.");
      return;
    }

    setSubmitting(true);
    try {
      const file_url = await uploadFile(file, "clips");
      await createClip({
        title,
        description,
        type,
        file_url,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });
      await queryClient.invalidateQueries({ queryKey: ["clips"] });
      setTitle("");
      setDescription("");
      setType("video");
      setTags("");
      setFile(null);
      toast.success("Clip uploaded.");
    } catch (error) {
      toast.error(error.message || "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="clip-title">Title</Label>
        <Input id="clip-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Funny moment" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clip-description">Description</Label>
        <Textarea id="clip-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the clip" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clip-type">Type</Label>
        <select
          id="clip-type"
          className="flex h-11 w-full rounded-xl border bg-transparent px-4 py-2 text-sm outline-none"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="clip-file">File</Label>
        <input id="clip-file" type="file" accept={type === "video" ? "video/*" : type === "image" ? "image/*" : "audio/*"} onChange={(event) => setFile(event.target.files?.[0] || null)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clip-tags">Tags</Label>
        <Input id="clip-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="highlights, funny, nfl" />
      </div>
      <Button className="w-full" disabled={submitting}>
        {submitting ? "Uploading..." : "Upload clip"}
      </Button>
    </form>
  );
}
