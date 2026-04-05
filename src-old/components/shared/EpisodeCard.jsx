import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function EpisodeCard({ episode }) {
  return (
    <Card className="overflow-hidden">
      {episode.thumbnail_url ? (
        <img src={episode.thumbnail_url} alt={episode.title} className="aspect-video w-full object-cover" />
      ) : (
        <div className="aspect-video w-full bg-[var(--muted)]" />
      )}
      <CardContent className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Episode {episode.episode_number || "—"}
          </p>
          <h3 className="mt-1 text-xl font-semibold">{episode.title}</h3>
        </div>
        <p className="line-clamp-3 text-sm text-[var(--muted-foreground)]">{episode.description}</p>
        <div className="flex flex-wrap gap-2">
          {(episode.tags || []).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {episode.video_url && (
          <a className="text-sm font-medium underline" href={episode.video_url} target="_blank" rel="noreferrer">
            Watch video
          </a>
        )}
      </CardContent>
    </Card>
  );
}
