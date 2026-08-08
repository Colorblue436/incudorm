import type { Stage } from "@/lib/incudorm-data";

const styles: Record<Stage, string> = {
  Concept: "text-muted-foreground",
  Prototype: "text-muted-foreground",
  MVP: "text-pin",
  Launched: "text-success",
};

const dots: Record<Stage, string> = {
  Concept: "bg-muted-foreground",
  Prototype: "bg-muted-foreground",
  MVP: "bg-pin",
  Launched: "bg-success",
};

export function StageTag({ stage }: { stage: Stage }) {
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] ${styles[stage]}`}
    >
      <span className={`size-1.5 rounded-full ${dots[stage]}`} aria-hidden />
      {stage.toUpperCase()}
    </span>
  );
}
