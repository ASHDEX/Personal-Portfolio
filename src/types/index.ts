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

export interface GRCFramework {
  id: string;
  name: string;
  fullName: string;
  description: string;
  contributions: string[];
  outcome?: string;
  outcomeLabel?: string;
}

export interface GRCPolicyGroup {
  title: string;
  policies: string[];
  impact: string;
}

export interface GRCRiskMetric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  tags: string[];
  scenario: string;
  investigation: string;
  response: string;
  impact: { value: string; label: string }[];
  impactSummary: string;
  detectionExample?: {
    title: string;
    mitre: string;
    language: string;
    code: string;
  };
}