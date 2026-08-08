import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/incudorm/auth-shell";
import { FieldInput, MonoLabel, NoticeCard, PrimaryButton } from "@/components/incudorm/notice";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — IncuDorm" },
      {
        name: "description",
        content: "Log back in to your IncuDorm board to follow campus ideas and your team chats.",
      },
      { property: "og:title", content: "Log in — IncuDorm" },
      { property: "og:description", content: "Log back in to your campus idea board." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell tagline="log back in to your board">
      <NoticeCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Welcome back");
            navigate({ to: "/" });
          }}
        >
          <MonoLabel>College email</MonoLabel>
          <FieldInput
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
          />

          <MonoLabel>Password</MonoLabel>
          <FieldInput
            icon={Lock}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <div className="mb-5 flex justify-end">
            <button type="button" className="font-mono text-xs text-muted-foreground hover:text-foreground">
              forgot password?
            </button>
          </div>

          <PrimaryButton type="submit">
            Log in <ArrowRight className="size-4" aria-hidden />
          </PrimaryButton>
        </form>

        <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
          new here?{" "}
          <Link to="/signup" className="text-foreground underline decoration-dashed">
            create an account
          </Link>
        </p>
      </NoticeCard>
    </AuthShell>
  );
}
