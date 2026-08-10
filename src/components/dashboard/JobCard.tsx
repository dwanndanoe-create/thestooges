import Link from "next/link";
import { MapPin } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string | null;
  skills: string[];
  budget: number | string;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const {
    id,
    title,
    description,
    company,
    location,
    skills,
    budget,
  } = job;

  return (
    <article
      className="
        rounded-2xl
        border
        border-line
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink">
            {title}
          </h3>

          <p className="mt-1 text-sm text-ink-muted">
            {company}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
        {location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {location}
          </span>
        )}

        <span className="font-medium text-ink">
          {Number(budget).toLocaleString()} SRD
        </span>
      </div>

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                text-emerald-800
              "
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-line pt-4">
        <Link
          href={`/jobs/${id}`}
          className="
            inline-flex
            items-center
            text-sm
            font-medium
            text-emerald-700
            transition
            hover:text-emerald-900
          "
        >
          View details →
        </Link>
      </div>
    </article>
  );
}