export interface SkillItem {
  name: string
  level: number
}

export interface SkillGroup {
  category: string
  skills: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Detection & Response',
    skills: [
      { name: 'Incident Response', level: 95 },
      { name: 'Threat Hunting', level: 90 },
      { name: 'SIEM Engineering', level: 85 },
      { name: 'EDR Management', level: 88 },
    ],
  },
  {
    category: 'Cloud Security',
    skills: [
      { name: 'AWS Security', level: 92 },
      { name: 'Azure Security', level: 85 },
      { name: 'GCP Security', level: 80 },
      { name: 'Cloud IAM', level: 90 },
    ],
  },
  {
    category: 'Development & Automation',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Terraform', level: 85 },
      { name: 'CI/CD Security', level: 87 },
    ],
  },
  {
    category: 'Governance & Compliance',
    skills: [
      { name: 'Risk Assessment', level: 90 },
      { name: 'Policy Development', level: 85 },
      { name: 'Audit Management', level: 82 },
      { name: 'ISO 27001', level: 88 },
    ],
  },
]