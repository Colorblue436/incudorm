import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/incudorm/app-shell";
import { IdeaRow } from "@/components/incudorm/idea-row";
import { MonoLabel } from "@/components/incudorm/notice";
import { ideas, students } from "@/lib/incudorm-data";

export const Route = createFileRoute("/profile/")({
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
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Student profile</h1>

      <div className="mt-5 rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-pin-soft">
            {me.initials}
          </span>
          <span>
            <span className="block font-display text-lg font-semibold text-foreground">{me.name}</span>
            <span className="block font-mono text-xs text-muted-foreground">{me.headline}</span>
          </span>
        </div>

        <div className="mt-5" />
        <MonoLabel>Skills</MonoLabel>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {me.skills.map((s) => (
            <span
              key={s}
              className="rounded bg-secondary px-2.5 py-1 font-mono text-[11px] text-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5" />
        <MonoLabel>Past projects</MonoLabel>
        <p className="text-sm text-foreground">{me.pastProjects.join(", ")}</p>

        <div className="mt-4" />
        <MonoLabel>Looking for</MonoLabel>
        <p className="text-sm text-foreground">{me.lookingFor}</p>
      </div>

      <h2 className="mt-9 font-display text-lg font-semibold tracking-tight text-foreground">
        Ideas you posted
      </h2>
      <div className="mt-2 overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)]">
        {mine.map((idea, i) => (
          <IdeaRow key={idea.id} idea={idea} isLast={i === mine.length - 1} />
        ))}
      </div>

      <Link
        to="/login"
        className="mt-6 inline-block font-mono text-xs text-muted-foreground underline decoration-dashed hover:text-foreground"
      >
        log out
      </Link>
    </AppShell>
  );
}
