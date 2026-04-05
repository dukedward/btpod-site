import React from "react";
import { Play, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function EpisodeCard({ episode, selected, setSelected }) {
  const isActive = selected?.id === episode.id;
  return (
    <div
      className={`group cursor-pointer rounded-xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 ${
        isActive
          ? "border-primary/60 ring-1 ring-primary/30"
          : "border-border/50"
      }`}
      onClick={() => setSelected(episode)}
    >
      <div className="aspect-video relative bg-secondary overflow-hidden">
        {episode.thumbnail_url ? (
          <img
            src={`https://img.youtube.com/vi/${getYouTubeEmbedUrl(episode.youtube_url)?.split("/embed/")[1]}/hqdefault.jpg`}
            alt={episode.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/10 to-secondary flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-primary/30">
              EP {episode.episode_number || "#"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
        {episode.episode_number && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/80 text-foreground border-none text-xs backdrop-blur-sm">
              EP {episode.episode_number}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground line-clamp-1">
          {episode.title}
        </h3>
        {episode.description && (
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
            {episode.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          {episode.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(episode.date), "MMM d, yyyy")}
            </div>
          )}
        </div>
        {episode.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {episode.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize"
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
