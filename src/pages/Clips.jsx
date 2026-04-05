import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MediaCard from "../components/shared/MediaCard";
import MediaViewer from "../components/shared/MediaViewer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Play, Image, Volume2, LayoutGrid } from "lucide-react";
import { filterMedias } from "../api/media";

const filters = [
  { label: "All", value: "all", icon: LayoutGrid },
  { label: "Videos", value: "video", icon: Play },
  { label: "Photos", value: "image", icon: Image },
  { label: "Audio", value: "audio", icon: Volume2 },
];

export default function Clips() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const { data: clips = [], isLoading } = useQuery({
    queryKey: ["clips"],
    queryFn: () => filterMedias("-created_date", 100),
  });

  const filtered = clips.filter((clip) => {
    const matchesType = typeFilter === "all" || clip.type === typeFilter;
    const matchesSearch =
      clip.title?.toLowerCase().includes(search.toLowerCase()) ||
      clip.description?.toLowerCase().includes(search.toLowerCase()) ||
      clip.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Clips & Media
        </h1>
        <p className="mt-2 text-muted-foreground">
          Video clips, photos, and audio from the show.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={typeFilter === f.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTypeFilter(f.value)}
              className="gap-1.5 text-xs"
            >
              <f.icon className="w-3.5 h-3.5" />
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array(8)
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
          <p className="text-lg">No clips found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((clip) => (
            <MediaCard key={clip.id} clip={clip} onClick={setSelected} />
          ))}
        </div>
      )}

      <MediaViewer
        clip={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
