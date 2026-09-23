"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please verify your email and password.");
        setLoading(false);
      } else {
        router.push("/admin");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-zinc-900 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none">
      
      {/* Top Bar: Return Link */}
      <div className="max-w-[90rem] mx-auto w-full flex items-center justify-between z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          <span>Return To Portfolio</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
          <ShieldCheck size={16} className="text-blue-600" />
          <span>Security Protocol Active</span>
        </div>
      </div>

      {/* Main Center Login Card */}
      <div className="flex items-center justify-center my-auto py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg bg-white border-4 border-zinc-900 shadow-[14px_14px_0px_0px_rgba(24,24,27,1)] p-8 md:p-12"
        >
          {/* Card Header */}
          <div className="border-b-4 border-zinc-900 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest mb-3">
              <Lock size={12} className="text-blue-400" /> Restricted Access
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 uppercase tracking-tighter">
              Admin Portal
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">
              Sign in to manage projects, bio, skills, and credentials
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-600 text-red-700 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] flex items-start gap-2.5"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-900">
                Authorized Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3.5 bg-[#f8f8f5] text-zinc-900 border-2 border-zinc-900 font-bold placeholder:text-zinc-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all text-base"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 pr-12 bg-[#f8f8f5] text-zinc-900 border-2 border-zinc-900 font-bold placeholder:text-zinc-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all text-base"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 p-1 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-zinc-900 hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
                {!loading && <ArrowRight size={18} strokeWidth={3} />}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t-2 border-zinc-100 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            <span>Shihab Portfolio CMS</span>
            <span>v2.0 &bull; Encrypted</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Copyright & Security info */}
      <div className="max-w-[90rem] mx-auto w-full text-center text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest z-10">
        Authorized administrative access only &bull; All sessions logged
      </div>

    </div>
  );
}
