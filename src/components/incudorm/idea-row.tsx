import { Link } from "@tanstack/react-router";
import { ArrowUp, MessageCircle, Pin } from "lucide-react";
import { useState } from "react";
import type { Idea } from "@/lib/incudorm-data";
import { DashedRule } from "./notice";
import { StageTag } from "./stage-tag";

export function IdeaRow({ idea, isLast }: { idea: Idea; isLast?: boolean }) {
  const [votes, setVotes] = useState(idea.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <article className={`relative px-4 py-4 ${isLast ? "" : "border-b border-border"}`}>
      {idea.pinned && (
        <Pin
          className="absolute left-3 top-1 size-3.5 rotate-45 fill-pin-soft text-pin"
          aria-hidden
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <Link
          to="/idea/$ideaId"
          params={{ ideaId: idea.id }}
          className="font-display text-[15px] font-semibold leading-snug text-foreground hover:underline hover:decoration-dashed"
        >
          {idea.title}
        </Link>
        <StageTag stage={idea.stage} />
      </div>

      <DashedRule className="my-2.5" />

      <p className="text-sm leading-relaxed text-foreground/80">{idea.pitch}</p>

      {idea.needs.length > 0 && (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          needs: {idea.needs.join(", ")}
        </p>
      )}

      <div className="mt-3 flex items-center gap-4 font-mono text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => {
            setVotes((v) => (voted ? v - 1 : v + 1));
            setVoted((v) => !v);
          }}
          aria-pressed={voted}
          className="flex items-center gap-1 transition-colors hover:text-foreground aria-pressed:text-pin"
        >
          <ArrowUp className="size-3.5" aria-hidden />
          {votes}
        </button>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3.5" aria-hidden />
          {idea.comments}
        </span>
        <span className="ml-auto">
          {idea.author} · {idea.campus}
        </span>
      </div>
    </article>
  );
}
