import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublishedEpisodes } from "@/api/episodes";
import { Input } from "@/components/ui/input";
import EpisodeCard from "@/components/shared/EpisodeCard";

export default function Episodes() {
  const [search, setSearch] = useState("");
  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["episodes"],
    queryFn: getPublishedEpisodes,
  });

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return episodes;

    return episodes.filter((episode) => {
      const haystack = [episode.title, episode.description, ...(episode.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [episodes, search]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight">Episodes</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Search published episodes by title, description, or tags.
        </p>
      </div>
      <div className="mt-6 max-w-md">
        <Input placeholder="Search episodes..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {isLoading ? (
        <p className="mt-10 text-sm text-[var(--muted-foreground)]">Loading episodes...</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
          {filtered.length === 0 && <p className="text-sm text-[var(--muted-foreground)]">No matching episodes found.</p>}
        </div>
      )}
    </section>
  );
}
