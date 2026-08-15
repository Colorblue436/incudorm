import { createFileRoute } from "@tanstack/react-router";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashedRule, MonoLabel, NoticeCard } from "@/components/incudorm/notice";
import { teams, type TeamFile } from "@/lib/incudorm-data";

export const Route = createFileRoute("/teams/$teamId/files")({
  head: () => ({
    meta: [
      { title: "Team files — IncuDorm workspace" },
      {
        name: "description",
        content: "Wireframes, datasets and pitch decks your IncuDorm team is working from.",
      },
      { property: "og:title", content: "Team files — IncuDorm workspace" },
      { property: "og:description", content: "Everything the team shares, in one place." },
    ],
  }),
  component: TeamFiles,
});

function TeamFiles() {
  const { teamId } = Route.useParams();
  const [files, setFiles] = useState<TeamFile[]>(
    teams.find((t) => t.id === teamId)?.files ?? [],
  );

  return (
    <NoticeCard>
      <MonoLabel>Shared files</MonoLabel>
      <ul>
        {files.map((f, i) => (
          <li key={f.id}>
            <div className="flex items-start gap-3 py-3">
              <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-sm font-medium text-foreground">{f.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {f.size} · {f.by} · {f.when}
                </p>
              </div>
            </div>
            {i < files.length - 1 && <DashedRule />}
          </li>
        ))}
        {files.length === 0 && (
          <li className="py-6 text-center font-mono text-xs text-muted-foreground">
            nothing shared yet
          </li>
        )}
      </ul>

      <DashedRule className="my-4" />
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-pin bg-pin-soft py-3 font-mono text-[11px] text-foreground">
        <Upload className="size-3.5" aria-hidden />
        upload a file
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFiles((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                name: file.name,
                size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
                by: "You",
                when: "just now",
              },
            ]);
            toast.success("File shared with the team");
          }}
        />
      </label>
    </NoticeCard>
  );
}
