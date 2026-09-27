"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, AlertCircle, ArrowDownToLine, Trash2, CheckCircle2, X, Image as ImageIcon } from "lucide-react";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    logoUrl: initialData.logoUrl || "/images/logo.png",
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formPayload = new FormData();
    formPayload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, logoUrl: data.url }));
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      console.error(err);
      alert("Error uploading logo: " + (err?.message || err));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPdfError("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPdfError("File size is too large. Please upload a PDF under 10MB.");
      return;
    }

    setPdfError("");
    setSuccessMsg("");
    setUploadingPdf(true);
    setResumeFileName(file.name);

    try {
      // Convert to Base64 Data URL directly in browser: 100% reliable on Vercel serverless
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result as string;
        setFormData((prev) => ({ ...prev, resumeUrl: base64Url }));
        setUploadingPdf(false);
        setSuccessMsg("PDF loaded! Click 'Save Profile' below to apply changes.");
      };
      reader.onerror = () => {
        setPdfError("Could not read the PDF file.");
        setUploadingPdf(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      setPdfError("An error occurred during PDF processing.");
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg("Profile and Resume updated successfully!");
        router.refresh();
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)]">
      {successMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-600 text-emerald-900 flex items-center gap-3 font-bold text-sm">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Brand Logo Upload Section */}
      <div className="p-6 bg-[#f8f8f5] border-4 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4">
        <div>
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
            <ImageIcon size={18} className="text-blue-600" />
            <span>Brand Logo (Image)</span>
          </label>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
            Displays in header navigation instead of plain text
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
          {/* Logo Visual Preview Box */}
          <div className="h-24 w-36 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex items-center justify-center p-2 relative shrink-0">
            {formData.logoUrl ? (
              <img 
                src={formData.logoUrl} 
                alt="Brand Logo Preview" 
                className="max-h-full max-w-full object-contain" 
              />
            ) : (
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">No Logo</span>
            )}
          </div>

          {/* Action buttons and URL input */}
          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <label className="px-5 py-3 bg-zinc-900 hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest border-2 border-zinc-900 shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2">
                <Upload size={14} />
                <span>{uploadingLogo ? "Uploading..." : "Upload New Logo"}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoUpload} 
                  disabled={uploadingLogo} 
                  className="hidden" 
                />
              </label>

              {formData.logoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, logoUrl: "" }))}
                  className="px-4 py-3 bg-white text-red-600 hover:bg-red-50 text-xs font-black uppercase tracking-widest border-2 border-red-600 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] transition-all inline-flex items-center gap-1.5"
                >
                  <X size={14} />
                  <span>Reset / Text Only</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-zinc-500">
                Logo URL or Path
              </label>
              <input 
                name="logoUrl" 
                value={formData.logoUrl} 
                onChange={handleChange} 
                placeholder="/images/logo.png or image URL"
                className="w-full px-4 py-2.5 bg-white border-2 border-zinc-900 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-black uppercase tracking-widest text-zinc-900">Display Name / Fallback Text</label>
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

      {/* Resume Section with PDF File Upload */}
      <div className="space-y-4 p-6 border-4 border-zinc-900 bg-zinc-50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <label className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              Resume / Curriculum Vitae (PDF)
            </label>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
              Upload your PDF resume. Visitors clicking "Resume" on your website will instantly download this file.
            </p>
          </div>
        </div>

        {/* Upload Button & Trigger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <label className="cursor-pointer inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 text-white font-black uppercase tracking-wider text-xs border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:bg-blue-700 transition active:translate-x-0.5 active:translate-y-0.5">
            <Upload size={16} />
            <span>{uploadingPdf ? "Loading PDF..." : "Upload New PDF Resume"}</span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handlePdfUpload}
              disabled={uploadingPdf}
              className="hidden"
            />
          </label>

          <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
            PDF files only (Instant direct download)
          </span>
        </div>

        {pdfError && (
          <div className="text-xs font-bold text-red-600 flex items-center gap-2 p-2 bg-red-50 border border-red-200">
            <AlertCircle size={14} />
            <span>{pdfError}</span>
          </div>
        )}

        {/* Current Active Resume File Status */}
        {formData.resumeUrl ? (
          <div className="p-4 bg-white border-2 border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                <FileText size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-wider text-zinc-900 truncate">
                  Active Resume: {
                    formData.resumeUrl.startsWith('data:')
                      ? (resumeFileName || "Uploaded PDF Resume")
                      : formData.resumeUrl.split('/').pop()
                  }
                </p>
                <p className="text-[11px] font-mono text-zinc-500 truncate">
                  {formData.resumeUrl.startsWith('data:') ? "Embedded PDF Document (Vercel Compatible)" : formData.resumeUrl}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={formData.resumeUrl.startsWith('data:') ? formData.resumeUrl : "/api/resume/download"}
                download="Md_Shihabul_Islam_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] border border-zinc-900"
              >
                <ArrowDownToLine size={14} />
                <span>Test Download</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, resumeUrl: "" }));
                  setResumeFileName("");
                }}
                className="p-2 text-zinc-400 hover:text-red-600 border border-transparent hover:border-red-200 transition"
                title="Remove resume"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-bold">
            No resume uploaded yet. Click &quot;Upload New PDF Resume&quot; above to select your PDF file.
          </div>
        )}

        {/* Optional Manual URL Input */}
        <div className="pt-2">
          <label className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Manual File Path / URL:
          </label>
          <input
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="/uploads/... or https://..."
            className="w-full px-4 py-3 bg-white border-2 border-zinc-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={loading || uploadingPdf}
          className="px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] border-2 border-zinc-900 disabled:opacity-50 active:translate-x-1 active:translate-y-1"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
