"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";

type ProfileEditProps = {
  initialName: string;
  initialLocation: string | null;
  initialBio: string | null;
  initialSkills: string[];
  email: string;
};

/** Small inline hummingbird — no external assets, uses emerald palette + warm throat accent. */
function Hummingbird({ reduceMotion }: { reduceMotion: boolean }) {
  const wingVariants = reduceMotion
    ? {}
    : {
        animate: {
          rotate: [0, -18, 0, -14, 0],
          transition: {
            duration: 0.9,
            repeat: 2,
            ease: "easeInOut" as const,
          },
        },
      };

  const bodyVariants = reduceMotion
    ? {}
    : {
        animate: {
          y: [0, -2, 0, -1.5, 0],
          transition: {
            duration: 1.8,
            repeat: 1,
            ease: "easeInOut" as const,
          },
        },
      };

  return (
    <motion.svg
      viewBox="0 0 64 48"
      width={34}
      height={26}
      aria-hidden="true"
      {...bodyVariants}
    >
      {/* tail */}
      <path
        d="M6 26c-3 1-5 3-6 6 4 0 7-1 9-3z"
        fill="#047857"
      />
      {/* body */}
      <path
        d="M10 24c0-8 8-14 18-14 8 0 14 4 17 9 2-1 5-1 7 1-2 1-4 1-6 1 1 3 0 6-2 8-3 4-9 6-15 6-11 0-19-5-19-11z"
        fill="#059669"
      />
      {/* throat accent (warm) */}
      <path
        d="M14 25c2 3 6 5 10 5-2-3-3-6-3-9-4 0-6 2-7 4z"
        fill="#f59e0b"
      />
      {/* beak */}
      <path
        d="M46 20c4-1 8-1 11 0-3 2-7 2-11 1z"
        fill="#065f46"
      />
      {/* eye */}
      <circle cx="34" cy="20" r="1.4" fill="#052e2b" />
      {/* wing */}
      <motion.path
        d="M20 20c-2-8 4-15 12-16-1 7-2 13-6 17-2 2-4 1-6-1z"
        fill="#10b981"
        style={{ transformOrigin: "22px 18px" }}
        {...wingVariants}
      />
    </motion.svg>
  );
}

export function ProfileEditForm({
  initialName,
  initialLocation,
  initialBio,
  initialSkills,
  email,
}: ProfileEditProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation ?? "");
  const [bio, setBio] = useState(initialBio ?? "");
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;

    const timer = setTimeout(() => {
      setSaved(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [saved]);

  function addSkill() {
    const skill = newSkill.trim();

    if (!skill) return;

    if (
      skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setNewSkill("");
      return;
    }

    if (skills.length >= 10) {
      setError("You can add up to 10 skills.");
      return;
    }

    setSkills([...skills, skill]);
    setNewSkill("");
    setError(undefined);
    setSaved(false);
  }

  function removeSkill(skillToRemove: string) {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    setSaved(false);
  }

  function handleSkillKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError(undefined);
    setSaved(false);
    setSubmitting(true);

    const result = await updateProfile(name, location, bio, skills);

    if (!result.success) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSaved(true);

    router.refresh();
  }

  const chipTransition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 500, damping: 32 };

  return (
    <>
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, height: "auto" }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, height: 0 }
            }
            transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: "easeOut" }}
            className="
              mb-6
              overflow-hidden
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.1,
                  type: reduceMotion ? "tween" : "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="flex-shrink-0"
              >
                <Hummingbird reduceMotion={!!reduceMotion} />
              </motion.div>

              <span className="text-sm font-medium text-ink">
                Changes saved
              </span>

              <button
                type="button"
                onClick={() => setSaved(false)}
                className="
                  ml-auto
                  text-ink-faint
                  hover:text-ink
                  transition
                "
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputField
          label="Full name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          placeholder="Your name"
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={email}
          disabled
        />

        <InputField
          label="Location"
          name="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setSaved(false);
          }}
          placeholder="Paramaribo, Suriname"
        />

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              setSaved(false);
            }}
            placeholder="Tell people a little about yourself..."
            maxLength={500}
            rows={5}
            className="
              w-full
              rounded-xl
              border
              border-line-strong
              bg-white
              px-4
              py-3
              text-sm
              text-ink
              outline-none
              transition
              focus:border-emerald-600
              resize-none
            "
          />

          <p className="text-xs text-ink-faint mt-2 text-right">
            {bio.length}/500
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Skills
          </label>

          <motion.div layout className="flex flex-wrap gap-2 mb-3">
            <AnimatePresence initial={false}>
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  layout
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.7, y: 4 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.7, y: -4 }
                  }
                  transition={chipTransition}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-emerald-800
                  "
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-600 transition"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={13} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill"
              className="
                flex-1
                h-11
                rounded-xl
                border
                border-line-strong
                bg-white
                px-4
                text-sm
                text-ink
                outline-none
                focus:border-emerald-600
              "
            />

            <motion.button
              type="button"
              onClick={addSkill}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              className="
                h-11
                rounded-xl
                border
                border-line-strong
                px-4
                text-sm
                font-medium
                text-ink
                hover:bg-bg-sunken
                transition
              "
            >
              Add
            </motion.button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-ink-muted
              hover:text-ink
            "
          >
            <ArrowLeft size={16} />
            Cancel
          </Link>

          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={submitting ? "saving" : "save"}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.15 }}
                className="inline-block"
              >
                {submitting ? "Saving..." : "Save changes"}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </form>
    </>
  );
}