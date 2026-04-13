export interface Certification {
  name: string
  abbr: string
  issuer: string
  year: string
  id: string
}

export const certifications: Certification[] = [
  { name: 'Offensive Security Certified Professional', abbr: 'OSCP', issuer: 'Offensive Security', year: '2023', id: 'OSCP-123456' },
  { name: 'Certified Information Systems Security Professional', abbr: 'CISSP', issuer: '(ISC)²', year: '2022', id: 'CISSP-789012' },
  { name: 'GIAC Penetration Tester', abbr: 'GPEN', issuer: 'GIAC / SANS', year: '2021', id: 'GPEN-345678' },
  { name: 'AWS Certified Security – Specialty', abbr: 'AWS-SEC', issuer: 'Amazon Web Services', year: '2022', id: 'AWS-SEC-901234' },
  { name: 'Certified Ethical Hacker', abbr: 'CEH', issuer: 'EC-Council', year: '2020', id: 'CEH-567890' },
  { name: 'Azure Security Engineer Associate', abbr: 'AZ-500', issuer: 'Microsoft', year: '2023', id: 'AZ-500-123' },
]