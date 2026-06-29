import { MitreTactic } from '@/types';

export const mitreTactics: MitreTactic[] = [
  {
    tactic: 'Resource Dev',
    techs: [{ id: 'T1583.001', name: 'Acquire Domains', case: '03' }],
    dim: [{ id: 'T1587.001', name: 'Develop Malware' }, { id: 'T1585', name: 'Establish Accounts' }],
  },
  {
    tactic: 'Initial Access',
    techs: [{ id: 'T1566.002', name: 'Spearphishing Link', case: '01' }],
    dim: [{ id: 'T1190', name: 'Exploit Public App' }, { id: 'T1133', name: 'External Remote Svcs' }],
  },
  {
    tactic: 'Execution',
    techs: [{ id: 'T1053.005', name: 'Scheduled Task', case: '01' }],
    dim: [{ id: 'T1059.001', name: 'PowerShell' }, { id: 'T1204.002', name: 'Malicious File' }],
  },
  {
    tactic: 'Persistence',
    techs: [
      { id: 'T1098.003', name: 'Additional Cloud Roles', case: '01' },
      { id: 'T1053.005', name: 'Scheduled Task', case: '01' },
    ],
    dim: [{ id: 'T1547.001', name: 'Registry Run Keys' }, { id: 'T1136', name: 'Create Account' }],
  },
  {
    tactic: 'Priv. Escalation',
    techs: [{ id: 'T1078.004', name: 'Valid Accounts: Cloud', case: '07' }],
    dim: [{ id: 'T1068', name: 'Exploit for PrivEsc' }, { id: 'T1484', name: 'Domain Policy Mod' }],
  },
  {
    tactic: 'Defense Evasion',
    techs: [
      { id: 'T1055.001', name: 'Reflective DLL Injection', case: '02' },
      { id: 'T1055.003', name: 'CreateRemoteThread', case: '04' },
      { id: 'T1027.003', name: 'Steganography', exp: 'Insider Threat @ Bank of America' },
      { id: 'T1550.001', name: 'App Access Token', case: '07' },
    ],
    dim: [{ id: 'T1070', name: 'Indicator Removal' }, { id: 'T1562.001', name: 'Disable Security Tools' }],
  },
  {
    tactic: 'Credential Access',
    techs: [
      { id: 'T1110.003', name: 'Password Spraying', exp: 'Insider Threat @ Bank of America' },
      { id: 'T1003.001', name: 'LSASS Memory', case: '05' },
    ],
    dim: [{ id: 'T1558', name: 'Kerberoasting' }, { id: 'T1555', name: 'Password Stores' }],
  },
  {
    tactic: 'Discovery',
    techs: [{ id: 'T1046', name: 'Network Service Discovery', case: '06' }],
    dim: [{ id: 'T1087', name: 'Account Discovery' }, { id: 'T1018', name: 'Remote System Disc.' }],
  },
  {
    tactic: 'Lateral Movement',
    techs: [
      { id: 'T1021.003', name: 'DCOM / MSRPC', case: '06' },
      { id: 'T1550.001', name: 'App Access Token (SAML)', case: '07' },
    ],
    dim: [{ id: 'T1021.001', name: 'RDP' }, { id: 'T1570', name: 'Lateral Tool Transfer' }],
  },
  {
    tactic: 'Command & Control',
    techs: [
      { id: 'T1071.001', name: 'Web Protocol C2', case: '02' },
      { id: 'T1071.004', name: 'DNS C2', case: '05' },
      { id: 'T1568.002', name: 'Domain Generation Algo', case: '05' },
    ],
    dim: [{ id: 'T1573', name: 'Encrypted Channel' }, { id: 'T1090', name: 'Proxy' }],
  },
  {
    tactic: 'Exfiltration',
    techs: [{ id: 'T1048', name: 'Exfil Over Alt Protocol', exp: 'Insider Threat @ Bank of America' }],
    dim: [{ id: 'T1041', name: 'Exfil Over C2' }, { id: 'T1567', name: 'Exfil to Cloud' }],
  },
];
