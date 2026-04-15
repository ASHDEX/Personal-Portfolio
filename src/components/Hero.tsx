"use client";

import { motion } from "framer-motion";
import { SITE } from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stats = [
  { value: "MTTD ↓40%", label: "Cloud Detection" },
  { value: "MTTC ↓35%", label: "Incident Containment" },
  { value: "400+", label: "Endpoints Secured" },
  { value: "16+", label: "Certifications" },
];

const links = [
  { icon: "✉", label: SITE.email, href: `mailto:${SITE.email}`, external: false },
  { icon: "▸", label: "LinkedIn", href: SITE.linkedin, external: true },
  { icon: "▸", label: "GitHub", href: SITE.github, external: true },
  { icon: "▸", label: "FreeIntelHub", href: SITE.freeintelhub, external: true },
  { icon: "▸", label: "Blog", href: SITE.blog, external: true },
];

export default function Hero() {
  return (
    <motion.section
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      variants={containerVariants}
    >
      {/* Prompt line */}
      <motion.div variants={itemVariants}>
        <div className="text-xs font-mono mb-6">
          <span className="text-[#00e5ff]">~/sec-ops</span>
          <span className="text-[#00ff9c] mx-1.5">❯</span>
          <span className="text-[#6e7a88]">init system.operator --verbose</span>
        </div>
      </motion.div>

      {/* Name with blinking caret */}
      <motion.div variants={itemVariants}>
        <h1 className="font-display font-bold text-[clamp(28px,5vw,42px)] text-[#e6edf3] mb-2 flex items-center">
          {SITE.name}
          <span className="inline-block w-[3px] h-[0.9em] bg-[#00ff9c] ml-1 animate-blink"></span>
        </h1>
      </motion.div>

      {/* Role */}
      <motion.div variants={itemVariants}>
        <h2 className="text-base text-[#00ff9c] font-medium mb-4">
          {SITE.role}
        </h2>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants}>
        <p className="text-[13px] text-[#6e7a88] max-w-[640px] leading-relaxed mb-7">
          Security engineer with 5+ years of hands-on experience across detection engineering, insider threat management, cloud incident response, and DLP implementation. Building detection-as-code pipelines, hunting adversaries across cloud and enterprise environments, and translating threat intelligence into measurable security outcomes.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0d1117] border border-[#1b2430] px-5 py-3 min-w-[140px]"
            >
              <div className="text-xl font-bold text-[#00ff9c]">
                {stat.value}
              </div>
              <div className="text-[10px] text-[#6e7a88] uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Links row */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-3 mt-5">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-xs px-4 py-2 border border-[#1b2430] text-[#c9d1d9] hover:border-[#00ff9c] hover:text-[#00ff9c] hover:bg-[rgba(0,255,156,0.1)] hover:shadow-[0_0_20px_rgba(0,255,156,0.15)] transition-all duration-250 flex items-center gap-1.5"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}