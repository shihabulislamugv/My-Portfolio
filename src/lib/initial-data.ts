import initialDataJson from "../../scripts/initial-data.json";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  role: string | null;
  timeline: string | null;
  problem: string | null;
  solution: string | null;
  externalLink: string | null;
  caseStudy: string | null;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function getInitialProjects(): ProjectData[] {
  return (initialDataJson.projects || []) as ProjectData[];
}

export function getInitialProfile() {
  return initialDataJson.profiles?.[0] || null;
}

export function getInitialSkills() {
  return initialDataJson.skills || [];
}

export function getInitialExperiences() {
  return initialDataJson.experiences || [];
}

export function getInitialAcademics() {
  return initialDataJson.academics || [];
}
