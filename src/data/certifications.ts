import { Certification } from '@/types';

export const certifications: Certification[] = [
  { name: 'CISSP',       full: 'Certified Information Systems Security Professional', issuer: 'ISC²', verify: 'https://www.credly.com/badges/0141688e-c006-4f90-b938-aed0464509e6' },
  { name: 'CISM',        full: 'Certified Information Security Manager',               issuer: 'ISACA', verify: 'https://www.credly.com/badges/7e9d4e30-36bf-430c-aa91-81df3f2f0e3d' },
  { name: 'CISA',        full: 'Certified Information Systems Auditor',                issuer: 'ISACA', verify: 'https://www.credly.com/badges/81bd48f2-3caa-4798-bff9-be8fba92fcc4' },
  { name: 'CASP+',       full: 'CompTIA SecurityX (formerly CASP+)',                   issuer: 'CompTIA', verify: 'https://www.credly.com/badges/85c8445e-dde7-46f5-bc31-0fcab52a66aa' },
  { name: 'PenTest+',    full: 'CompTIA Penetration Testing',                          issuer: 'CompTIA', verify: 'https://www.credly.com/badges/779ce89e-bbbf-41df-9d2d-26cc49c3977b' },
  { name: 'CySA+',       full: 'CompTIA Cybersecurity Analyst',                        issuer: 'CompTIA', verify: 'https://www.credly.com/badges/91eb79ad-9237-485f-8a23-6d5d0c294ab9' },
  { name: 'Security+',   full: 'CompTIA Security+',                                    issuer: 'CompTIA', verify: 'https://www.credly.com/badges/40656177-3a3d-4613-a6ef-a923382f1515' },
  { name: 'CFR-410',     full: 'CyberSec First Responder',                             issuer: 'CertNexus' },
  { name: 'SC-100',      full: 'Cybersecurity Architect Expert',                       issuer: 'Microsoft' },
  { name: 'SC-300',      full: 'Identity & Access Administrator',                      issuer: 'Microsoft', verify: 'https://www.credly.com/badges/50681152-be83-40b2-88d9-578725cd94b1' },
  { name: 'SC-200',      full: 'Security Operations Analyst',                          issuer: 'Microsoft', verify: 'https://www.credly.com/badges/113a55be-f062-46fc-baa1-37e6f6d79a03' },
  { name: 'AZ-500',      full: 'Azure Security Engineer Associate',                    issuer: 'Microsoft' },
  { name: 'SC-900',      full: 'Security, Compliance & Identity Fundamentals',         issuer: 'Microsoft', verify: 'https://www.credly.com/badges/d441c2c3-5b27-42dd-b135-14690bc205c6' },
  { name: 'CCSK v4 & v5',full: 'Certificate of Cloud Security Knowledge',             issuer: 'CSA', verify: 'https://www.credly.com/badges/afed2e0e-bafc-42b1-b6e6-113d80c78e92' },
  { name: 'Google IT Pro',full: 'Google Career Certificate',                           issuer: 'Google' },
];