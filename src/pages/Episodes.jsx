import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EpisodeCard from "../components/shared/EpisodeCard";
import MediaViewer from "../components/shared/MediaViewer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { filterEpisodes } from "../api/episodes";

export default function Episodes() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["episodes"],
    queryFn: () =>
      filterEpisodes({ status: "published" }, "-episode_number", 50),
  });

  const filtered = episodes.filter(
    (ep) =>
      ep.title?.toLowerCase().includes(search.toLowerCase()) ||
      ep.description?.toLowerCase().includes(search.toLowerCase()) ||
      ep.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Episodes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Every episode, all in one place.
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search episodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary border-border"
        />
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-xl bg-secondary animate-pulse"
              />
            ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No episodes found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} onClick={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <MediaViewer
          clip={{
            title: selected.title,
            description: selected.description,
            type: selected.video_url
              ? "video"
              : selected.audio_url
                ? "audio"
                : "image",
            file_url:
              selected.video_url ||
              selected.audio_url ||
              selected.thumbnail_url,
            tags: selected.tags,
          }}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
