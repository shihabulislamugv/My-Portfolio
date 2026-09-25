"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, Check, X } from "lucide-react";

export default function ExperienceManager({ initialExperiences }: { initialExperiences: any[] }) {
  const router = useRouter();
  const [experiences, setExperiences] = useState(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
    order: 0,
  });

  const resetForm = () => {
    setFormData({ role: "", company: "", period: "", description: "", order: experiences.length });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (exp: any) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/experience/${id}`, { method: "DELETE" });
      setExperiences(experiences.filter(e => e.id !== id));
      router.refresh();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`/api/experience/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setExperiences(experiences.map(e => e.id === editingId ? updated.experience : e));
          resetForm();
          router.refresh();
        } else {
          const data = await res.json().catch(() => ({}));
          alert(`Failed to update experience: ${data.error || res.statusText || res.status}`);
          return;
        }
      } else {
        const res = await fetch(`/api/experience`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setExperiences([...experiences, created.experience]);
          resetForm();
          router.refresh();
        } else {
          const data = await res.json().catch(() => ({}));
          alert(`Failed to create experience: ${data.error || res.statusText || res.status}`);
          return;
        }
      }
    } catch (error: any) {
      alert(`Failed to save: ${error?.message || error}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* List */}
      <div className="bg-white border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between p-8 border-b-4 border-zinc-900 last:border-0">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-zinc-900">{exp.role}</h3>
              <p className="text-lg font-bold text-zinc-500 mt-2">{exp.company} &bull; {exp.period}</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:scale-125 transition-transform"><Edit2 size={24} strokeWidth={3} /></button>
              <button onClick={() => handleDelete(exp.id)} className="text-red-600 hover:scale-125 transition-transform"><Trash2 size={24} strokeWidth={3} /></button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && !isAdding && (
          <div className="p-12 text-center text-zinc-500 font-bold uppercase tracking-widest text-xl">No experience added yet.</div>
        )}
      </div>

      {!isAdding && !editingId && (
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
        >
          <Plus size={24} strokeWidth={3} /> Add Experience
        </button>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="bg-white p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] space-y-8 mt-12">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">{editingId ? "Edit Experience" : "Add Experience"}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Role / Job Title</label>
              <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Company Name</label>
              <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Period (e.g. 2020 - 2022)</label>
            <input required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Description (Markdown supported)</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" />
          </div>

          <div className="flex gap-6 pt-6">
            <button type="submit" className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform"><Check size={24} strokeWidth={3} /> Save</button>
            <button type="button" onClick={resetForm} className="flex items-center gap-3 px-10 py-5 bg-zinc-200 text-zinc-900 font-black uppercase tracking-widest hover:bg-zinc-300 transition-colors"><X size={24} strokeWidth={3} /> Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
