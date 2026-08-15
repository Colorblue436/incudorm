import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eye, Users } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import { DashedRule, MonoLabel, NoticeCard } from "@/components/incudorm/notice";
import { contests, ideas, teams } from "@/lib/incudorm-data";

export const Route = createFileRoute("/coordinator/contests/$contestId")({
  head: () => ({
    meta: [
      { title: "Coordinator view — IncuDorm contest" },
      {
        name: "description",
        content:
          "Read-only coordinator view of a campus contest: registered teams, members and their ideas.",
      },
      { property: "og:title", content: "Coordinator view — IncuDorm contest" },
      { property: "og:description", content: "Who's entered, who's on each team, what they're building." },
    ],
  }),
  loader: ({ params }) => {
    const contest = contests.find((c) => c.id === params.contestId);
    if (!contest) throw notFound();
    return { contest };
  },
  component: CoordinatorContestPage,
});

function CoordinatorContestPage() {
  const { contest } = Route.useLoaderData();
  const entered = teams.filter((t) => t.contestId === contest.id);

  return (
    <AppShell>
      <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-pin">
        <Eye className="size-3.5" aria-hidden /> coordinator · read only
      </p>
      <h1 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
        {contest.name}
      </h1>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
        {contest.host} · deadline {contest.deadline} · {contest.registered} registrations
      </p>

      <div className="mt-4 space-y-3">
        {entered.map((team) => {
          const idea = ideas.find((i) => i.id === team.idea);
          return (
            <NoticeCard key={team.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-[15px] font-semibold text-foreground">{team.name}</p>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <Users className="size-3.5" aria-hidden /> {team.members.length}
                </span>
              </div>

              <DashedRule className="my-3" />
              <MonoLabel>Members</MonoLabel>
              <ul className="mb-3 space-y-1">
                {team.members.map((m) => (
                  <li key={m.name} className="font-mono text-[11px] text-muted-foreground">
                    {m.name} — {m.role}
                  </li>
                ))}
              </ul>

              {idea && (
                <>
                  <MonoLabel>Idea</MonoLabel>
                  <Link
                    to="/idea/$ideaId"
                    params={{ ideaId: idea.id }}
                    className="text-sm text-foreground hover:underline"
                  >
                    {idea.title}
                  </Link>
                </>
              )}
            </NoticeCard>
          );
        })}

        {entered.length === 0 && (
          <NoticeCard>
            <p className="py-6 text-center font-mono text-xs text-muted-foreground">
              no teams registered yet
            </p>
          </NoticeCard>
        )}
      </div>
    </AppShell>
  );
}
