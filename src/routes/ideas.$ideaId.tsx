import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/$ideaId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/idea/$ideaId", params: { ideaId: params.ideaId } });
  },
});
