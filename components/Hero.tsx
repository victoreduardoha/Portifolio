"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Terminal, Database, BarChart3, Code } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const floatingIcons = [
  { icon: Database, x: "10%", y: "20%", delay: 0 },
  { icon: BarChart3, x: "85%", y: "15%", delay: 0.5 },
  { icon: Terminal, x: "75%", y: "70%", delay: 1 },
  { icon: Code, x: "8%", y: "75%", delay: 1.5 },
];

const stats = [
  { value: "6+", key: "years" },
  { value: "30+", key: "projects" },
  { value: "100+", key: "data" },
  { value: "99%", key: "uptime" },
];

// Typing animation hook
function useTyping(words: string[], speed = 100, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

export default function Hero() {
  const { t, lang } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);

  const typingWords: Record<string, string[]> = {
    pt: ["Desenvolvedor Full Stack", "Analista de Dados", "Engenheiro de Software", "Problem Solver"],
    en: ["Full Stack Developer", "Data Analyst", "Software Engineer", "Problem Solver"],
    es: ["Desarrollador Full Stack", "Analista de Datos", "Ingeniero de Software", "Problem Solver"],
  };

  const typed = useTyping(typingWords[lang] || typingWords.en);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon size={20} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-cyan-400 rounded-full"
          />
          <Sparkles size={14} />
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
        >
          <span className="text-slate-900 dark:text-white block">
            {t.hero.headline}
          </span>
          <span className="gradient-text block">{t.hero.headline2}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-6 h-10"
        >
          <span className="text-slate-500 text-lg">&gt;</span>
          <span className="font-code text-cyan-400 text-xl font-semibold">{typed}</span>
          <span className="cursor text-cyan-400 text-xl">|</span>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,211,238,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <BarChart3 size={18} />
            {t.hero.cta1}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="btn-outline flex items-center justify-center gap-2"
          >
            {t.hero.cta2}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-black text-cyan-400">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">
                {t.hero.stats[stat.key as keyof typeof t.hero.stats]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        ref={scrollRef}
      >
        <span className="text-xs uppercase tracking-widest">{t.hero.scrollDown}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
