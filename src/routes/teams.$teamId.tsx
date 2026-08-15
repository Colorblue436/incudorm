import { createFileRoute, Link, Outlet, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import { teams } from "@/lib/incudorm-data";

export const Route = createFileRoute("/teams/$teamId")({
  loader: ({ params }) => {
    const team = teams.find((t) => t.id === params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  component: TeamWorkspaceLayout;
});

const tabs = [
  { to: "/teams/$teamId/chat", label: "chat" },
  { to: "/teams/$teamId/files", label: "files" },
  { to: "/teams/$teamId/github", label: "github" },
  { to: "/teams/$teamId/polls", label: "polls" },
] as const;

function TeamWorkspaceLayout() {
  const { team } = Route.useLoaderData();

  return (
    <AppShell>
      <Link
        to="/profile"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> your teams
      </Link>

      <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
        {team.name} workspace
      </h1>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
        {team.members.map((m) => m.name).join(" · ")}
      </p>

      <div className="mt-4 flex gap-1 overflow-x-auto border-b border-dashed border-border pb-2">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            params={{ teamId: team.id }}
            className="rounded border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:border-pin data-[status=active]:bg-pin-soft data-[status=active]:text-foreground"
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </AppShell>
  );
}
