"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { logout } from "@/app/actions/auth";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout();
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-line
        bg-white
        px-3
        py-1.5
        font-mono
        text-xs
        text-ink-muted
        transition
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <LogOut size={13} />
      {isPending ? "Logging out..." : "Log out"}
    </button>
  );
}