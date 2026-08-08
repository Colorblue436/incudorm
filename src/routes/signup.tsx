import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { AuthShell } from "@/components/incudorm/auth-shell";
import { FieldInput, MonoLabel, NoticeCard, PrimaryButton } from "@/components/incudorm/notice";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up with your college email — IncuDorm" },
      {
        name: "description",
        content:
          "Create an IncuDorm account with your college email to post ideas and find co-founders on campus.",
      },
      { property: "og:title", content: "Sign up — IncuDorm" },
      { property: "og:description", content: "Pin your first idea to the campus board." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell tagline="pin your first idea to the board">
      <NoticeCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/onboarding" });
          }}
        >
          <MonoLabel>Full name</MonoLabel>
          <FieldInput
            icon={User}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ananya Rao"
          />

          <MonoLabel>College email</MonoLabel>
          <FieldInput
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
          />
          <p className="-mt-3 mb-4 font-mono text-[11px] text-muted-foreground">
            .edu or verified student ID required
          </p>

          <MonoLabel>Password</MonoLabel>
          <FieldInput
            icon={Lock}
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />

          <PrimaryButton type="submit">
            Create account <ArrowRight className="size-4" aria-hidden />
          </PrimaryButton>
        </form>

        <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
          already on IncuDorm?{" "}
          <Link to="/login" className="text-foreground underline decoration-dashed">
            log in
          </Link>
        </p>
      </NoticeCard>
    </AuthShell>
  );
}
