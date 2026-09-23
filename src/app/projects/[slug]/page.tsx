import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowLeft, ArrowRight, Target, Lightbulb, FileText } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  // Fetch adjacent project for "Next Project" link
  const nextProject = await prisma.project.findFirst({
    where: { 
      published: true,
      NOT: { id: project.id }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex-1 px-6 pt-36 pb-32 max-w-[90rem] mx-auto w-full">
      
      {/* Return link */}
      <div className="mb-12">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-black uppercase tracking-widest text-sm transition"
        >
          <ArrowLeft strokeWidth={3} size={18} /> Back to all projects
        </Link>
      </div>
      
      {/* Case Study Header */}
      <header className="mb-20">
        <h1 className="text-[10vw] md:text-[6vw] leading-[0.92] font-black mb-8 tracking-tighter text-zinc-900 uppercase">
          {project.title}
        </h1>
        <p className="text-2xl md:text-4xl text-zinc-700 max-w-4xl leading-tight font-medium mb-16">
          {project.description}
        </p>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y-4 border-zinc-900 py-8 items-center">
          {project.role && (
            <div>
              <h3 className="text-xs font-black text-zinc-400 mb-1.5 uppercase tracking-widest">Role & Scope</h3>
              <p className="text-zinc-900 font-black text-lg uppercase tracking-wider">{project.role}</p>
            </div>
          )}
          {project.timeline && (
            <div>
              <h3 className="text-xs font-black text-zinc-400 mb-1.5 uppercase tracking-widest">Timeline</h3>
              <p className="text-zinc-900 font-black text-lg uppercase tracking-wider">{project.timeline}</p>
            </div>
          )}
          <div>
            <h3 className="text-xs font-black text-zinc-400 mb-1.5 uppercase tracking-widest">Platform</h3>
            <p className="text-zinc-900 font-black text-lg uppercase tracking-wider">Web & Mobile</p>
          </div>
          {project.externalLink ? (
            <div className="col-span-2 md:col-span-1 md:text-right">
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] border-2 border-zinc-900"
              >
                <span>Launch Live</span>
                <ExternalLink size={16} strokeWidth={3} />
              </a>
            </div>
          ) : (
            <div className="col-span-2 md:col-span-1 md:text-right">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                Internal / NDA
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Feature Thumbnail */}
      {project.thumbnail && (
        <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden mb-28 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)]">
          <Image 
            src={project.thumbnail} 
            alt={project.title} 
            fill 
            className="object-cover" 
            priority
          />
        </div>
      )}

      {/* Structured Case Study Sections */}
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* The Problem Panel */}
        {project.problem && (
          <div className="p-8 md:p-14 bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-zinc-200 pb-4">
              <div className="p-2.5 bg-rose-100 border-2 border-zinc-900 text-rose-600">
                <Target size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                The Problem
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-zinc-700 leading-relaxed font-medium">
              {project.problem}
            </p>
          </div>
        )}

        {/* The Solution Panel */}
        {project.solution && (
          <div className="p-8 md:p-14 bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-zinc-200 pb-4">
              <div className="p-2.5 bg-blue-100 border-2 border-zinc-900 text-blue-600">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                The Solution & Impact
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-zinc-700 leading-relaxed font-medium">
              {project.solution}
            </p>
          </div>
        )}

        {/* Comprehensive Narrative / Case Study Body */}
        {project.caseStudy && (
          <div className="p-8 md:p-14 bg-[#f8f8f5] border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex items-center justify-between mb-10 border-b-2 border-zinc-300 pb-6">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-blue-600" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900">
                  Detailed Design Walkthrough
                </h3>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-mono font-medium uppercase tracking-wider border border-zinc-300">
                Full UX Documentation
              </span>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg text-zinc-700 leading-relaxed font-normal">
              {project.caseStudy.split('\n\n').map((paragraph: string, pIdx: number) => {
                const trimmed = paragraph.trim();
                
                // Divider
                if (trimmed === '---') {
                  return <hr key={pIdx} className="border-t border-zinc-200 my-8" />;
                }

                // H3 Header
                if (trimmed.startsWith('### ')) {
                  return (
                    <div key={pIdx} className="pt-6 pb-2 border-b border-zinc-200">
                      <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-blue-600 inline-block shrink-0"></span>
                        <span>{trimmed.replace('### ', '')}</span>
                      </h4>
                    </div>
                  );
                }

                // H4 Header
                if (trimmed.startsWith('#### ')) {
                  return (
                    <div key={pIdx} className="pt-4">
                      <h5 className="text-lg md:text-xl font-semibold text-zinc-900">
                        {trimmed.replace('#### ', '')}
                      </h5>
                    </div>
                  );
                }

                // Bullet List
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
                  return (
                    <ul key={pIdx} className="space-y-2 pl-2">
                      {items.map((item, itemIdx) => {
                        const cleanItem = item.replace(/^[-*]\s+/, '').replace(/\*\*/g, '');
                        return (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2.5 shrink-0"></span>
                            <span className="leading-relaxed text-zinc-600 font-normal">
                              {cleanItem}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                // Numbered Steps List
                if (/^\d+\.\s/.test(trimmed)) {
                  const items = trimmed.split('\n').filter(line => /^\d+\.\s/.test(line.trim()));
                  return (
                    <ol key={pIdx} className="space-y-3 pl-1">
                      {items.map((item, itemIdx) => {
                        const match = item.match(/^(\d+)\.\s*(.*)$/);
                        const num = match ? match[1] : itemIdx + 1;
                        const text = (match ? match[2] : item).replace(/\*\*/g, '');
                        return (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-300 text-xs font-mono font-medium text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                              {num}
                            </span>
                            <span className="leading-relaxed text-zinc-600 font-normal">
                              {text}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  );
                }

                // Regular Paragraph
                return (
                  <p key={pIdx} className="leading-relaxed text-zinc-600 font-normal">
                    {trimmed.replace(/\*\*/g, '')}
                  </p>
                );
              })}
            </div>
          </div>
        )}

      </div>
      
      {/* Next Project / Archive Footer */}
      <div className="mt-40 pt-20 border-t-4 border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
            Continue Reading
          </span>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {nextProject ? nextProject.title : "All Case Studies"}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/projects" 
            className="px-8 py-5 border-2 border-zinc-900 bg-white font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]"
          >
            All Work
          </Link>
          {nextProject && (
            <Link 
              href={`/projects/${nextProject.slug}`} 
              className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]"
            >
              <span>Next Project</span>
              <ArrowRight size={18} strokeWidth={3} />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
