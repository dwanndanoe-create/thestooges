"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { getOrCreateConversation } from "@/app/actions/messages";

interface MessageButtonProps {
  userId: string;
  userName: string;
}

export function MessageButton({
  userId,
  userName,
}: MessageButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMessage() {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const result = await getOrCreateConversation(userId);

      if (!result.success) {
        alert(result.error);
        return;
      }

      router.push(`/messages/${result.conversationId}`);
    } catch (error) {
      console.error("Failed to open conversation:", error);
      alert(`Unable to message ${userName} right now.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleMessage}
      disabled={loading}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        h-11
        rounded-xl
        bg-emerald-800
        px-5
        text-sm
        font-medium
        text-white
        shadow-sm
        hover:bg-emerald-900
        hover:-translate-y-0.5
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-all
      "
    >
      <MessageCircle size={17} />

      {loading ? "Opening..." : `Message ${userName}`}
    </button>
  );
}