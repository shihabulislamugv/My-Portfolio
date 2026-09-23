import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex-1 max-w-[90rem] mx-auto px-6 pt-36 pb-32 w-full">
      {/* Return Home */}
      <div className="mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-black uppercase tracking-widest text-sm transition"
        >
          <ArrowLeft size={18} strokeWidth={3} /> Return to Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-24 md:mb-32 border-b-4 border-zinc-900 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-[12vw] leading-[0.88] font-black tracking-tighter uppercase select-none">
            Selected <br />
            <span className="text-zinc-400 italic font-serif lowercase tracking-normal">work.</span>
          </h1>
        </div>
        <div className="max-w-md">
          <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed mb-4">
            A curated index of live client engagements, mobile product designs, design systems, and rapid prototypes.
          </p>
          <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-zinc-900 text-white inline-block">
            Total Projects Documented: {projects.length}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {projects.length === 0 ? (
          <p className="col-span-full text-zinc-500 py-32 text-center text-2xl font-bold uppercase tracking-widest border-4 border-zinc-200 border-dashed">
            No projects found. Add projects via the Admin Dashboard.
          </p>
        ) : (
          projects.map((project, index) => (
            <div key={project.id} className={`group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
              <Link href={`/projects/${project.slug}`} className="block">
                
                {/* Image card */}
                <div className="w-full bg-zinc-200 overflow-hidden mb-8 relative border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] group-hover:shadow-[20px_20px_0px_0px_rgba(37,99,235,1)] group-hover:-translate-y-2 transition-all duration-500">
                  <div className="aspect-[4/3] md:aspect-[16/11] relative w-full">
                    {project.thumbnail ? (
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
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
                </div>

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
                  
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-3 text-base font-black uppercase tracking-widest text-zinc-900 group-hover:text-blue-600 group-hover:gap-5 transition-all">
                      <span>Explore Case Study</span> 
                      <ArrowRight strokeWidth={3} size={20} />
                    </span>
                  </div>
                </div>

              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
