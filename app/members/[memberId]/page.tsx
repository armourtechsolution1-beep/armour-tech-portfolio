import CertificatesSection from "@/components/member_enhanced/certificates/certificates";
import DocumentsSection from "@/components/member_enhanced/documents/documents";
import ContactSection from "@/components/member_enhanced/footer/footerSection";
import { HeroSection } from "@/components/member_enhanced/hero_section/HeroSection";
import ProjectsSection from "@/components/member_enhanced/projects/projects";
import NavigationButtons from "@/components/member_enhanced/skills/navigationButtons";
import Skills from "@/components/member_enhanced/skills/skills";
import WorkExperienceSection from "@/components/member_enhanced/work_experience/workExperience";



export default function MemberPortfolio() {
  return (
    <main className="relative bg-[#020202]">
      <NavigationButtons />
      
      <section id="hero">
        <HeroSection />
      </section>

      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="skills">
        <Skills />
      </section>

      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="projects">
        <ProjectsSection />
      </section>

      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="certificates">
        <CertificatesSection />
      </section>
       <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="experience">
        <WorkExperienceSection />
      </section>
      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="documents">
        <DocumentsSection />
      </section>
      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}