import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/incudorm/app-shell";
import { IdeaRow } from "@/components/incudorm/idea-row";
import { ideas, students } from "@/lib/incudorm-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your student profile — IncuDorm" },
      {
        name: "description",
        content:
          "Your IncuDorm profile: skills, past projects, the kind of team you want, and the ideas you've posted.",
      },
      { property: "og:title", content: "Your student profile — IncuDorm" },
      {
        property: "og:description",
        content: "Show your skills and past projects so the right co-founder finds you.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const me = students[0]!;
  const mine = ideas.filter((i) => i.mine);

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight text-foreground">Student profile</h1>

      <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-lg font-medium text-accent-foreground">
            {me.initials}
          </span>
          <span>
            <span className="block font-display text-xl text-foreground">{me.name}</span>
            <span className="block text-sm text-muted-foreground">{me.headline}</span>
          </span>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Skills</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {me.skills.map((s) => (
            <span
              key={s}
              className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Past projects</p>
        <p className="text-sm text-foreground">{me.pastProjects.join(", ")}</p>

        <p className="mt-4 text-sm text-muted-foreground">Looking for</p>
        <p className="text-sm text-foreground">{me.lookingFor}</p>
      </div>

      <h2 className="mt-9 font-display text-xl tracking-tight text-foreground">Ideas you posted</h2>
      <div className="mt-2 border-t border-border">
        {mine.map((idea) => (
          <IdeaRow key={idea.id} idea={idea} />
        ))}
      </div>
    </AppShell>
  );
}
