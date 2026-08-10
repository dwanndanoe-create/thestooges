"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  acceptProjectInvitation,
  declineProjectInvitation,
} from "@/app/actions/project";

interface ProjectInvitationActionsProps {
  projectId: string;
}

export function ProjectInvitationActions({
  projectId,
}: ProjectInvitationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"accept" | "decline" | null>(null);
  const [error, setError] = useState("");

  async function handleAccept() {
    setLoading("accept");
    setError("");

    const result = await acceptProjectInvitation(projectId);

    if (!result.success) {
      setError(result.error);
      setLoading(null);
      return;
    }

    router.refresh();
  }

  async function handleDecline() {
    setLoading("decline");
    setError("");

    const result = await declineProjectInvitation(projectId);

    if (!result.success) {
      setError(result.error);
      setLoading(null);
      return;
    }

    router.refresh();
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAccept}
          disabled={loading !== null}
          className="
            rounded-xl
            bg-emerald-800
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-emerald-900
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading === "accept" ? "Accepting..." : "Accept invitation"}
        </button>

        <button
          type="button"
          onClick={handleDecline}
          disabled={loading !== null}
          className="
            rounded-xl
            border
            border-line-strong
            bg-white
            px-5
            py-3
            text-sm
            font-medium
            text-ink-muted
            transition
            hover:border-red-300
            hover:text-red-600
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading === "decline" ? "Declining..." : "Decline"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </>
  );
}