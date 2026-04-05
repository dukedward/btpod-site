import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getLatestEpisodes } from "@/api/episodes";
import StatsChart from "@/components/charts/StatsChart";
import HeroSection from "@/components/home/HeroSection";
import HostsSection from "@/components/home/HostsSection";
import TopicsSection from "@/components/home/TopicsSection";
import EpisodeCard from "@/components/shared/EpisodeCard";

export default function Home() {
  const { data: episodes = [] } = useQuery({
    queryKey: ["episodes-latest"],
    queryFn: () => getLatestEpisodes(3),
  });

  return (
    <div>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Latest episodes</h2>
            <p className="mt-1 text-muted-foreground">
              Pulls from the `episodes` collection in Firestore.
            </p>
          </div>
          <Link
            to="/episodes"
            className="inline-flex items-center gap-2 text-sm font-medium underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
          {episodes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No episodes yet. Use the Admin page after Google sign-in.
            </p>
          )}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <StatsChart />
      </section>
      <HostsSection />
      <TopicsSection />
    </div>
  );
}
