import { Card, CardContent } from "@/components/ui/card";

const hosts = [
  {
    name: "TD",
    role: "Co-host",
    bio: "Brings reactions, stories, and the in-the-moment takes.",
  },
  {
    name: "Ed",
    role: "Host",
    bio: "Drives the conversation across sports, current events, and tech.",
  },
  {
    name: "Murk",
    role: "Panel",
    bio: "Adds humor, rivalry, and the community voice.",
  },
  {
    name: "Tedy",
    role: "Panel",
    bio: "Wildcard never know what he's going to say next.",
  },
];

export default function HostsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold">Meet the crew</h2>
        <p className="mt-2 text-muted-foreground">
          Replace these placeholders with your real Basement Talk cast, bios,
          and avatars.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {hosts.map((host) => (
          <Card key={host.name}>
            <CardContent className="space-y-3 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-xl font-bold">
                {host.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{host.name}</h3>
                <p className="text-sm text-muted-foreground">{host.role}</p>
              </div>
              <p className="text-sm text-muted-foreground">{host.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
