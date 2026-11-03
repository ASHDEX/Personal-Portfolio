export interface ExperienceEntry {
  company: string;
  role: string;
  date: string;
  location?: string;
  bullets: string[];
  metrics?: { value: string; label: string }[];
  tags: string[];
  /** One line on team, reporting line and ownership, for senior readers. */
  scope?: string;
  /** Shown as a visible draft note until the owner supplies the real detail. */
  draft?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  /** Where it was built, e.g. 'Independent' or an employer. */
  context?: string;
  /** Public code for this project. */
  repo?: { label: string; url: string };
}

export interface Certification {
  name: string;
  full: string;
  issuer: string;
  /** Credly badge or issuer verification page. */
  verify?: string;
}

export interface PursuingCert {
  name: string;
  full: string;
  issuer: string;
  target: string;
}

export interface Repo {
  name: string;
  description: string;
  url: string;
  language?: string;
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

export interface CaseStudy {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  tags: string[];
  scenario: string;
  investigation: string;
  response: string;
  impact: { value: string; label: string }[];
  impactSummary?: string;
  /** What I personally owned in this engagement. */
  role?: string;
  detectionExample?: {
    title: string;
    mitre: string;
    language: string;
    code: string;
  };
}

export interface MitreTech {
  id: string;
  name: string;
  case?: string;
  exp?: string;
}

export interface MitreTactic {
  tactic: string;
  techs: MitreTech[];
  dim: { id: string; name: string }[];
}

export interface LogLine {
  lvl: 'OK' | 'INFO' | 'WARN' | 'CRIT';
  msg: string;
}

export type Theme = 'terminal' | 'console';

export interface ThemeTokens {
  bg: string;
  panel: string;
  panel2: string;
  panelBlur: string;
  border: string;
  borderHi: string;
  accent: string;
  accent2: string;
  accent3: string;
  accentSoft: string;
  glow: string;
  heroGrid: string;
  glowA: string;
  text: string;
  bright: string;
  dim: string;
}
