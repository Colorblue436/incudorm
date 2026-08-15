import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import { DashedRule, MonoLabel, NoticeCard } from "@/components/incudorm/notice";
import { contests } from "@/lib/incudorm-data";

export const Route = createFileRoute("/contests/")({
  head: () => ({
    meta: [
      { title: "Campus contests — IncuDorm" },
      {
        name: "description",
        content:
          "Hackathons, pitch days and build sprints hosted on campus. Register your IncuDorm team in a few taps.",
      },
      { property: "og:title", content: "Campus contests — IncuDorm" },
      {
        property: "og:description",
        content: "Find a contest, enter with your team, track the deadline.",
      },
    ],
  }),
  component: ContestsPage,
});

function ContestsPage() {
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Contests</h1>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        pinned to the board by campus incubators and clubs
      </p>

      <div className="mt-5 space-y-3">
        {contests.map((c) => (
          <NoticeCard key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  to="/contests/$contestId"
                  params={{ contestId: c.id }}
                  className="font-display text-base font-semibold text-foreground hover:underline"
                >
                  {c.name}
                </Link>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {c.host} · deadline {c.deadline}
                </p>
              </div>
              <span className="shrink-0 rounded border border-pin bg-pin-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-foreground">
                {c.status}
              </span>
            </div>

            <DashedRule className="my-3.5" />
            <p className="text-sm leading-relaxed text-foreground">{c.blurb}</p>

            <div className="mt-3.5 flex flex-wrap items-center gap-4 font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Trophy className="size-3.5 text-pin" aria-hidden /> {c.prize}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" aria-hidden /> {c.registered} teams in
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {c.tracks.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </NoticeCard>
        ))}
      </div>

      <div className="mt-6">
        <MonoLabel>Coordinator?</MonoLabel>
        <Link
          to="/coordinator/contests/$contestId"
          params={{ contestId: contests[0]!.id }}
          className="font-mono text-xs text-pin hover:underline"
        >
          open the read-only coordinator view →
        </Link>
      </div>
    </AppShell>
  );
}
