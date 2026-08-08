import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./notice";

export function AuthShell({
  tagline,
  children,
}: {
  tagline: string;
  children: ReactNode;
}) {
  return (
    <div className="dot-grid flex min-h-screen flex-col items-center bg-background px-5 py-12">
      <Link to="/" aria-label="IncuDorm home">
        <Logo />
      </Link>
      <p className="mb-6 mt-1.5 font-mono text-xs text-muted-foreground">{tagline}</p>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
