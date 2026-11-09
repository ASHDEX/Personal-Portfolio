'use client';

import { useEffect } from 'react';
import { MARKUP } from '@/app/socwall-markup';
import { experience } from '@/data/experience';
import { caseStudies } from '@/data/casestudies';
import { projects } from '@/data/projects';
import { certifications } from '@/data/certifications';
import { pursuingCerts } from '@/data/pursuing';
import { skillGroups } from '@/data/skills';
import { repos } from '@/data/repos';
import { contacts } from '@/data/contacts';
import { mitreTactics } from '@/data/mitre';
import { leadership } from '@/data/leadership';
import { wall } from '@/data/wall';

const DATA = { experience, caseStudies, projects, certifications, pursuingCerts, skillGroups, repos, contacts, mitreTactics, leadership, wall };

export default function SocWall() {
  useEffect(() => {
    // The engine owns the DOM below; start it once (React strict mode runs effects twice in dev).
    const w = window as unknown as { __socwall?: boolean };
    if (w.__socwall) return;
    w.__socwall = true;
    import('@/lib/socwall/engine').then(m => m.initSocWall(DATA));
  }, []);

  return <div id="socwall" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
