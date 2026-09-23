"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
    thumbnail: project.thumbnail || "",
    role: project.role || "",
    timeline: project.timeline || "",
    problem: project.problem || "",
    solution: project.solution || "",
    externalLink: project.externalLink || "",
    caseStudy: project.caseStudy || "",
    published: project.published || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as any;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formPayload = new FormData();
    formPayload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, thumbnail: data.url }));
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-bold uppercase tracking-widest mb-10 transition">
        <ArrowLeft size={20} strokeWidth={3} /> Back to Projects
      </Link>
      
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Project Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">URL Slug</label>
            <input 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Short Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required
            rows={3}
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Thumbnail Image / Video</label>
            <div className="flex flex-col gap-2">
              <input 
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full px-4 py-3 bg-transparent border-4 border-zinc-900 focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-black file:bg-zinc-900 file:text-white hover:file:bg-zinc-800"
              />
              {uploading && <span className="text-sm font-bold text-blue-600 animate-pulse">Uploading...</span>}
              {formData.thumbnail && (
                <div className="text-xs font-bold text-green-600 break-all">
                  Uploaded: {formData.thumbnail}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">External Link (optional)</label>
            <input 
              name="externalLink" 
              value={formData.externalLink} 
              onChange={handleChange} 
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Your Role (optional)</label>
            <input 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Timeline (optional)</label>
            <input 
              name="timeline" 
              value={formData.timeline} 
              onChange={handleChange} 
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">The Problem (optional)</label>
          <textarea 
            name="problem" 
            value={formData.problem} 
            onChange={handleChange} 
            rows={4}
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">The Solution (optional)</label>
          <textarea 
            name="solution" 
            value={formData.solution} 
            onChange={handleChange} 
            rows={4}
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Full Case Study Content (Markdown)</label>
          <textarea 
            name="caseStudy" 
            value={formData.caseStudy} 
            onChange={handleChange} 
            rows={12}
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-mono text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-4 bg-zinc-100 p-6 border-4 border-zinc-900">
          <input 
            type="checkbox" 
            id="published" 
            name="published" 
            checked={formData.published} 
            onChange={handleChange} 
            className="w-6 h-6 border-4 border-zinc-900 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="published" className="text-lg font-black uppercase tracking-widest cursor-pointer">
            Publish this project publicly
          </label>
        </div>

        <div className="pt-8 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
