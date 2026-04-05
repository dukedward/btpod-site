import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, Image, Volume2, X } from "lucide-react";

export default function MediaViewer({ clip, open, onClose }) {
  if (!clip) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {clip.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {clip.type === "video" && clip.file_url && (
              <video
                src={clip.file_url}
                controls
                className="w-full rounded-lg bg-black aspect-video"
              />
            )}
            {clip.type === "image" && clip.file_url && (
              <img
                src={clip.file_url}
                alt={clip.title}
                className="w-full rounded-lg object-contain max-h-[60vh]"
              />
            )}
            {clip.type === "audio" && clip.file_url && (
              <div className="bg-secondary rounded-lg p-8 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Volume2 className="w-10 h-10 text-primary" />
                </div>
                <audio
                  src={clip.file_url}
                  controls
                  className="w-full max-w-md"
                />
              </div>
            )}
          </div>

          {clip.description && (
            <p className="mt-4 text-sm text-muted-foreground">
              {clip.description}
            </p>
          )}

          {clip.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {clip.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
