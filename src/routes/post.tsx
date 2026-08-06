import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/incudorm/app-shell";
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

const label = "block text-sm text-muted-foreground";
const field =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring";

function PostIdeaPage() {
  const [roles, setRoles] = useState<string[]>(["Designer"]);
  const [picking, setPicking] = useState(false);

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight text-foreground">Post an idea</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Two minutes. You can edit everything later.
      </p>

      <form
        className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Idea posted to your campus feed");
        }}
      >
        <div>
          <label className={label} htmlFor="title">
            Title
          </label>
          <input id="title" className={field} placeholder="Campus food-waste tracker" required />
        </div>

        <div>
          <label className={label} htmlFor="pitch">
            Problem &amp; solution
          </label>
          <textarea
            id="pitch"
            rows={4}
            className={`${field} resize-y`}
            placeholder="What problem does this solve..."
            required
          />
        </div>

        <div>
          <label className={label} htmlFor="stage">
            Stage
          </label>
          <select id="stage" className={field} defaultValue="Concept">
            <option>Concept</option>
            <option>Prototype</option>
            <option>MVP</option>
            <option>Launched</option>
          </select>
        </div>

        <div>
          <span className={label}>Roles needed</span>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {roles.map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
              >
                {role}
                <button
                  type="button"
                  aria-label={`Remove ${role}`}
                  onClick={() => setRoles((r) => r.filter((x) => x !== role))}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setPicking((p) => !p)}
              className="flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-3.5" /> Add role
            </button>
          </div>
          {picking && (
            <div className="mt-2 flex flex-wrap gap-2">
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
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {r}
                  </button>
                ))}
            </div>
          )}
        </div>

        <div>
          <label className={label} htmlFor="visibility">
            Visibility
          </label>
          <select id="visibility" className={field} defaultValue="public">
            <option value="public">Public - anyone on IncuDorm</option>
            <option value="campus">My campus only</option>
            <option value="private">Private - invite link</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border border-border bg-background py-2.5 text-base text-foreground transition-colors hover:bg-secondary"
        >
          Post idea
        </button>
      </form>
    </AppShell>
  );
}
