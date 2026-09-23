import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import { DeleteProjectButton } from "../components/DeleteProjectButton";

export default async function AdminDashboard() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Projects Manager</h1>
        <Link 
          href="/admin/projects/new"
          className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
        >
          <PlusCircle size={24} strokeWidth={3} />
          New Project
        </Link>
      </div>

      <div className="bg-white border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-100 border-b-4 border-zinc-900">
            <tr>
              <th className="px-8 py-6 font-black uppercase tracking-widest">Project</th>
              <th className="px-8 py-6 font-black uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 font-black uppercase tracking-widest">Date</th>
              <th className="px-8 py-6 font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-zinc-900">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 font-bold uppercase tracking-widest text-xl">
                  No projects found. Create your first project to get started!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-zinc-50 transition">
                  <td className="px-8 py-6 font-black text-xl uppercase">{project.title}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 text-sm font-black uppercase tracking-widest border-2 border-zinc-900 ${project.published ? 'bg-green-300' : 'bg-yellow-300'}`}>
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-zinc-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-6">
                      <Link href={`/admin/projects/${project.id}/edit`} className="text-blue-600 hover:scale-125 transition-transform">
                        <Edit size={24} strokeWidth={3} />
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
