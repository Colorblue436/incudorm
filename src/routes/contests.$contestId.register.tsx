import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/incudorm/app-shell";
import {
  ChipToggle,
  DashedRule,
  FieldInput,
  MonoLabel,
  NoticeCard,
  PrimaryButton,
} from "@/components/incudorm/notice";
import { contests, teams } from "@/lib/incudorm-data";

export const Route = createFileRoute("/contests/$contestId/register")({
  head: () => ({
    meta: [
      { title: "Register your team — IncuDorm contests" },
      {
        name: "description",
        content: "Pick a team, choose a track and submit your entry for this campus contest.",
      },
      { property: "og:title", content: "Register your team — IncuDorm" },
      {
        property: "og:description",
        content: "Team, track, one-line pitch — that's the whole entry form.",
      },
    ],
  }),
  loader: ({ params }) => {
    const contest = contests.find((c) => c.id === params.contestId);
    if (!contest) throw notFound();
    return { contest };
  },
  component: RegisterPage,
});

function RegisterPage() {
  const { contest } = Route.useLoaderData();
  const [teamId, setTeamId] = useState(teams[0]!.id);
  const [track, setTrack] = useState(contest.tracks[0]!);
  const [pitch, setPitch] = useState("");
  const [done, setDone] = useState(false);

  return (
    <AppShell>
      <Link
        to="/contests/$contestId"
        params={{ contestId: contest.id }}
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> back to contest
      </Link>

      <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
        Register for {contest.name}
      </h1>

      <NoticeCard className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            toast.success("Entry submitted — the host will confirm your slot.");
          }}
        >
          <MonoLabel>Team</MonoLabel>
          <div className="mb-4 flex flex-wrap gap-2">
            {teams.map((t) => (
              <ChipToggle
                key={t.id}
                label={t.name}
                active={t.id === teamId}
                onClick={() => setTeamId(t.id)}
              />
            ))}
          </div>

          <DashedRule className="my-4" />
          <MonoLabel>Track</MonoLabel>
          <div className="mb-4 flex flex-wrap gap-2">
            {contest.tracks.map((t) => (
              <ChipToggle key={t} label={t} active={t === track} onClick={() => setTrack(t)} />
            ))}
          </div>

          <DashedRule className="my-4" />
          <MonoLabel>One-line pitch</MonoLabel>
          <FieldInput
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="What will you demo on the day?"
            aria-label="One-line pitch"
          />

          {done ? (
            <p className="flex items-center gap-2 font-mono text-xs text-pin">
              <Check className="size-4" aria-hidden /> entry submitted for {track}
            </p>
          ) : (
            <PrimaryButton type="submit" disabled={!pitch.trim()}>
              Submit entry
            </PrimaryButton>
          )}
        </form>
      </NoticeCard>
    </AppShell>
  );
}
