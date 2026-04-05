import React, { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import HostsSection from "../components/home/HostsSection";
import TopicsSection from "../components/home/TopicsSection";
import { useQuery } from "@tanstack/react-query";
import EpisodeCard from "../components/shared/EpisodeCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { filterEpisodes } from "../api/episodes";
import { YOUTUBE_EPISODES } from "../lib/youtube";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const { data: episodes = [] } = useQuery({
    queryKey: ["episodes-latest"],
    queryFn: () => filterEpisodes({ status: "published" }, "-created_date", 3),
  });
  const sortedEpisodes = [...YOUTUBE_EPISODES]
    .sort((a, b) => b.episode_number - a.episode_number)
    .slice(0, 3);

  return (
    <div>
      <HeroSection />
      <TopicsSection />
      <HostsSection />

      {sortedEpisodes.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Latest Episodes
              </h2>
              <p className="mt-2 text-muted-foreground">Fresh off the mic.</p>
            </div>
            <Link to="/YouTubeEpisodes">
              <Button variant="ghost" className="gap-2 text-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-8">
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
            <div className="grid md:grid-cols-3 gap-6">
              {sortedEpisodes.map((epispode) => (
                <EpisodeCard
                  key={epispode.id}
                  episode={epispode}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
