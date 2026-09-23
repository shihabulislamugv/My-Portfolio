"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowDownRight, 
  Sparkles, 
  Check, 
  Copy, 
  Play, 
  X, 
  ExternalLink,
  Layers,
  Compass,
  PenTool,
  Rocket,
  Award,
  Briefcase
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FigmaHero } from "@/components/FigmaHero";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({});
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data.slice(0, 4));
        }
      })
      .catch(console.error);
      
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object' && !('error' in data)) {
          setProfile(data);
        }
      })
      .catch(console.error);
      
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSkills(data);
        }
      })
      .catch(console.error);

    fetch('/api/experience')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExperiences(data);
        }
      })
      .catch(console.error);
  }, []);

  const copyEmail = () => {
    const emailToCopy = profile.email || "hello@example.com";
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const marqueeSkills = Array.isArray(skills) && skills.length > 0 ? skills.map(s => s.name) : [
    'UX Architecture', 'Interactive Design', 'Rapid Prototyping', 'Design Systems', 'Mobile Products', 'Figma To Code'
  ];

  return (
    <main ref={containerRef} className="flex-1 relative overflow-hidden">
      
      {/* Figma Canvas Creative Hero */}
      <FigmaHero profile={profile} />

      {/* Metrics / Key Numbers Bar */}
      <section className="border-y-4 border-zinc-900 bg-white py-12 px-6">
        <div className="max-w-[90rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { metric: "02+", label: "Years Experience", sub: "Agency & Product" },
            { metric: "20+", label: "Projects Shipped", sub: "Live & Documented" },
            { metric: "100%", label: "Pixel Perfect", sub: "Design & Systems" },
            { metric: "4.9★", label: "Client Satisfaction", sub: "Across All Projects" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 border-2 border-zinc-900 bg-[#f8f8f5] shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between"
            >
              <div className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter mb-2">
                {stat.metric}
              </div>
              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-wider text-zinc-900">
                  {stat.label}
                </h4>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified Credential Ribbon */}
        <div className="max-w-[90rem] mx-auto mt-8 pt-6 border-t-2 border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-600 text-white rounded-full shrink-0">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm font-black text-zinc-900 uppercase tracking-wider">
                Microsoft Certified &bull; Product Design and UX/UI Fundamentals
              </p>
              <p className="text-xs text-zinc-500 font-medium">
                Verified Industry Accreditation on Coursera &bull; Issued Sep 2026
              </p>
            </div>
          </div>
          <a 
            href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-zinc-900 inline-flex items-center gap-1 group shrink-0"
          >
            <span>View Verified Certificate</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>
      </section>

      {/* Selected Work - Asymmetric Editorial Layout */}
      <section id="projects" className="py-32 px-6 scroll-mt-20">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 border-b-4 border-zinc-900 pb-8 gap-6">
            <div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                Featured<br className="hidden md:inline" /> Case Studies
              </h2>
            </div>

            <Link 
              href="/projects" 
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-zinc-900 bg-white text-base font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <span>Explore All Projects</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="space-y-36 md:space-y-52">
            {Array.isArray(projects) && projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 group`}
              >
                
                {/* Project Image Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-3/5"
                >
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="block relative aspect-[4/3] md:aspect-auto md:h-[75vh] w-full overflow-hidden bg-zinc-200 border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] group-hover:shadow-[20px_20px_0px_0px_rgba(37,99,235,1)] transition-all duration-500 relative"
                  >
                    {project.thumbnail ? (
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 font-black text-6xl">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    
                    {/* Dark gradient on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Floating Hover Badge */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <span className="px-5 py-3 bg-white text-zinc-900 border-2 border-zinc-900 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] inline-flex items-center gap-2">
                        View Project <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Top Index Pill */}
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 bg-zinc-900 text-white text-xs font-mono font-bold uppercase tracking-widest border border-white/20">
                        0{index + 1} / 0{projects.length}
                      </span>
                    </div>
                  </Link>
                </motion.div>

                {/* Project Details */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-2/5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest">
                      // Case Study 0{index + 1}
                    </span>
                    {project.timeline && (
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        &bull; {project.timeline}
                      </span>
                    )}
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 group-hover:text-blue-600 transition-colors uppercase">
                    {project.title}
                  </h3>

                  <p className="text-lg md:text-xl text-zinc-600 mb-8 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  {/* Pills */}
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {project.role && (
                      <span className="px-4 py-1.5 bg-zinc-100 border-2 border-zinc-900 rounded-full text-xs font-black uppercase tracking-widest">
                        {project.role}
                      </span>
                    )}
                    <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-black uppercase tracking-widest">
                      UX & UI
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    <Link 
                      href={`/projects/${project.slug}`} 
                      className="inline-flex items-center gap-3 text-xl font-black uppercase tracking-widest hover:text-blue-600 transition-colors group/link"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={24} className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>

                    {project.externalLink && (
                      <a 
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
                        title="Live Site"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-32 px-6 border-t-4 border-zinc-900 bg-[#f8f8f5] scroll-mt-20">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 border-b-4 border-zinc-900 pb-8 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-900 text-zinc-900 text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                <Briefcase size={14} className="text-blue-600" /> Career History
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                Work Experience
              </h2>
            </div>

            <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-md">
              2+ years of hands-on agency and product experience designing high-converting web and mobile platforms.
            </p>
          </div>

          <div className="space-y-8">
            {!Array.isArray(experiences) || experiences.length === 0 ? (
              <div className="p-8 bg-white border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] text-zinc-500 font-bold uppercase tracking-wider text-sm">
                No experience entries added yet.
              </div>
            ) : (
              experiences.map((exp, idx) => (
                <motion.div 
                  key={exp.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-8 md:p-12 bg-white border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-8"
                >
                  {/* Left Column: Role, Company & Period */}
                  <div className="lg:w-1/3 space-y-3">
                    <div className="inline-block px-3 py-1 bg-zinc-100 border border-zinc-900 text-xs font-mono font-bold text-zinc-900">
                      {exp.period}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-blue-600 font-black uppercase tracking-widest text-sm">
                      {exp.company}
                    </p>
                  </div>

                  {/* Right Column: Responsibilities & Impact */}
                  <div className="lg:w-2/3 border-t-2 lg:border-t-0 lg:border-l-2 border-zinc-200 pt-6 lg:pt-0 lg:pl-10">
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
                      Role &bull; Scope &bull; Impact
                    </h4>
                    {exp.description && (
                      <div className="text-zinc-700 text-base md:text-lg font-normal leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-14 flex items-center justify-between border-t-2 border-zinc-300 pt-8 flex-wrap gap-4">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
              Comprehensive Career Dossier Available on About Page
            </span>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-900 hover:text-blue-600 transition-colors"
            >
              <span>View Full Experience &amp; Certifications</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* Design Process - Card Grid with Visual Flow */}
      <section id="process" className="py-32 px-6 border-t-4 border-zinc-900 bg-zinc-200 relative overflow-hidden scroll-mt-20">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                Design Process
              </h2>
            </div>
            <p className="text-lg md:text-xl font-bold text-zinc-600 max-w-md mt-4 md:mt-0">
              A structured 4-phase framework designed to de-risk development and build lovable, high-converting products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01",
                title: "Discover", 
                tag: "Phase 01 // Research",
                icon: Compass,
                desc: "User interviews, competitor teardowns, and market opportunity mapping to pinpoint the core problem." 
              },
              { 
                step: "02",
                title: "Define", 
                tag: "Phase 02 // Strategy",
                icon: Layers,
                desc: "User journeys, information architecture, and feature prioritization to build an bulletproof UX blueprint." 
              },
              { 
                step: "03",
                title: "Design", 
                tag: "Phase 03 // Craft",
                icon: PenTool,
                desc: "Rapid wireframing, high-fidelity UI systems, and interactive micro-prototypes tested with real users." 
              },
              { 
                step: "04",
                title: "Deliver", 
                tag: "Phase 04 // Launch",
                icon: Rocket,
                desc: "Pixel-perfect developer handoff, production-grade token systems, and post-launch QA metrics." 
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-8 border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[16px_16px_0px_0px_rgba(37,99,235,1)] transition-all flex flex-col justify-between h-full relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-4xl font-black font-mono tracking-tighter text-stroke-zinc text-transparent group-hover:text-blue-600 group-hover:text-stroke-zinc transition-colors">
                        {step.step}
                      </span>
                      <div className="p-3 bg-zinc-100 border-2 border-zinc-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon size={24} />
                      </div>
                    </div>

                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                      {step.tag}
                    </span>
                    <h3 className="text-3xl font-black uppercase tracking-wide mb-4 text-zinc-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-base font-bold text-zinc-600 leading-relaxed mt-4 border-t-2 border-zinc-200 pt-4">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media / Interactive Showreel Section */}
      <section className="py-28 px-6 border-t-4 border-b-4 border-zinc-900 bg-zinc-900 flex justify-center text-white relative">
        <div className="max-w-[90rem] w-full relative">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                2026 Interactive Reel
              </h2>
            </div>
            <p className="text-zinc-400 font-bold max-w-sm mt-4 md:mt-0 text-sm md:text-base">
              Explore 60 seconds of fluid UI transitions, micro-interactions, and mobile prototypes in motion.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.8 }}
            onClick={() => setShowreelOpen(true)}
            className="w-full aspect-video md:aspect-[21/9] bg-zinc-800 border-4 border-white relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-[16px_16px_0px_0px_rgba(255,255,255,1)]"
          >
            {/* Ambient Background with Overlay */}
            <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80"></div>
            
            {/* Center Play Button & Soundwave */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 md:w-32 md:h-32 bg-white text-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              >
                <Play size={36} className="fill-zinc-900 translate-x-1" />
              </motion.div>
              
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-2">
                Launch Showreel
              </h3>
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase px-4 py-1.5 border border-white/30 rounded-full backdrop-blur-sm">
                Runtime: 01:15 &bull; 4K 60FPS
              </span>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-6 left-6 font-mono text-xs text-white/60 tracking-widest">
              REC ● [ 00:48:12 ]
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-xs text-white/60 tracking-widest">
              AUDIO: STEREO &bull; 48kHz
            </div>
          </motion.div>
        </div>
      </section>

      {/* Showreel Interactive Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black border-4 border-white shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-center items-center">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowreelOpen(false)}
                className="absolute -top-14 right-0 text-white flex items-center gap-2 font-black uppercase tracking-widest text-sm hover:text-blue-400"
              >
                <span>Close [ESC]</span>
                <X size={24} />
              </button>

              {/* Showreel Video / Interactive Simulation */}
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white mb-6 animate-pulse">
                  <Play size={28} className="fill-white translate-x-0.5" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                  Interactive Showreel Player
                </h3>
                <p className="text-zinc-400 max-w-lg font-medium text-lg mb-8">
                  You can link your hosted YouTube, Vimeo, or MP4 video URL directly in the Admin Dashboard to stream your showreel here.
                </p>
                <button 
                  onClick={() => setShowreelOpen(false)}
                  className="px-8 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Return To Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About & Verified Credentials Section */}
      <section id="about" className="py-28 px-6 bg-white border-b-4 border-zinc-900 scroll-mt-20">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b-4 border-zinc-900 pb-8 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest mb-3">
                <Award size={14} /> Certified Product Designer
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                About &amp; Credentials
              </h2>
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-zinc-900 bg-zinc-900 text-white text-base font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:bg-blue-600 transition-all"
            >
              <span>View Full Career &amp; Bio</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Bio & Quick Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full max-w-sm aspect-[4/5] mx-auto lg:mx-0 border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Shihabul Islam" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md p-3 text-white border border-white/20">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest block">
                    Md. Shihabul Islam
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    Senior Product &amp; UX/UI Designer
                  </span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-zinc-700 font-medium leading-relaxed">
                {profile.aboutText || "A passionate UX/UI Designer with 2 years of experience developing live projects and robust case studies at a fast-paced agency."}
              </p>
            </div>

            {/* Right: Featured Microsoft Certificate Card */}
            <div className="lg:col-span-7 bg-[#f8f8f5] border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] p-6 md:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-widest">
                    Microsoft
                  </span>
                  <span className="px-3 py-1 bg-white text-zinc-900 text-xs font-bold uppercase tracking-wider border border-zinc-300">
                    Coursera Verified
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  Issued Sep 15, 2026
                </span>
              </div>

              <div className="w-full aspect-[16/10] relative bg-white border-2 border-zinc-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] group">
                <Image 
                  src="/uploads/microsoft-product-design-certificate.jpg" 
                  alt="Microsoft Product Design and UX/UI Fundamentals Certificate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <a 
                  href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black uppercase tracking-widest text-xs gap-2"
                >
                  <span>Verify Credential on Coursera ↗</span>
                </a>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight mb-2">
                  Product Design and UX/UI Fundamentals
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
                  Accredited by Microsoft. Demonstrates certified mastery in user research, interactive wireframing, heuristic analysis, UI design systems, and usability testing.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center justify-between border-t-2 border-zinc-200">
                <a 
                  href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] border-2 border-zinc-900"
                >
                  <span>Verify Credential on Coursera ↗</span>
                </a>
                <span className="text-xs font-mono text-zinc-400">
                  ID: J4W0KI4VK2S6
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials - Infinite Marquee with Gradient Fade Edges */}
      <section className="py-32 overflow-hidden border-b-4 border-zinc-900 relative">
        
        {/* Left & Right Fade Masks for Seamless Infinite Scroll */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-r from-[#f8f8f5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-l from-[#f8f8f5] to-transparent z-10" />

        <div className="max-w-[90rem] mx-auto px-6 mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase"
          >
            Client Words
          </motion.h2>
        </div>
        
        <div className="flex w-max animate-marquee whitespace-nowrap py-4 hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                { 
                  name: "Sarah Jenkins", 
                  role: "Head of Product, Fintech Hub", 
                  company: "San Francisco",
                  text: "Shihab transformed our messy app into a frictionless, award-winning experience. Our user retention jumped 38% after launch." 
                },
                { 
                  name: "Marcus Thorne", 
                  role: "Founder & CEO, Loomix", 
                  company: "London",
                  text: "Fast, dependable, and creatively brilliant. His brutalist editorial aesthetic made our brand stand out in a sea of generic SaaS." 
                },
                { 
                  name: "Elena Rostova", 
                  role: "Design Director, Studio K", 
                  company: "Berlin",
                  text: "One of the most meticulous designers I've ever worked with. The Figma component tokens saved our dev team hundreds of hours." 
                },
                { 
                  name: "David Chen", 
                  role: "VP Engineering, Apex Labs", 
                  company: "Singapore",
                  text: "Shihab doesn't just design pretty screens—he understands engineering constraints and designs robust scalable systems." 
                },
              ].map((testi, idx) => (
                <div 
                  key={idx} 
                  className="w-[380px] md:w-[480px] bg-white p-8 border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] transition-all mx-6 whitespace-normal flex-shrink-0 flex flex-col justify-between"
                >
                  <div>
                    {/* 5 Stars Rating */}
                    <div className="flex text-amber-500 mb-6 gap-1">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className="text-xl">★</span>
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-xl font-bold leading-snug mb-8 text-zinc-800 italic">
                      "{testi.text}"
                    </p>
                  </div>

                  <div className="border-t-2 border-zinc-900 pt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                        {testi.name}
                      </h4>
                      <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">
                        {testi.role}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                      {testi.company}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Big Impact Skills Marquee */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden relative rotate-[-1.5deg] scale-105 border-y-4 border-white">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {marqueeSkills.map((word, idx) => (
                <span 
                  key={idx} 
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter px-10 text-transparent bg-clip-text hover:text-white transition-colors cursor-default" 
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  {word} &bull;
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Massive CTA & Interactive Collaboration Section */}
      <section className="py-40 px-6 max-w-[90rem] mx-auto text-center relative">
        <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-[0.88] mb-12 select-none">
          Let's Build <br className="hidden md:inline" />
          <span className="text-zinc-400 italic font-serif lowercase tracking-normal">something</span> <br />
          Great.
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-xl mx-auto mb-16">
          
          {/* Direct Email Link */}
          <a 
            href={`mailto:${profile.email || "hello@example.com"}`} 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-zinc-900 text-white font-black text-lg uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] border-2 border-zinc-900"
          >
            Send Email Directly
          </a>

          {/* One-Click Copy Button */}
          <button 
            onClick={copyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-zinc-900 font-black text-lg uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] border-2 border-zinc-900 active:translate-x-1 active:translate-y-1"
          >
            {copied ? (
              <>
                <Check size={20} className="text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social / Direct Connect Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-black uppercase tracking-widest border-t-2 border-zinc-900/20 pt-12 max-w-3xl mx-auto">
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
              className="hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
            >
              <span>{social.label}</span>
              <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          ))}
        </div>

        {/* Footer Credit */}
        <div className="mt-16 text-xs font-bold text-zinc-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {profile.name || "SHIHAB"} &bull; Designed & Built with Precision
        </div>
      </section>

    </main>
  );
}
