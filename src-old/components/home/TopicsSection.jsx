import { Badge } from "@/components/ui/badge";

const topics = ["NFL", "NBA", "music", "gaming", "current events", "interviews", "hot takes", "community"];

export default function TopicsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="text-3xl font-bold">Topics you can spotlight</h2>
      <p className="mt-2 max-w-2xl text-[var(--muted-foreground)]">
        The original app emphasized dynamic content sections. This starter keeps the same style while making the data layer yours.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Badge key={topic}>{topic}</Badge>
        ))}
      </div>
    </section>
  );
}
