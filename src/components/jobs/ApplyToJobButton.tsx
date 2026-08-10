"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyToJob } from "@/app/actions/job";

interface ApplyToJobButtonProps {
  jobId: string;
}

export function ApplyToJobButton({
  jobId,
}: ApplyToJobButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleApply() {
    setLoading(true);
    setError("");

    const result = await applyToJob(jobId);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleApply}
        disabled={loading}
        className="
          inline-flex
          items-center
          justify-center
          rounded-xl
          bg-emerald-800
          px-6
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
        {loading ? "Applying..." : "Apply to job"}
      </button>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}