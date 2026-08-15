import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DashedRule, FieldInput, MonoLabel, NoticeCard, PrimaryButton } from "@/components/incudorm/notice";
import { teams, type Poll } from "@/lib/incudorm-data";

export const Route = createFileRoute("/teams/$teamId/polls")({
  head: () => ({
    meta: [
      { title: "Team polls — IncuDorm workspace" },
      {
        name: "description",
        content: "Settle team decisions fast with a quick poll instead of a long thread.",
      },
      { property: "og:title", content: "Team polls — IncuDorm workspace" },
      { property: "og:description", content: "Decide in one tap, not ten messages." },
    ],
  }),
  component: TeamPolls,
});

function TeamPolls() {
  const { teamId } = Route.useParams();
  const [polls, setPolls] = useState<Poll[]>(teams.find((t) => t.id === teamId)?.polls ?? []);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState("");

  const vote = (pollId: string, label: string) =>
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map((o) =>
                o.label === label ? { ...o, votes: o.votes + 1 } : o,
              ),
            }
          : p,
      ),
    );

  return (
    <div className="space-y-3">
      {polls.map((p) => {
        const total = p.options.reduce((n, o) => n + o.votes, 0) || 1;
        return (
          <NoticeCard key={p.id}>
            <p className="font-display text-[15px] font-semibold text-foreground">{p.question}</p>
            <div className="mt-3 space-y-2">
              {p.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => vote(p.id, o.label)}
                  className="relative w-full overflow-hidden rounded border border-border px-3 py-2 text-left font-mono text-[11px] text-foreground transition-colors hover:border-pin"
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-pin-soft"
                    style={{ width: `${(o.votes / total) * 100}%` }}
                    aria-hidden
                  />
                  <span className="relative flex justify-between">
                    <span>{o.label}</span>
                    <span className="text-muted-foreground">{o.votes}</span>
                  </span>
                </button>
              ))}
            </div>
          </NoticeCard>
        );
      })}

      <NoticeCard>
        <MonoLabel>New poll</MonoLabel>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const opts = choices
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            if (!question.trim() || opts.length < 2) return;
            setPolls((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                question: question.trim(),
                options: opts.map((label) => ({ label, votes: 0 })),
              },
            ]);
            setQuestion("");
            setChoices("");
          }}
        >
          <FieldInput
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What are we deciding?"
            aria-label="Poll question"
          />
          <FieldInput
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
            placeholder="Option A, Option B"
            aria-label="Poll options, comma separated"
          />
          <DashedRule className="mb-4" />
          <PrimaryButton type="submit">
            <Plus className="size-4" aria-hidden /> Create poll
          </PrimaryButton>
        </form>
      </NoticeCard>
    </div>
  );
}
