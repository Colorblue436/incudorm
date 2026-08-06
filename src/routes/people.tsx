import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
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
      <h1 className="font-display text-3xl tracking-tight text-foreground">People</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Students looking for a team, sorted by who's active this week.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {students.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-accent font-medium text-accent-foreground">
                {s.initials}
              </span>
              <span>
                <span className="block font-display text-lg text-foreground">{s.name}</span>
                <span className="block text-sm text-muted-foreground">{s.headline}</span>
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">Skills</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {s.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">Past projects</p>
            <p className="text-sm text-foreground">{s.pastProjects.join(", ")}</p>

            <p className="mt-3 text-sm text-muted-foreground">Looking for</p>
            <p className="text-sm text-foreground">{s.lookingFor}</p>

            <Link
              to="/chat"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <MessageSquare className="size-4" aria-hidden /> Message
            </Link>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
