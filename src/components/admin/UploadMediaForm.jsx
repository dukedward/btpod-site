import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { uploadFile } from "../../lib/utils";
import { createMedia } from "../../api/media";

const TAG_OPTIONS = [
  "sports",
  "music",
  "current events",
  "interview",
  "highlights",
  "behind the scenes",
];

export default function UploadMediaForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "video",
    tags: [],
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");
    if (!form.title) return toast.error("Please enter a title");

    setUploading(true);
    const { file_url } = await uploadFile({ file, location: "media" });
    await createMedia({ ...form, file_url });
    toast.success("Media uploaded!");
    setForm({ title: "", description: "", type: "video", tags: [] });
    setFile(null);
    setUploading(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          placeholder="Clip title"
          className="bg-secondary border-border"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Brief description..."
          className="bg-secondary border-border h-20"
        />
      </div>

      <div className="space-y-2">
        <Label>Media Type</Label>
        <Select
          value={form.type}
          onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}
        >
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video Clip</SelectItem>
            <SelectItem value="image">Picture</SelectItem>
            <SelectItem value="audio">Audio Clip</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>File</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            accept={
              form.type === "video"
                ? "video/*"
                : form.type === "audio"
                  ? "audio/*"
                  : "image/*"
            }
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="media-upload"
          />
          <label htmlFor="media-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {file ? file.name : "Click to select a file"}
            </p>
          </label>
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
        {uploading ? "Uploading..." : "Upload Media"}
      </Button>
    </form>
  );
}
