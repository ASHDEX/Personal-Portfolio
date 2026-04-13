import { Project } from '@/types';

export const projects: Project[] = [
  {
    name: 'FreeIntelHub — Open Source CTI Platform',
    description: 'Real-time cyber threat intelligence platform with RAG-based LLM intelligence generation, PostgreSQL + Neo4j + Redis storage, Kafka ingestion, and semantic IOC search via Pinecone. Full-stack system evolved from a Node.js/Express app.',
    tech: ['Node.js', 'PostgreSQL', 'Neo4j', 'Redis', 'Docker', 'Claude API'],
    link: 'https://github.com/ASHDEX/FreeIntelhub',
  },
  {
    name: 'Open Source Threat Intelligence Platform',
    description: 'Standalone CTI platform built on OpenCTI and Docker. Deployed Docker Swarm with Portainer, added TRAEFIK reverse proxy, and integrated MISP for threat feed aggregation.',
    tech: ['OpenCTI', 'Docker Swarm', 'STIX', 'MISP', 'TRAEFIK'],
  },
  {
    name: 'Threat Intelligence Dashboard',
    description: 'Custom dashboard integrating STIX/TAXII data formats with MITRE ATT&CK for real-time threat hunting. Automated ingestion and normalization of feeds from multiple open-source sources, improving detection accuracy by 25%.',
    tech: ['STIX', 'TAXII', 'MITRE ATT&CK', 'Python'],
  },
  {
    name: 'Homelab — Detection & Monitoring',
    description: 'Full detection lab: pfSense firewall for network segmentation, Security Onion as IDS/monitoring/log management, Kali Linux attack machine, Windows Domain Controller, and Splunk for log aggregation.',
    tech: ['pfSense', 'Security Onion', 'VMware', 'Splunk', 'Kali Linux'],
  },
  {
    name: '100 Days of YARA',
    description: 'Public GitHub repository documenting a structured 100-day deep dive into YARA rule writing for malware detection and threat hunting.',
    tech: ['YARA', 'Malware Analysis', 'GitHub'],
    link: 'https://github.com/ASHDEX/100-days-of-YARA',
  },
  {
    name: 'Daily Does of Cybersecurity News',
    description: 'Active cybersecurity news and analysis blog covering threat landscape developments, tooling, and security practices.',
    tech: ['Blog', 'CTI', 'Writing'],
    link: 'https://dailydoesofcybersecuritynews.com',
  },
];