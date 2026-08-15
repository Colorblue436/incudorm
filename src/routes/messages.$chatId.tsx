import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/incudorm/app-shell";
import { NoticeCard } from "@/components/incudorm/notice";
import { threads, type Message } from "@/lib/incudorm-data";

export const Route = createFileRoute("/messages/$chatId")({
  head: () => ({
    meta: [
      { title: "Conversation — IncuDorm messages" },
      {
        name: "description",
        content: "A one-to-one or team conversation about an idea you're building together.",
      },
      { property: "og:title", content: "Conversation — IncuDorm messages" },
      { property: "og:description", content: "Talk it through, then go build." },
    ],
  }),
  loader: ({ params }) => {
    const thread = threads.find((t) => t.id === params.chatId);
    if (!thread) throw notFound();
    return { thread };
  },
  component: ChatDetailPage,
});

function ChatDetailPage() {
  const { thread } = Route.useLoaderData();
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [draft, setDraft] = useState("");

  return (
    <AppShell>
      <Link
        to="/messages"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> inbox
      </Link>

      <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
        {thread.name}
      </h1>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{thread.members} members</p>

      <NoticeCard className="mt-4 p-0">
        <div className="space-y-3 px-5 py-5">
          {messages.map((m) => (
            <div key={m.id} className={m.me ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2 text-sm ${
                  m.me ? "bg-pin-soft text-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {!m.me && (
                  <span className="block font-mono text-[10px] text-muted-foreground">
                    {m.author}
                  </span>
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
            aria-label="Write a message"
            placeholder="Write a message"
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
    </AppShell>
  );
}
