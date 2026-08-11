import type {
  JobListing,
  ProjectListing,
  TalentProfile,
  PlatformStat,
  RoleCard,
} from "@/lib/types";

export const jobListings: JobListing[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "Rivierstad Digital",
    type: "Part-time",
    location: "Paramaribo",
    remote: true,
    postedDaysAgo: 2,
    budget: "SRD 3,200/mo",
    tags: ["React", "TypeScript"],
  },
  {
    id: "job-2",
    title: "Brand Designer",
    company: "Kwatta Studio",
    type: "Freelance",
    location: "Paramaribo",
    remote: true,
    postedDaysAgo: 1,
    budget: "SRD 1,800 project",
    tags: ["Figma", "Identity"],
  },
  {
    id: "job-3",
    title: "Marketing Assistant",
    company: "Zonrise Retail",
    type: "Part-time",
    location: "Nickerie",
    remote: false,
    postedDaysAgo: 4,
    budget: "SRD 2,100/mo",
    tags: ["Social", "Content"],
  },
  {
    id: "job-4",
    title: "Backend Engineer",
    company: "Surifin Labs",
    type: "Freelance",
    location: "Paramaribo",
    remote: true,
    postedDaysAgo: 6,
    budget: "SRD 4,500 project",
    tags: ["Node.js", "Postgres"],
  },
];

export const projectListings: ProjectListing[] = [
  {
    id: "proj-1",
    title: "Community Website for Blauwgrond",
    owner: "Neighborhood Council",
    description:
      "A directory and events page for local residents and small businesses in the district.",
    skillsNeeded: ["Next.js", "Copywriting"],
    teamSize: 4,
    membersJoined: 2,
    progress: 35,
  },
  {
    id: "proj-2",
    title: "Startup Looking for Designer",
    owner: "Trano Foods",
    description:
      "Early-stage food delivery concept needs a visual identity and app screens before pitch season.",
    skillsNeeded: ["UI Design", "Branding"],
    teamSize: 3,
    membersJoined: 1,
    progress: 15,
  },
  {
    id: "proj-3",
    title: "AI Student Team — Crop Monitoring",
    owner: "AdeK IT Faculty",
    description:
      "Final-year build using satellite imagery to flag irrigation issues on rice farms.",
    skillsNeeded: ["Python", "Data Viz"],
    teamSize: 5,
    membersJoined: 4,
    progress: 68,
  },
];

export const talentProfiles: TalentProfile[] = [
  {
    id: "talent-1",
    name: "Naomi Vrede",
    role: "Product Designer",
    skills: ["UI/UX", "Prototyping", "Design Systems"],
    availability: "Available",
    experience: "4 yrs",
    initials: "NV",
    accent: "emerald",
  },
  {
    id: "talent-2",
    name: "Dmitri Sabajo",
    role: "Full-stack Developer",
    skills: ["Next.js", "PostgreSQL", "AWS"],
    availability: "Open to offers",
    experience: "6 yrs",
    initials: "DS",
    accent: "teal",
  },
  {
    id: "talent-3",
    name: "Chelsea Pinas",
    role: "Marketing Strategist",
    skills: ["Growth", "Content", "SEO"],
    availability: "Booked",
    experience: "3 yrs",
    initials: "CP",
    accent: "gold",
  },
];

export const platformStats: PlatformStat[] = [
  { id: "stat-1", label: "Active talent profiles", value: 1240 },
  { id: "stat-2", label: "Open jobs this month", value: 186 },
  { id: "stat-3", label: "Collaboration projects", value: 74 },
  { id: "stat-4", label: "Registered organizations", value: 92 },
];

export const districts: string[] = [
  "Paramaribo",
  "Wanica",
  "Nickerie",
  "Commewijne",
  "Para",
  "Saramacca",
  "Coronie",
  "Marowijne",
];

export const roleCards: RoleCard[] = [
  {
    id: "role-hire",
    label: "Hire",
    description: "Post a role and review applicants",
    icon: "briefcase",
  },
  {
    id: "role-apply",
    label: "Apply",
    description: "Find work that fits your skills",
    icon: "layout-grid",
  },
  {
    id: "role-collaborate",
    label: "Collaborate",
    description: "Join a project team",
    icon: "users",
  },
  {
    id: "role-showcase",
    label: "Showcase",
    description: "Build your portfolio",
    icon: "sparkles",
  },
];
