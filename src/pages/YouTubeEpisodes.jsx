import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Youtube,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { format } from "date-fns";
import { filterEpisodes } from "../api/episodes";
import { YOUTUBE_EPISODES } from "../lib/youtube";
import { getYouTubeEmbedUrl } from "../lib/utils";

export default function YouTubeEpisodes() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("episode_number");
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState(null);

  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["episodes-yt"],
    queryFn: () =>
      filterEpisodes({ status: "published" }, "-episode_number", 100),
  });

  const ytEpisodes = YOUTUBE_EPISODES.filter((ep) => ep.youtube_url);
  // const ytEpisodes = episodes.filter((ep) => ep.youtube_url);

  const filtered = ytEpisodes
    .filter((ep) => {
      const q = search.toLowerCase();
      return (
        ep.title?.toLowerCase().includes(q) ||
        String(ep.episode_number).includes(q) ||
        ep.date?.includes(q)
      );
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "episode_number") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = aVal || "";
        bVal = bVal || "";
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
          <SiYoutube className="w-5 h-5 text-red-500" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground">
          YouTube Episodes
        </h1>
      </div>
      <p className="text-muted-foreground mb-10">
        Watch full episodes directly from YouTube.
      </p>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, number, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortField === "episode_number" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleSort("episode_number")}
            className="gap-1.5 text-xs"
          >
            Ep # <SortIcon field="episode_number" />
          </Button>
          <Button
            variant={sortField === "title" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleSort("title")}
            className="gap-1.5 text-xs"
          >
            Name <SortIcon field="title" />
          </Button>
          <Button
            variant={sortField === "date" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleSort("date")}
            className="gap-1.5 text-xs"
          >
            Date <SortIcon field="date" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {Array(4)
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
          <SiYoutube className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg">
            {ytEpisodes.length === 0
              ? "No YouTube episodes added yet. Admins can add a YouTube URL to any episode."
              : "No episodes match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured / Selected */}
          {selected && (
            <div className="rounded-2xl bg-card border border-primary/20 overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  src={getYouTubeEmbedUrl(selected.youtube_url)}
                  title={selected.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {selected.episode_number && (
                      <span className="text-xs text-primary font-semibold">
                        EP {selected.episode_number} ·{" "}
                      </span>
                    )}
                    <h2 className="font-display text-xl font-bold text-foreground inline">
                      {selected.title}
                    </h2>
                    {selected.date && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(selected.date), "MMMM d, yyyy")}
                      </p>
                    )}
                    {selected.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {selected.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelected(null)}
                    className="shrink-0 text-xs"
                  >
                    Close
                  </Button>
                </div>
                {selected.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selected.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Episode List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ep) => {
              const isActive = selected?.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => setSelected(ep)}
                  className={`group cursor-pointer rounded-xl bg-card border overflow-hidden transition-all duration-300 hover:border-primary/40 ${
                    isActive
                      ? "border-primary/60 ring-1 ring-primary/30"
                      : "border-border/50"
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden bg-secondary">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeEmbedUrl(ep.youtube_url)?.split("/embed/")[1]}/hqdefault.jpg`}
                      alt={ep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <SiYoutube className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    {ep.episode_number && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-background/80 text-foreground border-none text-xs backdrop-blur-sm">
                          EP {ep.episode_number}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                      {ep.title}
                    </h3>
                    {ep.date && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(ep.date), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
