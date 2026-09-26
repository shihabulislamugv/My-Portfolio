import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, UserCircle, Briefcase, GraduationCap, Wrench, FolderKanban, ShieldCheck } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-4 border-zinc-900 flex flex-col">
        <div className="p-6 border-b-4 border-zinc-900">
          <Link href="/" className="text-2xl font-black tracking-widest uppercase">
            Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <Briefcase size={20} />
            <span>Experience</span>
          </Link>
          <Link href="/admin/academic" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <GraduationCap size={20} />
            <span>Academic</span>
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <Wrench size={20} />
            <span>Skills</span>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <FolderKanban size={20} />
            <span>Projects</span>
          </Link>
          <Link href="/admin/security" className="flex items-center gap-3 px-4 py-3 text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-widest transition">
            <ShieldCheck size={20} />
            <span>Security</span>
          </Link>
        </nav>

        <div className="p-4 border-t-4 border-zinc-900">
          <form action="/api/auth/signout" method="POST">
             <button type="submit" className="w-full text-left px-4 py-3 font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition border-2 border-transparent hover:border-red-600">
               Sign Out
             </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
