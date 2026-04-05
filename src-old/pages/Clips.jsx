import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClips } from "@/api/clips";
import MediaCard from "@/components/shared/MediaCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Clips() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { data: clips = [], isLoading } = useQuery({
    queryKey: ["clips"],
    queryFn: getClips,
  });

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return clips.filter((clip) => {
      const haystack = [clip.title, clip.description, ...(clip.tags || [])].join(" ").toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matchesType = typeFilter === "all" || clip.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [clips, search, typeFilter]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight">Clips</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Search and preview video, image, and audio clips from Firestore and Storage.
        </p>
      </div>

      <div className="mt-6 max-w-md">
        <Input placeholder="Search clips..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>

      <Tabs value={typeFilter} onValueChange={setTypeFilter} className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        <TabsContent value={typeFilter}>
          {isLoading ? (
            <p className="mt-10 text-sm text-[var(--muted-foreground)]">Loading clips...</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((clip) => (
                <MediaCard key={clip.id} clip={clip} />
              ))}
              {filtered.length === 0 && <p className="text-sm text-[var(--muted-foreground)]">No matching clips found.</p>}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
