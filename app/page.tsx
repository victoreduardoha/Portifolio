"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { Code2 } from "lucide-react";

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const next = () => {
      if (i < steps.length) {
        setProgress(steps[i++]);
        setTimeout(next, 200 + Math.random() * 200);
      } else {
        setTimeout(onDone, 300);
      }
    };
    setTimeout(next, 200);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050a0f] flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full mb-8"
      />
      <div className="flex items-center gap-2 mb-8">
        <Code2 size={20} className="text-cyan-400" />
        <span className="font-code text-white font-bold text-lg">
          Victor <span className="text-cyan-400">Eduardo</span>
        </span>
      </div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
        />
      </div>
      <p className="text-slate-600 text-xs mt-3 font-code">{progress}%</p>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#050a0f] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleBackground />
          <Header />
          <main>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
