"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: "success", message: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatus({ type: "error", message: data.error || "Failed to update password." });
      }
    } catch (err: any) {
      console.error(err);
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 border-4 border-zinc-900 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-zinc-900 pb-4">
        <div className="p-2.5 bg-zinc-900 text-white">
          <KeyRound size={22} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-zinc-900">
            Change Admin Password
          </h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
            Update your account password for secure dashboard access
          </p>
        </div>
      </div>

      {status.type && (
        <div
          className={`p-4 border-2 flex items-center gap-3 text-sm font-bold ${
            status.type === "success"
              ? "bg-emerald-50 border-emerald-600 text-emerald-900"
              : "bg-red-50 border-red-600 text-red-900"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-600 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-900">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter current password"
              className="w-full px-5 py-3.5 bg-zinc-50 border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-900">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-5 py-3.5 bg-zinc-50 border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-900">
              Confirm New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Re-enter new password"
              className="w-full px-5 py-3.5 bg-zinc-50 border-4 border-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] border-2 border-zinc-900 disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
