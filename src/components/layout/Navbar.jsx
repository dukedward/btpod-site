import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mic2, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../lib/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin } = useAuth();

  const links = [
    { label: "Home", path: "/Home" },
    // { label: "Episodes", path: "/Episodes" },
    { label: "YouTube", path: "/YouTubeEpisodes" },
    { label: "Clips", path: "/Clips" },
  ];

  if (isAdmin) {
    links.push({ label: "Admin", path: "/Admin" });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/Home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Mic2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              The
              <span className="text-primary"> Basement </span>
              Talk
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={
                    location.pathname === link.path ? "secondary" : "ghost"
                  }
                  size="sm"
                  className="text-sm font-medium"
                >
                  {link.label === "Admin" && (
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant={
                    location.pathname === link.path ? "secondary" : "ghost"
                  }
                  className="w-full justify-start text-sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
