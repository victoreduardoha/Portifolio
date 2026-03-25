"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 bg-[#020810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="font-bold text-white font-code text-sm">
              Victor <span className="text-cyan-400">Eduardo</span>
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/victoreduardoha", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/victoreduardoml", label: "LinkedIn" },
              { icon: Mail, href: "mailto:contato@victoreduardo.site", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                title={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            {t.footer.builtWith}
            <Heart size={11} className="text-red-500 fill-red-500" />
            &amp; Next.js · {new Date().getFullYear()} · {t.footer.rights}
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-6 -top-5 w-10 h-10 bg-cyan-500 text-black rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  );
}
