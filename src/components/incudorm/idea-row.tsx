import { ArrowUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import type { Idea } from "@/lib/incudorm-data";
import { StageTag } from "./stage-tag";

export function IdeaRow({ idea }: { idea: Idea }) {
  const [votes, setVotes] = useState(idea.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <article className="border-b border-border py-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg leading-snug text-foreground">{idea.title}</h3>
        <StageTag stage={idea.stage} />
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{idea.pitch}</p>
      {idea.needs.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-foreground/70">Needs:</span> {idea.needs.join(", ")}
        </p>
      )}
      <div className="mt-3 flex items-center gap-5 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => {
            setVotes((v) => (voted ? v - 1 : v + 1));
            setVoted((v) => !v);
          }}
          aria-pressed={voted}
          className="flex items-center gap-1.5 transition-colors hover:text-foreground aria-pressed:text-accent-foreground"
        >
          <ArrowUp className="size-4" aria-hidden />
          {votes}
        </button>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="size-4" aria-hidden />
          {idea.comments}
        </span>
        <span className="ml-auto text-xs">
          {idea.author} · {idea.campus}
        </span>
      </div>
    </article>
  );
}
