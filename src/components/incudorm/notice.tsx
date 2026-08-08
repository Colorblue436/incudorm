import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function MonoLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
      {children}
    </p>
  );
}

export function NoticeCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="size-2 rounded-full bg-pin" aria-hidden />
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        IncuDorm
      </span>
    </span>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={`flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function ChipToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
        active
          ? "border-pin bg-pin-soft text-foreground"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {active && <Check className="size-3" aria-hidden />}
      {label}
    </button>
  );
}

export function RoleChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-dashed border-pin bg-pin-soft px-2 py-1 font-mono text-[11px] text-foreground">
      {children}
    </span>
  );
}

export function FieldInput({
  icon: Icon,
  ...props
}: ComponentPropsWithoutRef<"input"> & { icon?: React.ElementType }) {
  return (
    <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
      {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
      <input
        {...props}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
      />
    </div>
  );
}

export function DashedRule({ className = "" }: { className?: string }) {
  return <div className={`border-t border-dashed border-border ${className}`} />;
}
