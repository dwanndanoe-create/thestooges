"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { sendMessage } from "@/app/actions/messages";

interface MessageComposerProps {
  conversationId: string;
}

export function MessageComposer({
  conversationId,
}: MessageComposerProps) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = content.trim();

    if (!trimmed || sending) {
      return;
    }

    setSending(true);

    try {
      const result = await sendMessage(conversationId, trimmed);

      if (result.success) {
        setContent("");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3"
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write a message..."
        rows={2}
        disabled={sending}
        className="
          min-h-[52px]
          max-h-32
          flex-1
          resize-none
          rounded-xl
          border
          border-line
          bg-bg-sunken
          px-4
          py-3
          text-sm
          text-ink
          outline-none
          placeholder:text-ink-faint
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-50
          disabled:opacity-60
          transition
        "
      />

      <button
        type="submit"
        disabled={!content.trim() || sending}
        className="
          h-[52px]
          w-[52px]
          shrink-0
          rounded-xl
          bg-emerald-800
          text-white
          grid
          place-items-center
          hover:bg-emerald-900
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition
        "
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}