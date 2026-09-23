"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";

export function Nav() {
  const pathname = usePathname();
  const [profileName, setProfileName] = useState("SHIHAB.");
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setProfileName(data.name);
        }
        if (data && data.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      })
      .catch(console.error);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#f8f8f5]/95 backdrop-blur-md border-b-4 border-zinc-900"
    >
      <div className="max-w-[90rem] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-black uppercase tracking-widest text-zinc-900 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
          >
            <span>{profileName}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'Work', href: '/#projects' },
            { label: 'Experience', href: '/#experience' },
            { label: 'Process', href: '/#process' },
            { label: 'About', href: '/about' },
            { label: 'All Projects', href: '/projects' },
          ].map((item, idx) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects'));
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.08 }}
              >
                <Link 
                  href={item.href}
                  className={`text-base font-black uppercase tracking-wider relative group py-1 transition-colors ${isActive ? 'text-blue-600' : 'text-zinc-900 hover:text-blue-600'}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </motion.div>
            );
          })}

          {resumeUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] inline-flex items-center gap-2 border-2 border-zinc-900"
              >
                <ArrowDownToLine size={15} strokeWidth={3} />
                Resume
              </a>
            </motion.div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {resumeUrl && (
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-black uppercase tracking-wider border-2 border-zinc-900"
            >
              Resume
            </a>
          )}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-100 border-t-2 border-zinc-900 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {[
                { label: 'Work', href: '/#projects' },
                { label: 'Experience', href: '/#experience' },
                { label: 'Process', href: '/#process' },
                { label: 'About', href: '/about' },
                { label: 'All Projects', href: '/projects' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-tight py-2 border-b-2 border-zinc-300 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
