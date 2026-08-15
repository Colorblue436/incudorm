import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/incudorm/app-shell";
import { DashedRule, NoticeCard } from "@/components/incudorm/notice";
import { threads } from "@/lib/incudorm-data";

export const Route = createFileRoute("/messages/")({
  head: () => ({
    meta: [
      { title: "Messages — IncuDorm" },
      {
        name: "description",
        content: "Direct messages and team channels with the students you're building with.",
      },
      { property: "og:title", content: "Messages — IncuDorm" },
      { property: "og:description", content: "DMs and team channels in one inbox." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Messages</h1>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        dms and team channels, newest first
      </p>

      <NoticeCard className="mt-5 p-0">
        {threads.map((t, i) => {
          const last = t.messages[t.messages.length - 1];
          return (
            <div key={t.id}>
              <Link
                to="/messages/$chatId"
                params={{ chatId: t.id }}
                className="block px-5 py-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-[15px] font-semibold text-foreground">{t.name}</p>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {t.members} members
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {last ? `${last.author}: ${last.body}` : "No messages yet"}
                </p>
              </Link>
              {i < threads.length - 1 && <DashedRule />}
            </div>
          );
        })}
      </NoticeCard>
    </AppShell>
  );
}
