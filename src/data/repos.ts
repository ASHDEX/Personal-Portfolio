import { Repo } from '@/types';

export const repos: Repo[] = [
  {
    name: 'FreeIntelhub',
    description: 'Self-hosted CTI platform aggregating 50+ threat feeds with IOC lookup, threat actor tracking, CVE prioritization & MITRE ATT&CK mapping',
    url: 'https://github.com/ASHDEX/FreeIntelhub',
    language: 'Jupyter Notebook',
  },
  {
    name: 'Snowflake-SPL-Queries',
    description: 'SPL detection library correlating Snowflake activity with Microsoft Purview classification metadata, plus standalone account-security rules',
    url: 'https://github.com/ASHDEX/Snowflake-SPL-Queries',
  },
  {
    name: 'brand-domain-monitoring-toolkit',
    description: 'Python toolkit for brand protection: bulk domain lookups, reachability checks, visual screenshot reports, and domain reputation monitoring',
    url: 'https://github.com/ASHDEX/brand-domain-monitoring-toolkit',
    language: 'Python',
  },
  {
    name: 'CTI-Automation-Scripts',
    description: 'Python scripts for CTI automation: OTX/VT lookups, domain snapshots, CTI summarization, and cyber advisory generation',
    url: 'https://github.com/ASHDEX/CTI-Automation-Scripts',
    language: 'Python',
  },
  {
    name: '100-days-of-YARA',
    description: 'A daily YARA rule writing challenge — one detection rule per day',
    url: 'https://github.com/ASHDEX/100-days-of-YARA',
  },
  {
    name: 'sigma',
    description: 'Sigma detection rules for platform-agnostic SIEM correlation',
    url: 'https://github.com/ASHDEX/sigma',
  },
];
