"use client";

import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/app/actions/auth";

interface AdminNavProps {
  showBack?: boolean;
}

export function AdminNav({ showBack = true }: AdminNavProps) {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      {showBack ? (
        <Link
          href="/admin"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-ink-muted
            transition
            hover:text-emerald-700
          "
        >
          <ArrowLeft size={15} />
          Back to Admin
        </Link>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={handleLogout}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-line
          bg-white
          px-3.5
          py-2
          text-sm
          font-medium
          text-ink-muted
          transition
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <LogOut size={15} />
        Log out
      </button>
    </div>
  );
}