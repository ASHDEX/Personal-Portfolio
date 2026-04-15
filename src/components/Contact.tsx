"use client";

import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { contacts } from "@/data/contacts";

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <ScrollReveal>
        <SectionHeader tag="MODULE" title="COMMS_INTERFACE — Get In Touch" />
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {contacts.map((contact, index) => (
          <ScrollReveal key={contact.label} delay={index * 0.05}>
            <div className="bg-[#0d1117] border border-[#1b2430] p-5 hover:border-[#00cc7d] transition-colors duration-300">
              <div className="text-[10px] tracking-[2px] uppercase text-[#6e7a88] mb-1.5">
                {contact.label}
              </div>
              <div className="text-[13px] text-[#00ff9c] break-all">
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={
                      contact.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    className="hover:text-[#00e5ff] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all"
                  >
                    {contact.value}
                  </a>
                ) : (
                  contact.value
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}