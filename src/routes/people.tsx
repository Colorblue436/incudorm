import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import { MonoLabel } from "@/components/incudorm/notice";
import { students } from "@/lib/incudorm-data";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "Find co-founders and teammates — IncuDorm" },
      {
        name: "description",
        content:
          "Browse student profiles on IncuDorm: skills, past projects and what kind of team each person is looking for.",
      },
      { property: "og:title", content: "Find co-founders and teammates — IncuDorm" },
      {
        property: "og:description",
        content: "Student profiles with skills, past projects and what they want to build next.",
      },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">People</h1>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        students looking for a team, sorted by who's active this week
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {students.map((s) => (
          <div
            key={s.id}
            className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary font-display font-semibold text-pin-soft">
                {s.initials}
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold text-foreground">{s.name}</span>
                <span className="block font-mono text-xs text-muted-foreground">{s.headline}</span>
              </span>
            </div>

            <div className="mt-4" />
            <MonoLabel>Skills</MonoLabel>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {s.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-secondary px-2.5 py-1 font-mono text-[11px] text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4" />
            <MonoLabel>Past projects</MonoLabel>
            <p className="text-sm text-foreground">{s.pastProjects.join(", ")}</p>

            <div className="mt-4" />
            <MonoLabel>Looking for</MonoLabel>
            <p className="text-sm text-foreground">{s.lookingFor}</p>

            <Link
              to="/chat"
              className="mt-4 flex items-center justify-center gap-2 rounded-md border border-foreground py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <MessageSquare className="size-4" aria-hidden /> Message
            </Link>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
