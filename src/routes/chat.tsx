import { createFileRoute } from "@tanstack/react-router";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/incudorm/app-shell";
import { threads, type Message } from "@/lib/incudorm-data";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Team chat — IncuDorm" },
      {
        name: "description",
        content:
          "Talk to your IncuDorm team or a student you want to build with, in one lightweight chat.",
      },
      { property: "og:title", content: "Team chat — IncuDorm" },
      {
        property: "og:description",
        content: "Lightweight chat for student teams forming around an idea.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [activeId, setActiveId] = useState(threads[0].id);
  const [log, setLog] = useState<Record<string, Message[]>>(
    Object.fromEntries(threads.map((t) => [t.id, t.messages])),
  );
  const [draft, setDraft] = useState("");

  const thread = threads.find((t) => t.id === activeId)!;
  const messages = log[activeId];

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight text-foreground">Team chat</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveId(t.id)}
            aria-pressed={t.id === activeId}
            className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border px-5 py-4">
          <p className="font-display text-lg text-foreground">{thread.name}</p>
          <p className="text-sm text-muted-foreground">{thread.members} members</p>
        </div>

        <div className="space-y-3 px-5 py-5">
          {messages.map((m) => (
            <div key={m.id} className={m.me ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.me
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {!m.me && <span className="block text-xs text-muted-foreground">{m.author}</span>}
                {m.body}
              </div>
            </div>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            const body = draft.trim();
            if (!body) return;
            setLog((prev) => ({
              ...prev,
              [activeId]: [
                ...prev[activeId],
                { id: crypto.randomUUID(), author: "You", body, me: true },
              ],
            }));
            setDraft("");
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Message the team"
            placeholder="Message the team"
            className="flex-1 rounded-lg border border-input bg-background px-3.5 py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-ring"
          />
          <button
            type="submit"
            aria-label="Send"
            className="rounded-lg border border-border p-2.5 text-foreground transition-colors hover:bg-secondary"
          >
            <SendHorizonal className="size-5" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
