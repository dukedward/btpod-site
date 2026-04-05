import React from "react";
import { Trophy, Music, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const topics = [
  {
    icon: Trophy,
    title: "Sports",
    description:
      "From game day breakdowns to hot takes on trades and drafts — we cover it all.",
    gradient: "from-orange-500/10 to-orange-500/5",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
  {
    icon: Music,
    title: "Music",
    description:
      "New drops, album reviews, culture-shifting moments — if it's hitting, we're talking about it.",
    gradient: "from-pink-500/10 to-pink-500/5",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: Newspaper,
    title: "Current Events",
    description:
      "The stories shaping the world, broken down with real perspective and zero filter.",
    gradient: "from-blue-500/10 to-blue-500/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
];

export default function TopicsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          What We Talk About
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Three pillars, unlimited conversations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl bg-linear-to-br ${topic.gradient} border border-border/50 p-8`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${topic.iconBg} flex items-center justify-center mb-5`}
            >
              <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              {topic.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {topic.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
