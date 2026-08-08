import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, MessageCircle, Pin } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/incudorm/app-shell";
import { DashedRule, MonoLabel, NoticeCard, PrimaryButton, RoleChip } from "@/components/incudorm/notice";
import { ideas } from "@/lib/incudorm-data";

export const Route = createFileRoute("/idea/$ideaId")({
  head: () => ({
    meta: [
      { title: "Idea details — IncuDorm" },
      {
        name: "description",
        content:
          "Read the full student idea on IncuDorm: the problem, the approach, the roles still open, and apply to join the team.",
      },
      { property: "og:title", content: "Idea details — IncuDorm" },
      {
        property: "og:description",
        content: "The problem, the idea, the open roles — and a one-tap way to join the team.",
      },
    ],
  }),
  loader: ({ params }) => {
    const idea = ideas.find((i) => i.id === params.ideaId);
    if (!idea) throw notFound();
    return { idea };
  },
  component: IdeaDetailPage,
});

const comments = [
  { author: "Rahul S.", body: "Love this — could plug into the mess's existing billing sheet." },
  { author: "Divya P.", body: "What hardware are you thinking for the scale?" },
];

function IdeaDetailPage() {
  const { idea } = Route.useLoaderData();
  const [applied, setApplied] = useState(false);

  return (
    <AppShell>
      <Link
        to="/"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> back to board
      </Link>

      <div className="relative mb-4 mt-4">
        <Pin className="absolute -top-1.5 left-0 size-4 rotate-45 fill-pin-soft text-pin" aria-hidden />
        <h1 className="pl-6 font-display text-xl font-bold tracking-tight text-foreground">
          {idea.title}
        </h1>
        <div className="mt-1 flex items-center gap-3 pl-6 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-pin">
            <span className="size-1.5 rounded-full bg-pin" aria-hidden />
            {idea.stage.toUpperCase()}
          </span>
          <span className="text-muted-foreground">
            posted by {idea.author} · {idea.campus}
          </span>
        </div>
      </div>

      <NoticeCard className="mb-3">
        <MonoLabel>The idea</MonoLabel>
        <p className="mb-4 text-sm leading-relaxed text-foreground">{idea.pitch}</p>

        {idea.needs.length > 0 && (
          <>
            <DashedRule className="my-4" />
            <MonoLabel>Roles open</MonoLabel>
            <div className="mb-4 flex flex-wrap gap-2">
              {idea.needs.map((r) => (
                <RoleChip key={r}>{r}</RoleChip>
              ))}
            </div>
          </>
        )}

        <div className="mb-5 flex gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ArrowUp className="size-3.5" aria-hidden /> {idea.upvotes} upvotes
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-3.5" aria-hidden /> {idea.comments} comments
          </span>
        </div>

        {applied ? (
          <p className="rounded-md border border-success py-2.5 text-center font-display text-sm font-semibold text-success">
            Application sent ✓
          </p>
        ) : (
          <PrimaryButton onClick={() => setApplied(true)}>Apply to join</PrimaryButton>
        )}
      </NoticeCard>

      <NoticeCard>
        <MonoLabel>Comments</MonoLabel>
        <div className="mt-2 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.author}>
              <p className="font-mono text-xs text-muted-foreground">{c.author}</p>
              <p className="text-sm text-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </NoticeCard>
    </AppShell>
  );
}
