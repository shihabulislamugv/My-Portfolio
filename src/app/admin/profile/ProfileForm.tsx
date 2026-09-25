"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    headlineLine1: initialData.headlineLine1 || "",
    headlineLine2: initialData.headlineLine2 || "",
    shortBio: initialData.shortBio || "",
    email: initialData.email || "",
    aboutText: initialData.aboutText || "",
    resumeUrl: initialData.resumeUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        alert("Profile updated successfully!");
      } else {
        const data = await res.json().catch(() => ({}));
        const message = data.error || `HTTP ${res.status}: ${res.statusText || "Server Error"}`;
        alert(`Failed to update profile: ${message}`);
      }
    } catch (error: any) {
      console.error(error);
      alert(`Error saving profile: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Display Name (Logo)</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Contact Email</label>
          <input 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Hero Headline (Line 1)</label>
          <input 
            name="headlineLine1" 
            value={formData.headlineLine1} 
            onChange={handleChange} 
            required
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Hero Headline (Line 2)</label>
          <input 
            name="headlineLine2" 
            value={formData.headlineLine2} 
            onChange={handleChange} 
            required
            className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-serif italic"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Hero Short Bio</label>
        <textarea 
          name="shortBio" 
          value={formData.shortBio} 
          onChange={handleChange} 
          required
          rows={3}
          className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Full About Page Text</label>
        <textarea 
          name="aboutText" 
          value={formData.aboutText} 
          onChange={handleChange} 
          required
          rows={6}
          className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Resume Link (Google Drive / PDF URL)</label>
        <input 
          name="resumeUrl" 
          value={formData.resumeUrl} 
          onChange={handleChange}
          placeholder="https://drive.google.com/..."
          className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold"
        />
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={loading}
          className="px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
