import { Link } from "@tanstack/react-router";
import { Home, Users, MessageCircle, FilePlus, Trophy, UserCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./notice";

const nav = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/people", label: "People", icon: Users },
  { to: "/post", label: "Post idea", icon: FilePlus },
  { to: "/contests", label: "Contests", icon: Trophy },
  { to: "/messages", label: "Messages", icon: MessageCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="dot-grid min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link to="/" aria-label="IncuDorm home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-1.5 rounded border border-transparent px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:border-pin data-[status=active]:bg-pin-soft data-[status=active]:text-foreground"
              >
                <Icon className="size-3.5" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <Link
            to="/profile"
            aria-label="Your profile"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <UserCircle className="size-6" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6 sm:pb-14">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-3xl">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 font-mono text-[10px] text-muted-foreground data-[status=active]:text-pin"
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
