import type { Stage } from "@/lib/incudorm-data";

const styles: Record<Stage, string> = {
  Concept: "bg-secondary text-secondary-foreground",
  Prototype: "bg-secondary text-secondary-foreground",
  MVP: "bg-accent text-accent-foreground",
  Launched: "bg-success text-success-foreground",
};

export function StageTag({ stage }: { stage: Stage }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[stage]}`}
    >
      {stage}
    </span>
  );
}
