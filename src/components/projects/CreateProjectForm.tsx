"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Users, GraduationCap } from "lucide-react";

import { createProject } from "@/app/actions/project";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";

interface Talent {
  id: string;
  name: string;
  location: string | null;
  bio: string | null;
  skills: string[];
}

interface CreateProjectFormProps {
  talent: Talent;
}

type ProjectType = "COLLABORATION" | "MENTORSHIP";

export function CreateProjectForm({
  talent,
}: CreateProjectFormProps) {
  const reduceMotion = useReducedMotion();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] =
    useState<ProjectType>("COLLABORATION");

  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError(undefined);
    setSubmitting(true);

    try {
      const result = await createProject(
        title,
        description,
        type,
        talent.id
      );

      if (!result.success) {
        setError(result.error);
        setSubmitting(false);
        return;
      }

      window.location.href = `/projects/${result.projectId}`;
    } catch (error) {
      console.error("Failed to create project:", error);

      setError(
        "Something went wrong while creating the project."
      );

      setSubmitting(false);
    }
  }

  const descriptionNearLimit =
    description.length > 1800;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      {/* Project title */}
      <InputField
        label="Project title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Build a student portfolio platform"
        required
      />

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="
            block
            text-sm
            font-medium
            text-ink
            mb-2
          "
        >
          What are you working on?
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Explain the idea, what you want to accomplish, and how you would like to work together..."
          maxLength={2000}
          rows={7}
          required
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
            resize-none
            transition
            focus:border-emerald-600
          "
        />

        <p
          className={`
            text-xs
            mt-2
            text-right
            transition-colors
            ${
              descriptionNearLimit
                ? "text-amber-600"
                : "text-ink-faint"
            }
          `}
        >
          {description.length}/2000
        </p>
      </div>

      {/* Project type */}
      <div>
        <div className="mb-3">
          <label
            className="
              block
              text-sm
              font-medium
              text-ink
            "
          >
            Project type
          </label>

          <p className="text-xs text-ink-faint mt-1">
            Choose how you want to work together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {/* Collaboration */}
          <button
            type="button"
            onClick={() =>
              setType("COLLABORATION")
            }
            className={`
              relative
              text-left
              rounded-2xl
              border
              p-5
              transition-all
              duration-200
              ${
                type === "COLLABORATION"
                  ? `
                    border-emerald-400
                    bg-emerald-50
                    shadow-sm
                  `
                  : `
                    border-line
                    bg-white
                    hover:border-emerald-200
                  `
              }
            `}
          >
            {type === "COLLABORATION" && (
              <div
                className="
                  absolute
                  top-4
                  right-4
                  h-6
                  w-6
                  rounded-full
                  bg-emerald-700
                  text-white
                  grid
                  place-items-center
                "
              >
                <Check size={14} />
              </div>
            )}

            <div
              className={`
                h-10
                w-10
                rounded-xl
                grid
                place-items-center
                ${
                  type === "COLLABORATION"
                    ? "bg-white text-emerald-700"
                    : "bg-emerald-50 text-emerald-700"
                }
              `}
            >
              <Users size={18} />
            </div>

            <h3
              className="
                font-display
                text-lg
                text-ink
                mt-4
              "
            >
              Collaboration
            </h3>

            <p
              className="
                text-sm
                text-ink-muted
                leading-relaxed
                mt-1.5
              "
            >
              Build something together and gain
              practical experience as a team.
            </p>
          </button>

          {/* Mentorship */}
          <button
            type="button"
            onClick={() =>
              setType("MENTORSHIP")
            }
            className={`
              relative
              text-left
              rounded-2xl
              border
              p-5
              transition-all
              duration-200
              ${
                type === "MENTORSHIP"
                  ? `
                    border-emerald-400
                    bg-emerald-50
                    shadow-sm
                  `
                  : `
                    border-line
                    bg-white
                    hover:border-emerald-200
                  `
              }
            `}
          >
            {type === "MENTORSHIP" && (
              <div
                className="
                  absolute
                  top-4
                  right-4
                  h-6
                  w-6
                  rounded-full
                  bg-emerald-700
                  text-white
                  grid
                  place-items-center
                "
              >
                <Check size={14} />
              </div>
            )}

            <div
              className={`
                h-10
                w-10
                rounded-xl
                grid
                place-items-center
                ${
                  type === "MENTORSHIP"
                    ? "bg-white text-emerald-700"
                    : "bg-emerald-50 text-emerald-700"
                }
              `}
            >
              <GraduationCap size={18} />
            </div>

            <h3
              className="
                font-display
                text-lg
                text-ink
                mt-4
              "
            >
              Mentorship
            </h3>

            <p
              className="
                text-sm
                text-ink-muted
                leading-relaxed
                mt-1.5
              "
            >
              Learn from each other while working
              toward a practical goal.
            </p>
          </button>
        </div>
      </div>

      {/* Selected talent */}
      <div
        className="
          rounded-xl
          border
          border-line
          bg-bg-sunken
          px-4
          py-3
        "
      >
        <p className="text-xs text-ink-faint">
          Inviting
        </p>

        <p className="text-sm font-medium text-ink mt-0.5">
          {talent.name}
        </p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -6 }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion
                ? 0.01
                : 0.2,
            }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div
        className="
          flex
          flex-col-reverse
          sm:flex-row
          sm:justify-end
          gap-3
          pt-2
        "
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={
                submitting
                  ? "creating"
                  : "create"
              }
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 4 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -4 }
              }
              transition={{
                duration: reduceMotion
                  ? 0.01
                  : 0.15,
              }}
              className="inline-block"
            >
              {submitting
                ? "Creating..."
                : "Create project"}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </form>
  );
}