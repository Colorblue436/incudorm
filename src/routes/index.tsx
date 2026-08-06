import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/incudorm/app-shell";
import { IdeaRow } from "@/components/incudorm/idea-row";
import { ideas } from "@/lib/incudorm-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IncuDorm — Student ideas, co-founders and teams" },
      {
        name: "description",
        content:
          "IncuDorm is where students post startup ideas, show their skills and find co-founders or teammates on campus.",
      },
      { property: "og:title", content: "IncuDorm — Student ideas and co-founders" },
      {
        property: "og:description",
        content: "Post an idea, list the roles you need, and team up with students on your campus.",
      },
    ],
  }),
  component: IdeasPage,
});

const filters = ["All ideas", "Looking for team", "My domain"] as const;

function IdeasPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All ideas");

  const visible = ideas.filter((idea) => {
    if (active === "Looking for team") return idea.lookingForTeam;
    if (active === "My domain") return idea.campus === "VIT";
    return true;
  });

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight text-foreground">Ideas on campus</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Half-formed is fine. Say what you need and someone will raise a hand.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-2 border-t border-border">
        {visible.map((idea) => (
          <IdeaRow key={idea.id} idea={idea} />
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nothing here yet. Be the first to post.
          </p>
        )}
      </div>
    </AppShell>
  );
}
