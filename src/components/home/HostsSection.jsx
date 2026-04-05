import React from "react";
import { motion } from "framer-motion";

const hosts = [
  {
    name: "TD",
    role: "Co-Host",
    image: "/cast/td.jpg",
    color: "from-orange-500/20 to-transparent",
  },
  {
    name: "ED",
    role: "Co-Host",
    image: "/cast/ed.jpg",
    color: "from-pink-500/20 to-transparent",
  },
  {
    name: "Teddy",
    role: "Co-Host",
    image: "/cast/teddy.jpg",
    color: "from-blue-500/20 to-transparent",
  },
  {
    name: "Murk",
    role: "Co-Host",
    image: "/cast/murk.jpg",
    color: "from-emerald-500/20 to-transparent",
  },
];

export default function HostsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Meet the Hosts
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Four unique voices, one unfiltered conversation.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {hosts.map((host, i) => (
          <motion.div
            key={host.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="aspect-3/4 rounded-2xl overflow-hidden bg-secondary border border-border/50">
              <img
                src={host.image}
                alt={host.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-linear-to-t ${host.color}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display font-bold text-lg text-foreground">
                  {host.name}
                </h3>
                <p className="text-sm text-muted-foreground">{host.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
