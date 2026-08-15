import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Trophy, Users } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import {
  DashedRule,
  MonoLabel,
  NoticeCard,
  PrimaryButton,
  RoleChip,
} from "@/components/incudorm/notice";
import { contests, teams } from "@/lib/incudorm-data";

export const Route = createFileRoute("/contests/$contestId/")({
  head: () => ({
    meta: [
      { title: "Contest details — IncuDorm" },
      {
        name: "description",
        content: "Tracks, prize, deadline and rules for this campus contest, plus team registration.",
      },
      { property: "og:title", content: "Contest details — IncuDorm" },
      {
        property: "og:description",
        content: "Everything your team needs before entering this campus contest.",
      },
    ],
  }),
  loader: ({ params }) => {
    const contest = contests.find((c) => c.id === params.contestId);
    if (!contest) throw notFound();
    return { contest };
  },
  component: ContestDetailPage,
});

function ContestDetailPage() {
  const { contest } = Route.useLoaderData();
  const entered = teams.filter((t) => t.contestId === contest.id);

  return (
    <AppShell>
      <Link
        to="/contests"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> all contests
      </Link>

      <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
        {contest.name}
      </h1>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
        hosted by {contest.host} · {contest.status.toLowerCase()}
      </p>

      <NoticeCard className="mt-4">
        <MonoLabel>Brief</MonoLabel>
        <p className="text-sm leading-relaxed text-foreground">{contest.blurb}</p>

        <DashedRule className="my-4" />
        <MonoLabel>Tracks</MonoLabel>
        <div className="flex flex-wrap gap-2">
          {contest.tracks.map((t) => (
            <RoleChip key={t}>{t}</RoleChip>
          ))}
        </div>

        <DashedRule className="my-4" />
        <div className="grid gap-2 font-mono text-[11px] text-muted-foreground sm:grid-cols-3">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden /> {contest.deadline}
          </span>
          <span className="flex items-center gap-1.5">
            <Trophy className="size-3.5 text-pin" aria-hidden /> {contest.prize}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden /> {contest.registered} teams
          </span>
        </div>
      </NoticeCard>

      {entered.length > 0 && (
        <div className="mt-4">
          <MonoLabel>Your teams eligible</MonoLabel>
          <div className="space-y-2">
            {entered.map((t) => (
              <Link
                key={t.id}
                to="/teams/$teamId/chat"
                params={{ teamId: t.id }}
                className="block rounded-[10px] border border-border bg-card px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.name} · {t.members.length} members
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <Link to="/contests/$contestId/register" params={{ contestId: contest.id }}>
          <PrimaryButton type="button">Register a team</PrimaryButton>
        </Link>
      </div>
    </AppShell>
  );
}
