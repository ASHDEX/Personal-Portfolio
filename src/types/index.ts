export interface ExperienceBullet {
  verb: string;
  text: string;
}

export interface ExperienceMetric {
  label: string;
  direction: '' | '↑' | '↓';
  value: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  date: string;
  location?: string;
  bullets: string[];
  metrics?: { value: string; label: string }[];
  tags: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Certification {
  name: string;
  fullName: string;
  issuer: string;
  badgeColor: string; // Tailwind bg class
  badgeLabel: string; // Short label for badge
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}