import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/incudorm/app-shell";
import { IdeaRow } from "@/components/incudorm/idea-row";
import { PrimaryButton } from "@/components/incudorm/notice";
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
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
        Ideas on campus
      </h1>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        half-formed is fine — say what you need and someone will raise a hand
      </p>

      <div className="mt-5 overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2.5">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className="whitespace-nowrap rounded border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-pin aria-pressed:bg-pin-soft aria-pressed:text-foreground"
            >
              {f}
            </button>
          ))}
        </div>

        {visible.map((idea, i) => (
          <IdeaRow key={idea.id} idea={idea} isLast={i === visible.length - 1} />
        ))}

        {visible.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Inbox className="mx-auto size-6 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-display text-[15px] font-semibold text-foreground">
              Nothing pinned here yet
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              be the first to put an idea on the board
            </p>
            <div className="mx-auto mt-4 max-w-[200px]">
              <Link to="/post">
                <PrimaryButton type="button">Post an idea</PrimaryButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
