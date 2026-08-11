"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { createJob } from "@/app/actions/job";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";

export function CreateJobForm() {
  const reduceMotion = useReducedMotion();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  function addSkill() {
    const skill = newSkill.trim();

    if (!skill) return;

    if (skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
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
  }

  function removeSkill(skillToRemove: string) {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  }

  function handleSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(undefined);
    setSubmitting(true);

    const result = await createJob(
      title,
      description,
      budget,
      location,
      skills
    );

    if (!result.success) {
      setError(result.error);
      setSubmitting(false);
    }
  }

  const chipTransition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 500, damping: 32 };

  const descriptionNearLimit = description.length > 1800;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job title */}
      <InputField
        label="Job title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Build a restaurant website"
        required
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you need help with..."
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
          className={`text-xs mt-2 text-right transition-colors ${
            descriptionNearLimit ? "text-amber-600" : "text-ink-faint"
          }`}
        >
          {description.length}/2000
        </p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Budget (SRD)
        </label>

        <div className="relative">
          <input
            type="number"
            name="budget"
            min="1"
            step="1"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. 500"
            required
            className="
              w-full
              h-11
              rounded-xl
              border
              border-line-strong
              bg-white
              px-4
              pr-16
              text-sm
              text-ink
              outline-none
              transition
              focus:border-emerald-600
            "
          />

          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-sm
              font-medium
              text-ink-muted
            "
          >
            SRD
          </span>
        </div>

        <AnimatePresence>
          {budget && Number(budget) > 0 && (
            <motion.p
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.15 }}
              className="text-xs text-ink-faint mt-2"
            >
              Freelancers will see this as an SRD {Number(budget).toLocaleString()} budget.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skills */}
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

        <p className="text-xs text-ink-faint mt-2">
          Add up to 10 relevant skills.
        </p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={submitting ? "posting" : "post"}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.15 }}
              className="inline-block"
            >
              {submitting ? "Posting..." : "Post job"}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </form>
  );
}