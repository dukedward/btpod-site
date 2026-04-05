import React from "react";
import { Play, Image, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const typeConfig = {
  video: { icon: Play, label: "Video", color: "bg-primary/20 text-primary" },
  image: { icon: Image, label: "Photo", color: "bg-blue-500/20 text-blue-400" },
  audio: {
    icon: Volume2,
    label: "Audio",
    color: "bg-pink-500/20 text-pink-400",
  },
};

export default function MediaCard({ clip, onClick }) {
  const config = typeConfig[clip.type] || typeConfig.video;
  const Icon = config.icon;

  return (
    <div
      className="group cursor-pointer rounded-xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300"
      onClick={() => onClick?.(clip)}
    >
      <div className="aspect-video relative bg-secondary overflow-hidden">
        {clip.type === "image" ? (
          <img
            src={clip.file_url}
            alt={clip.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-secondary to-muted">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className={`${config.color} border-none text-xs font-medium`}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm line-clamp-1">
          {clip.title}
        </h3>
        {clip.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {clip.description}
          </p>
        )}
        {clip.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {clip.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
