import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/incudorm/auth-shell";
import { ChipToggle, MonoLabel, NoticeCard, PrimaryButton } from "@/components/incudorm/notice";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your student profile — IncuDorm" },
      {
        name: "description",
        content:
          "Pick the skills and interests teams will see on your IncuDorm profile, then start browsing campus ideas.",
      },
      { property: "og:title", content: "Set up your profile — IncuDorm" },
      { property: "og:description", content: "Pick your skills and interests — this is what teams see." },
    ],
  }),
  component: OnboardingPage,
});

const ALL_SKILLS = [
  "React",
  "Figma",
  "Product design",
  "Python",
  "Marketing",
  "iOS",
  "Data analysis",
  "Writing",
  "Sales",
];
const ALL_INTERESTS = ["EdTech", "Climate", "Fintech", "Health", "Campus life", "Social"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(["Figma"]);
  const [interests, setInterests] = useState<string[]>(["Campus life"]);

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    item: string,
  ) => (list.includes(item) ? setList(list.filter((i) => i !== item)) : setList([...list, item]));

  return (
    <AuthShell tagline="step 2 of 2 — this is what teams see about you">
      <h1 className="mb-3 font-display text-[15px] font-semibold text-foreground">
        Set up your profile
      </h1>
      <NoticeCard>
        <MonoLabel>Your skills</MonoLabel>
        <div className="mb-5 flex flex-wrap gap-2">
          {ALL_SKILLS.map((s) => (
            <ChipToggle
              key={s}
              label={s}
              active={skills.includes(s)}
              onClick={() => toggle(skills, setSkills, s)}
            />
          ))}
        </div>

        <MonoLabel>Interested in</MonoLabel>
        <div className="mb-6 flex flex-wrap gap-2">
          {ALL_INTERESTS.map((s) => (
            <ChipToggle
              key={s}
              label={s}
              active={interests.includes(s)}
              onClick={() => toggle(interests, setInterests, s)}
            />
          ))}
        </div>

        <PrimaryButton
          onClick={() => {
            toast.success("Profile saved");
            navigate({ to: "/" });
          }}
        >
          Finish setup <ArrowRight className="size-4" aria-hidden />
        </PrimaryButton>
      </NoticeCard>
    </AuthShell>
  );
}
