"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CreateProjectButtonProps {
  userId: string;
  userName: string;
}

export function CreateProjectButton({
  userId,
  userName,
}: CreateProjectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleCreateProject() {
    if (loading) {
      return;
    }

    setLoading(true);

    router.push(`/projects/create?talent=${userId}`);
  }

  return (
    <motion.button
      type="button"
      onClick={handleCreateProject}
      disabled={loading}
      whileTap={{ scale: 0.96 }}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-emerald-800
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-emerald-900
        hover:shadow-md
        hover:-translate-y-0.5
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <FolderPlus size={16} />

      {loading ? "Opening..." : "Create a project"}
    </motion.button>
  );
}