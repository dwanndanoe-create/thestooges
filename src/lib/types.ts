export type EmploymentType = "Part-time" | "Full-time" | "Freelance" | "Internship";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  type: EmploymentType;
  location: string;
  remote: boolean;
  postedDaysAgo: number;
  budget: string;
  tags: string[];
}

export interface ProjectListing {
  id: string;
  title: string;
  owner: string;
  description: string;
  skillsNeeded: string[];
  teamSize: number;
  membersJoined: number;
  progress: number; // 0-100
}

export type AvailabilityStatus = "Available" | "Open to offers" | "Booked";

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: AvailabilityStatus;
  experience: string;
  initials: string;
  accent: "emerald" | "teal" | "gold";
}

export interface PlatformStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface RoleCard {
  id: string;
  label: string;
  description: string;
  icon: "briefcase" | "users" | "sparkles" | "layout-grid";
}
