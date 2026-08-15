import { createFileRoute } from "@tanstack/react-router";
import { GitBranch, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  DashedRule,
  FieldInput,
  MonoLabel,
  NoticeCard,
  PrimaryButton,
} from "@/components/incudorm/notice";
import { teams } from "@/lib/incudorm-data";

export const Route = createFileRoute("/teams/$teamId/github")({
  head: () => ({
    meta: [
      { title: "GitHub link — IncuDorm workspace" },
      {
        name: "description",
        content: "Link your team repository so everyone knows where the code lives.",
      },
      { property: "og:title", content: "GitHub link — IncuDorm workspace" },
      { property: "og:description", content: "One repo, one branch, no guessing." },
    ],
  }),
  component: TeamGithub,
});

function TeamGithub() {
  const { teamId } = Route.useParams();
  const team = teams.find((t) => t.id === teamId);
  const [repo, setRepo] = useState(team?.repo ?? "");
  const [branch, setBranch] = useState(team?.repoBranch ?? "main");

  return (
    <NoticeCard>
      <MonoLabel>Linked repository</MonoLabel>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Github className="size-4 text-muted-foreground" aria-hidden />
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          {repo || "not linked yet"}
        </a>
      </div>
      <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
        <GitBranch className="size-3.5" aria-hidden /> default branch: {branch}
      </p>

      <DashedRule className="my-4" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Repository link updated");
        }}
      >
        <MonoLabel>owner/repo</MonoLabel>
        <FieldInput
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="ananya-r/foodwaste-tracker"
          aria-label="Repository"
        />
        <MonoLabel>Branch</MonoLabel>
        <FieldInput
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="main"
          aria-label="Branch"
        />
        <PrimaryButton type="submit">Save repo link</PrimaryButton>
      </form>
    </NoticeCard>
  );
}
