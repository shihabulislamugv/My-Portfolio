"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, Check, X } from "lucide-react";

export default function SkillManager({ initialSkills }: { initialSkills: any[] }) {
  const router = useRouter();
  const [skills, setSkills] = useState(initialSkills);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    order: 0,
  });

  const resetForm = () => {
    setFormData({ name: "", order: skills.length });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (skill: any) => {
    setFormData(skill);
    setEditingId(skill.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      setSkills(skills.filter(s => s.id !== id));
      router.refresh();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`/api/skills/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setSkills(skills.map(s => s.id === editingId ? updated.skill : s));
          resetForm();
          router.refresh();
        } else {
          const data = await res.json().catch(() => ({}));
          alert(`Failed to update skill: ${data.error || res.statusText || res.status}`);
          return;
        }
      } else {
        const res = await fetch(`/api/skills`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setSkills([...skills, created.skill]);
          resetForm();
          router.refresh();
        } else {
          const data = await res.json().catch(() => ({}));
          alert(`Failed to create skill: ${data.error || res.statusText || res.status}`);
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
      <div className="bg-white border-4 border-zinc-900 p-8 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-wrap gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4 px-6 py-3 bg-zinc-100 border-4 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
              <span className="font-black uppercase tracking-widest text-lg">{skill.name}</span>
              <div className="flex gap-4 ml-4 border-l-4 border-zinc-900 pl-4">
                <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:scale-125 transition-transform"><Edit2 size={18} strokeWidth={3} /></button>
                <button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:scale-125 transition-transform"><Trash2 size={18} strokeWidth={3} /></button>
              </div>
            </div>
          ))}
          {skills.length === 0 && !isAdding && (
            <div className="text-zinc-500 w-full text-center py-8 font-bold uppercase tracking-widest text-xl">No skills added yet.</div>
          )}
        </div>
      </div>

      {!isAdding && !editingId && (
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
        >
          <Plus size={24} strokeWidth={3} /> Add Skill
        </button>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="bg-white p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] space-y-8 max-w-2xl mt-12">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">{editingId ? "Edit Skill" : "Add Skill"}</h3>
          
          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Skill Name (e.g. Figma, UI Design)</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" />
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
