"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects?published=true&t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1 max-w-[90rem] mx-auto px-6 pt-28 md:pt-32 pb-24 w-full">
      {/* Return Home */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-black uppercase tracking-widest text-sm transition"
        >
          <ArrowLeft size={18} strokeWidth={3} /> Return to Home
        </Link>
      </motion.div>

      {/* Header - Animated like About page, but snappy & fast */}
      <div className="mb-14 md:mb-16 border-b-4 border-zinc-900 pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] select-none">
            Selected <br />
            <span className="text-zinc-400 italic font-serif lowercase tracking-normal">work.</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md"
        >
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-medium leading-relaxed mb-4">
            A curated index of live client engagements, mobile product designs, design systems, and rapid prototypes.
          </p>
          <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-zinc-900 text-white inline-block">
            Total Projects Documented: {projects.length}
          </span>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className={`space-y-6 animate-pulse ${i % 2 !== 0 ? 'md:mt-24' : ''}`}>
              <div className="aspect-[4/3] md:aspect-[16/11] bg-zinc-200 border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-zinc-300 rounded" />
                <div className="h-8 w-3/4 bg-zinc-300 rounded" />
                <div className="h-4 w-full bg-zinc-200 rounded" />
              </div>
            </div>
          ))
        ) : projects.length === 0 ? (
          <p className="col-span-full text-zinc-500 py-32 text-center text-2xl font-bold uppercase tracking-widest border-4 border-zinc-200 border-dashed">
            No projects found. Add projects via the Admin Dashboard.
          </p>
        ) : (
          projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                
                {/* Image card */}
                <motion.div 
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-zinc-200 overflow-hidden mb-8 relative border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] group-hover:shadow-[20px_20px_0px_0px_rgba(37,99,235,1)] transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] md:aspect-[16/11] relative w-full">
                    {project.thumbnail ? (
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 font-black text-6xl">
                        {project.title.charAt(0)}
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-mono font-bold uppercase tracking-widest border border-white/20">
                        // 0{index + 1}
                      </span>
                    </div>

                    {project.timeline && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-bold uppercase tracking-widest border border-zinc-900">
                          {project.timeline}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Details */}
                <div className="space-y-3">
                  {project.role && (
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600 block">
                      {project.role}
                    </span>
                  )}
                  
                  <h3 className="text-3xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-none">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-zinc-600 font-medium line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-900 group-hover:text-blue-600 transition-colors">
                    <span>Explore Case Study</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
