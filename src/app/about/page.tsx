"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDownToLine, Briefcase, Award, CheckCircle2, Mail, GraduationCap, Lock } from "lucide-react";

export default function AboutPage() {
  const [profile, setProfile] = useState<any>({});
  const [experiences, setExperiences] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [academics, setAcademics] = useState<any[]>([]);

  useEffect(() => {
    const timestamp = Date.now();
    fetch(`/api/profile?t=${timestamp}`, { cache: "no-store" }).then(res => res.json()).then(data => {
      if (data && typeof data === 'object' && !('error' in data)) setProfile(data);
    }).catch(console.error);
    fetch(`/api/experience?t=${timestamp}`, { cache: "no-store" }).then(res => res.json()).then(data => {
      if (Array.isArray(data)) setExperiences(data);
    }).catch(console.error);
    fetch(`/api/skills?t=${timestamp}`, { cache: "no-store" }).then(res => res.json()).then(data => {
      if (Array.isArray(data)) setSkills(data);
    }).catch(console.error);
    fetch(`/api/academic?t=${timestamp}`, { cache: "no-store" }).then(res => res.json()).then(data => {
      if (Array.isArray(data)) setAcademics(data);
    }).catch(console.error);
  }, []);

  return (
    <main className="flex-1 max-w-[90rem] mx-auto px-6 pt-36 pb-32 w-full">
      
      {/* Back button */}
      <div className="mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-black uppercase tracking-widest text-sm transition"
        >
          <ArrowLeft size={18} strokeWidth={3} /> Return to Home
        </Link>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row gap-16 mb-32 items-start lg:items-end border-b-4 border-zinc-900 pb-16">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-[11vw] leading-[0.88] font-black tracking-tighter text-zinc-900 mb-8 uppercase select-none">
            About <br />
            <span className="text-zinc-400 italic font-serif lowercase tracking-normal">the</span> Mind.
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-700 leading-tight font-medium max-w-3xl">
            {profile?.aboutText || "A passionate UX/UI Designer with 2 years of experience developing live projects and robust case studies at a fast-paced agency."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#skills"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-blue-50 transition"
            >
              <Award size={16} className="text-blue-600" />
              <span>Skills &amp; Stack</span>
              <span className="text-blue-600 font-bold">↓</span>
            </a>

            <a
              href="#certifications"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-blue-50 transition"
            >
              <Award size={16} className="text-blue-600" />
              <span>Certifications</span>
              <span className="text-blue-600 font-bold">↓</span>
            </a>

            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-blue-50 transition"
            >
              <Briefcase size={16} className="text-blue-600" />
              <span>Career History</span>
              <span className="text-blue-600 font-bold">↓</span>
            </a>

            <a
              href="#academic"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-blue-50 transition"
            >
              <GraduationCap size={16} className="text-blue-600" />
              <span>Academic</span>
              <span className="text-blue-600 font-bold">↓</span>
            </a>

            {profile.resumeUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/api/resume/download"
                download="Md_Shihabul_Islam_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-zinc-900 text-white font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] border-2 border-zinc-900 hover:bg-blue-600 transition-colors"
              >
                <ArrowDownToLine size={16} strokeWidth={3} />
                Download Curriculum Vitae
              </motion.a>
            )}
          </div>
        </motion.div>
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.03, rotate: 2 }}
          className="w-full sm:w-80 md:w-96 aspect-[3/4] bg-zinc-200 relative border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] flex-shrink-0 overflow-hidden"
        >
          <Image 
            src="/images/profile.jpg" 
            alt="Profile Photo" 
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md p-3 text-white border border-white/20">
            <span className="text-xs font-mono font-bold uppercase tracking-widest block">
              Shihab &bull; Senior UX/UI
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              Dhaka, Bangladesh (UTC+6)
            </span>
          </div>
        </motion.div>
      </div>

      {/* 1. Skills & Stack Row */}
      <section id="skills" className="mb-28 border-b-4 border-zinc-900 pb-20 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-black uppercase tracking-widest mb-3">
              <Award size={14} className="text-blue-600" /> Core Capabilities
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
              Skills &amp; Stack
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Design Systems &bull; Prototyping &bull; Research
          </span>
        </div>

        {/* Skills Badges */}
        <div className="flex flex-wrap gap-3.5 mb-14">
          {!Array.isArray(skills) || skills.length === 0 ? (
            <p className="text-zinc-500 font-bold uppercase tracking-wider text-sm p-8 bg-zinc-100 border-2 border-dashed border-zinc-300 w-full">
              No skills added yet. Add some in the Admin Panel!
            </p>
          ) : (
            skills.map((skill, idx) => (
              <motion.span 
                key={skill.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3.5 bg-white border-2 border-zinc-900 text-base font-black uppercase tracking-wider text-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] inline-flex items-center gap-2 cursor-default hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <span>{skill.name}</span>
              </motion.span>
            ))
          )}
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border-4 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]">
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest block mb-2">01 / Focus</span>
            <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">Radical Simplicity</h4>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">Prioritizing user intent and intuitive clarity over decorative visual clutter.</p>
          </div>
          <div className="p-8 bg-white border-4 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]">
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest block mb-2">02 / Performance</span>
            <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">Speed &amp; Accessibility</h4>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">Engineered for sub-second interactions and universal WCAG accessibility standards.</p>
          </div>
          <div className="p-8 bg-white border-4 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]">
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest block mb-2">03 / Engineering</span>
            <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">Dev-Ready Systems</h4>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">Tokenized design systems and Figma components crafted specifically for clean code handoff.</p>
          </div>
        </div>
      </section>

      {/* 2. Certifications Row */}
      <section id="certifications" className="mb-28 border-b-4 border-zinc-900 pb-20 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest mb-3">
              <Award size={14} /> Formal Accreditation
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
              Certifications
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Verified Industry Accreditation
          </span>
        </div>

        <div className="bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:shadow-[16px_16px_0px_0px_rgba(37,99,235,1)] transition-all p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
          {/* Certificate Thumbnail Preview */}
          <a 
            href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-96 aspect-[4/3] relative bg-zinc-100 border-2 border-zinc-900 overflow-hidden shrink-0 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] group block cursor-pointer"
          >
            <Image 
              src="/uploads/microsoft-product-design-certificate.jpg" 
              alt="Microsoft Product Design and UX/UI Fundamentals Certificate"
              fill
              sizes="(max-width: 1024px) 100vw, 384px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black uppercase tracking-widest text-xs gap-2">
              <span>View Verified Credential ↗</span>
            </div>
          </a>

          {/* Certificate Information */}
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-widest">
                Microsoft
              </span>
              <span className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider border border-zinc-300">
                Coursera Verified
              </span>
              <span className="text-xs font-mono font-bold text-zinc-500">
                Issued Sep 15, 2026
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 uppercase tracking-tight leading-tight">
              Product Design and UX/UI Fundamentals
            </h3>

            <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
              Officially issued by Microsoft via Coursera to Md. Shihabul Islam. Validates core competencies in human-centered design research, user journey mapping, information architecture, wireframing, high-fidelity UI systems, and interactive prototyping.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a 
                href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] border-2 border-zinc-900"
              >
                <span>Verify Credential on Coursera</span>
                <span className="text-base">↗</span>
              </a>
              <span className="text-xs font-mono text-zinc-400">
                Verification ID: J4W0KI4VK2S6
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Career History Row */}
      <section id="experience" className="mb-28 border-b-4 border-zinc-900 pb-20 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-black uppercase tracking-widest mb-3">
              <Briefcase size={14} className="text-blue-600" /> Work Experience
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
              Career History
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            2024 — Present &bull; Agency &amp; Product
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {!Array.isArray(experiences) || experiences.length === 0 ? (
            <div className="col-span-full p-8 bg-zinc-100 border-2 border-dashed border-zinc-300 text-zinc-500 font-bold uppercase tracking-wider text-sm">
              No experience entries added yet. Add some in the Admin Panel!
            </div>
          ) : (
            experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 bg-white border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono font-bold bg-zinc-100 px-3 py-1 border border-zinc-900 text-zinc-900 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                    {exp.company}
                  </p>
                  
                  {exp.description && (
                    <div className="text-zinc-600 text-base font-normal whitespace-pre-wrap leading-relaxed border-t-2 border-zinc-100 pt-4">
                      {exp.description}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* 4. Academic Background Row */}
      <section id="academic" className="mb-28 border-b-4 border-zinc-900 pb-20 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-black uppercase tracking-widest mb-3">
              <GraduationCap size={14} className="text-blue-600" /> Education &amp; Studies
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
              Academic Background
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Formal Qualifications &bull; Foundational Studies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {!Array.isArray(academics) || academics.length === 0 ? (
            <div className="col-span-full p-8 bg-zinc-100 border-2 border-dashed border-zinc-300 text-zinc-500 font-bold uppercase tracking-wider text-sm">
              No academic qualifications added yet. Add some in the Admin Panel!
            </div>
          ) : (
            academics.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 bg-white border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight">
                      {item.degree}
                    </h3>
                    <span className="text-xs font-mono font-bold bg-zinc-100 px-3 py-1 border border-zinc-900 text-zinc-900 shrink-0">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                    {item.institution}
                  </p>
                  
                  {item.description && (
                    <div className="text-zinc-600 text-base font-normal whitespace-pre-wrap leading-relaxed border-t-2 border-zinc-100 pt-4">
                      {item.description}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Collaboration Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-zinc-900 p-12 md:p-28 text-center text-white flex flex-col items-center border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(37,99,235,1)]"
      >
        <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none">
          Let&apos;s Work Together
        </h2>
        <p className="text-zinc-400 mb-12 max-w-2xl text-xl md:text-2xl font-medium">
          Open to freelance commissions, design advisory roles, and high-impact full-time product teams.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${profile?.email || 'hello@example.com'}`} 
          className="inline-flex items-center gap-3 px-12 py-6 bg-white text-zinc-900 text-xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Mail size={24} />
          <span>Say Hello</span>
        </motion.a>

        {/* Social / Direct Connect Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-black uppercase tracking-widest border-t-2 border-white/20 pt-10 mt-12 w-full max-w-xl">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/md-shihabul-islam404/" },
            { label: "GitHub", href: "https://github.com/shihabulislamugv" },
            { label: "Dribbble", href: "https://dribbble.com/Shihabul_Islam002" },
            { label: "Behance", href: "https://www.behance.net/mdshihabulislam" },
          ].map((social) => (
            <a 
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
            >
              <span>{social.label}</span>
              <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1.5 px-3.5 border border-white/20 hover:border-white text-[11px] font-mono font-bold uppercase tracking-widest rounded"
          >
            <Lock size={12} />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
