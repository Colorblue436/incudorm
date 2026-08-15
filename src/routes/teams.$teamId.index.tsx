import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/teams/$teamId/")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/teams/$teamId/chat", params: { teamId: params.teamId } });
  },
});
