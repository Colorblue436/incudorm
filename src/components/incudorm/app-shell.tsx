import { Link } from "@tanstack/react-router";
import { Lightbulb, Users, MessageCircle, PlusCircle, CircleUserRound } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Ideas", icon: Lightbulb },
  { to: "/people", label: "People", icon: Users },
  { to: "/post", label: "Post", icon: PlusCircle },
  { to: "/chat", label: "Chat", icon: MessageCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-xl tracking-tight text-foreground">
            IncuDorm
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <Link
            to="/profile"
            aria-label="Your profile"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <CircleUserRound className="size-7" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6 sm:pb-14">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-3xl">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground data-[status=active]:text-accent-foreground"
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
