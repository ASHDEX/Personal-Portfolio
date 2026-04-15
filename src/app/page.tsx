import BootSequence from '@/components/BootSequence';
import TopBar from '@/components/TopBar';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import CaseStudies from '@/components/CaseStudies';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Pursuing from '@/components/Pursuing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <BootSequence />
      <TopBar />
      <Navigation />
      <main className="max-w-[960px] mx-auto px-6 pt-28 pb-20">
        <section id="about">
          <Hero />
        </section>
        <section id="experience" className="mt-[72px]">
          <Experience />
        </section>
        <section id="casestudies" className="mt-[72px]">
          <CaseStudies />
        </section>
        <section id="skills" className="mt-[72px]">
          <Skills />
        </section>
        <section id="projects" className="mt-[72px]">
          <Projects />
        </section>
        <section id="certifications" className="mt-[72px]">
          <Certifications />
        </section>
        <section id="pursuing" className="mt-[72px]">
          <Pursuing />
        </section>
        <section id="contact" className="mt-[72px]">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  );
}