import { Link } from "react-router-dom";
import { Mic2, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Sports, culture, and standout moments
        </div>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          Rebuild your Basement Talk app without Base44.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          This starter includes public podcast pages, a protected admin area,
          Firebase Google auth, Firestore-backed content, storage uploads,
          charts, theming, and Vercel-ready routing.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/episodes">
              <PlayCircle className="h-4 w-4" />
              Browse episodes
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/admin">
              <Mic2 className="h-4 w-4" />
              Open admin
            </Link>
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="grid gap-4 p-6">
          <div className="rounded-2xl bg-[linear-gradient(135deg,oklch(0.62_0.16_258),oklch(0.76_0.12_240))] p-6 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">
              Now live
            </p>
            <p className="mt-2 text-3xl font-bold">Podcast starter</p>
            <p className="mt-2 max-w-sm text-sm text-white/85">
              Public pages, clips gallery, episode management, uploads, and a
              clean dashboard.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-muted-foreground">Stack</p>
              <p className="mt-2 text-xl font-semibold">
                React + Vite + Firebase
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-muted-foreground">UI</p>
              <p className="mt-2 text-xl font-semibold">Tailwind v4 + Radix</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
