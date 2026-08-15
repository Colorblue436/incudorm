import { createFileRoute } from "@tanstack/react-router";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { NoticeCard } from "@/components/incudorm/notice";
import { threads, type Message } from "@/lib/incudorm-data";

export const Route = createFileRoute("/teams/$teamId/chat")({
  head: () => ({
    meta: [
      { title: "Team chat — IncuDorm workspace" },
      {
        name: "description",
        content: "The working channel for your IncuDorm team: decisions, updates and next steps.",
      },
      { property: "og:title", content: "Team chat — IncuDorm workspace" },
      { property: "og:description", content: "One channel per team, no noise." },
    ],
  }),
  component: TeamChat,
});

function TeamChat() {
  const { teamId } = Route.useParams();
  const seed = threads.find((t) => t.id === teamId)?.messages ?? [
    { id: "1", author: "Rahul", body: "Kicking this channel off — what's blocking?" },
  ];
  const [messages, setMessages] = useState<Message[]>(seed);
  const [draft, setDraft] = useState("");

  return (
    <NoticeCard className="p-0">
      <div className="space-y-3 px-5 py-5">
        {messages.map((m) => (
          <div key={m.id} className={m.me ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[80%] rounded-lg px-3.5 py-2 text-sm ${
                m.me ? "bg-pin-soft text-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {!m.me && (
                <span className="block font-mono text-[10px] text-muted-foreground">{m.author}</span>
              )}
              {m.body}
            </div>
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-dashed border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          const body = draft.trim();
          if (!body) return;
          setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), author: "You", body, me: true },
          ]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          aria-label="Message the team"
          placeholder="Message the team"
          className="flex-1 border-b border-border bg-transparent px-1 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-pin"
        />
        <button
          type="submit"
          aria-label="Send"
          className="rounded border border-border p-2 text-foreground transition-colors hover:bg-secondary"
        >
          <SendHorizonal className="size-4" />
        </button>
      </form>
    </NoticeCard>
  );
}
