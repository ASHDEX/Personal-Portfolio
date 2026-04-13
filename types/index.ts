// Re-export all data types
export type { ExperienceEntry, ExperienceBullet, ExperienceMetric } from '../src/types'
export type { SkillItem } from '../data/skills'
export type { SkillGroup } from '../src/types'
export type { Project } from '../src/types'
export type { Certification } from '../src/types'
export type { NavItem } from '../data/navigation'

// Common component props
export interface SectionProps {
  id?: string
  className?: string
  children?: React.ReactNode
}

// Animation props
export interface ScrollRevealProps {
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  once?: boolean
}

// Terminal theme
export interface TerminalTheme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  fontFamily: string
}