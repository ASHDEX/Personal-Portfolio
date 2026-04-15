export interface PursuingCert {
  name: string;
  fullName: string;
  issuer: string;
  expectedTimeline: string;
  description: string;
  relevance: string;
}

export const pursuingCerts: PursuingCert[] = [
  {
    name: 'CRISC',
    fullName: 'Certified in Risk and Information Systems Control',
    issuer: 'ISACA',
    expectedTimeline: 'In Progress',
    description: 'Enterprise IT risk identification, assessment, response, and monitoring. Validates ability to design and implement IS controls aligned to business objectives.',
    relevance: 'Strengthens risk quantification and GRC capabilities — complements CISM and CISA for senior risk advisory roles.',
  },
  {
    name: 'ISSMP',
    fullName: 'Information Systems Security Management Professional',
    issuer: 'ISC²',
    expectedTimeline: 'In Progress',
    description: 'CISSP concentration in security program leadership — covers project management, security operations, business continuity, law and ethics, and compliance.',
    relevance: 'Formalizes security program design and leadership experience — directly maps to the SOC build and IR program work at Payatu.',
  },
  {
    name: 'ISSAP',
    fullName: 'Information Systems Security Architecture Professional',
    issuer: 'ISC²',
    expectedTimeline: 'Planned',
    description: 'CISSP concentration in security architecture — access control, cryptography, network/application security architecture, and technology-related BCP/DRP.',
    relevance: 'Validates architectural decision-making across cloud, network, and identity — relevant to cross-cloud federation and zero-trust design work.',
  },
  {
    name: 'ISSEP',
    fullName: 'Information Systems Security Engineering Professional',
    issuer: 'ISC²',
    expectedTimeline: 'Planned',
    description: 'CISSP concentration in security engineering — systems engineering principles applied to secure system design, including NIST RMF and systems security lifecycle.',
    relevance: 'Deepens detection engineering and security automation expertise — aligns with multi-SIEM detection-as-code program and SOAR automation work.',
  },
];
