"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, Check, X, GraduationCap } from "lucide-react";

export default function AcademicManager({ initialAcademics }: { initialAcademics: any[] }) {
  const router = useRouter();
  const [academics, setAcademics] = useState(initialAcademics);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    description: "",
    order: 0,
  });

  const resetForm = () => {
    setFormData({ degree: "", institution: "", period: "", description: "", order: academics.length });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      degree: item.degree || "",
      institution: item.institution || "",
      period: item.period || "",
      description: item.description || "",
      order: item.order ?? academics.length,
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this academic qualification?")) return;
    try {
      const res = await fetch(`/api/academic/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAcademics(academics.filter(a => a.id !== id));
        router.refresh();
      } else {
        alert("Failed to delete entry");
      }
    } catch (e) {
      alert("Failed to delete entry");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/academic/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setAcademics(academics.map(a => a.id === editingId ? updated.academic : a));
          resetForm();
          router.refresh();
        } else {
          alert("Failed to update entry");
        }
      } else {
        const res = await fetch(`/api/academic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setAcademics([...academics, created.academic]);
          resetForm();
          router.refresh();
        } else {
          alert("Failed to create entry");
        }
      }
    } catch (error) {
      alert("An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* List */}
      <div className="bg-white border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        {academics.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-8 border-b-4 border-zinc-900 last:border-0 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-50 border border-blue-200 text-blue-700">
                  <GraduationCap size={18} />
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">{item.degree}</h3>
              </div>
              <p className="text-lg font-bold text-zinc-600">
                {item.institution} &bull; <span className="font-mono text-sm text-zinc-500">{item.period}</span>
              </p>
              {item.description && (
                <p className="text-sm text-zinc-500 max-w-2xl whitespace-pre-wrap">{item.description}</p>
              )}
            </div>
            <div className="flex items-center gap-6 shrink-0 self-end sm:self-center">
              <button 
                onClick={() => handleEdit(item)} 
                title="Edit entry"
                className="text-blue-600 hover:scale-125 transition-transform"
              >
                <Edit2 size={24} strokeWidth={3} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                title="Delete entry"
                className="text-red-600 hover:scale-125 transition-transform"
              >
                <Trash2 size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}

        {academics.length === 0 && !isAdding && (
          <div className="p-12 text-center text-zinc-500 font-bold uppercase tracking-widest text-xl">
            No academic qualifications added yet.
          </div>
        )}
      </div>

      {!isAdding && !editingId && (
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
        >
          <Plus size={24} strokeWidth={3} /> Add Academic Qualification
        </button>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="bg-white p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] space-y-8 mt-12">
          <div className="flex items-center justify-between border-b-4 border-zinc-900 pb-6 mb-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              {editingId ? "Edit Qualification" : "Add Qualification"}
            </h3>
            <button type="button" onClick={resetForm} className="text-zinc-500 hover:text-black">
              <X size={28} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">
                Degree / Qualification Title
              </label>
              <input 
                required 
                placeholder="e.g. B.Sc. in Computer Science & Engineering"
                value={formData.degree} 
                onChange={e => setFormData({...formData, degree: e.target.value})} 
                className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">
                Institution / University / Board
              </label>
              <input 
                required 
                placeholder="e.g. University of Dhaka"
                value={formData.institution} 
                onChange={e => setFormData({...formData, institution: e.target.value})} 
                className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">
                Period / Years
              </label>
              <input 
                required 
                placeholder="e.g. 2020 - 2024"
                value={formData.period} 
                onChange={e => setFormData({...formData, period: e.target.value})} 
                className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-zinc-900">
                Display Order
              </label>
              <input 
                type="number"
                value={formData.order} 
                onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900">
              Description / Major / Achievements (Optional)
            </label>
            <textarea 
              placeholder="e.g. Major in Human-Computer Interaction, Information Architecture, and System Engineering. Dean's Honor Roll."
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              rows={5} 
              className="w-full px-6 py-4 bg-transparent border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-bold" 
            />
          </div>

          <div className="flex gap-6 pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Check size={24} strokeWidth={3} /> {loading ? "Saving..." : "Save Qualification"}
            </button>
            <button 
              type="button" 
              onClick={resetForm} 
              className="flex items-center gap-3 px-10 py-5 bg-zinc-200 text-zinc-900 font-black uppercase tracking-widest hover:bg-zinc-300 transition-colors"
            >
              <X size={24} strokeWidth={3} /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
