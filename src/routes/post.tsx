import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/incudorm/app-shell";
import { MonoLabel, NoticeCard, PrimaryButton } from "@/components/incudorm/notice";
import { roleOptions } from "@/lib/incudorm-data";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Post an idea — IncuDorm" },
      {
        name: "description",
        content:
          "Share your student startup idea on IncuDorm: the problem, the stage, and the roles you need on the team.",
      },
      { property: "og:title", content: "Post an idea — IncuDorm" },
      {
        property: "og:description",
        content: "Describe the problem, pick a stage, and list the roles you're looking for.",
      },
    ],
  }),
  component: PostIdeaPage,
});

const underline =
  "w-full border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70";

function PostIdeaPage() {
  const [roles, setRoles] = useState<string[]>(["Designer"]);
  const [picking, setPicking] = useState(false);

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
        Post an idea
      </h1>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        two minutes — you can edit everything later
      </p>

      <NoticeCard className="mt-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Idea pinned to the board");
          }}
        >
          <MonoLabel>Title</MonoLabel>
          <div className="mb-4">
            <input className={underline} placeholder="Campus food-waste tracker" required />
          </div>

          <MonoLabel>Problem &amp; solution</MonoLabel>
          <div className="mb-4">
            <textarea
              rows={3}
              className={`${underline} resize-none`}
              placeholder="What problem does this solve, and how..."
              required
            />
          </div>

          <MonoLabel>Stage</MonoLabel>
          <select className={`${underline} mb-4`} defaultValue="Concept">
            <option>Concept</option>
            <option>Prototype</option>
            <option>MVP</option>
            <option>Launched</option>
          </select>

          <MonoLabel>Roles needed</MonoLabel>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {roles.map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 rounded border border-dashed border-pin bg-pin-soft px-2 py-1 font-mono text-[11px] text-foreground"
              >
                {role}
                <button
                  type="button"
                  aria-label={`Remove ${role}`}
                  onClick={() => setRoles((r) => r.filter((x) => x !== role))}
                >
                  <X className="size-3 text-muted-foreground" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setPicking((p) => !p)}
              className="flex items-center gap-1 rounded border border-dashed border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-3" /> add role
            </button>
          </div>
          {picking && (
            <div className="mb-4 flex flex-wrap gap-2">
              {roleOptions
                .filter((r) => !roles.includes(r))
                .map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRoles((prev) => [...prev, r]);
                      setPicking(false);
                    }}
                    className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {r}
                  </button>
                ))}
            </div>
          )}

          <div className="mt-4">
            <MonoLabel>Visibility</MonoLabel>
            <select className={`${underline} mb-5`} defaultValue="public">
              <option value="public">Public - anyone on IncuDorm</option>
              <option value="campus">My campus only</option>
              <option value="private">Private - team only</option>
            </select>
          </div>

          <PrimaryButton type="submit">Post idea</PrimaryButton>
        </form>
      </NoticeCard>
    </AppShell>
  );
}
