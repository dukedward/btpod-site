import { Link, NavLink } from "react-router-dom";
import LoginButton from "@/components/auth/LoginButton";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/episodes", label: "Episodes" },
  { to: "/clips", label: "Clips" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[color:color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Basement Talk Podcast
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn("text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]", isActive && "text-[var(--foreground)]")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
