import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/incudorm/app-shell";
import { IdeaRow } from "@/components/incudorm/idea-row";
import {
  DashedRule,
  MonoLabel,
  NoticeCard,
  PrimaryButton,
  RoleChip,
} from "@/components/incudorm/notice";
import { ideas, students } from "@/lib/incudorm-data";

export const Route = createFileRoute("/profile/$userId")({
  head: () => ({
    meta: [
      { title: "Student profile — IncuDorm" },
      {
        name: "description",
        content: "Skills, past projects and the kind of team this student is looking to join.",
      },
      { property: "og:title", content: "Student profile — IncuDorm" },
      { property: "og:description", content: "See what they can build before you reach out." },
    ],
  }),
  loader: ({ params }) => {
    const student = students.find((s) => s.id === params.userId);
    if (!student) throw notFound();
    return { student };
  },
  component: PublicProfilePage,
});

function PublicProfilePage() {
  const { student } = Route.useLoaderData();
  const theirIdeas = ideas.filter((i) => i.author === student.name);

  return (
    <AppShell>
      <Link
        to="/people"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> all students
      </Link>

      <NoticeCard className="mt-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded border border-border bg-secondary font-mono text-sm text-foreground">
            {student.initials}
          </span>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-foreground">
              {student.name}
            </h1>
            <p className="font-mono text-[11px] text-muted-foreground">{student.headline}</p>
          </div>
        </div>

        <DashedRule className="my-4" />
        <MonoLabel>Skills</MonoLabel>
        <div className="mb-4 flex flex-wrap gap-2">
          {student.skills.map((s) => (
            <RoleChip key={s}>{s}</RoleChip>
          ))}
        </div>

        <MonoLabel>Past projects</MonoLabel>
        <ul className="mb-4 space-y-1">
          {student.pastProjects.map((p) => (
            <li key={p} className="text-sm text-foreground">
              — {p}
            </li>
          ))}
        </ul>

        <MonoLabel>Looking for</MonoLabel>
        <p className="mb-4 text-sm text-foreground">{student.lookingFor}</p>

        <Link to="/messages">
          <PrimaryButton type="button">
            <MessageCircle className="size-4" aria-hidden /> Message {student.name.split(" ")[0]}
          </PrimaryButton>
        </Link>
      </NoticeCard>

      {theirIdeas.length > 0 && (
        <div className="mt-6">
          <MonoLabel>Ideas on the board</MonoLabel>
          <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)]">
            {theirIdeas.map((idea, i) => (
              <IdeaRow key={idea.id} idea={idea} isLast={i === theirIdeas.length - 1} />
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
