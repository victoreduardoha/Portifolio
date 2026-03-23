"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import {
  Database,
  BarChart3,
  Code2,
  Settings,
  FileSpreadsheet,
  AlertTriangle,
  FolderKanban,
  Globe,
} from "lucide-react";

const skillCategories = [
  {
    title: "Data & Analytics",
    color: "cyan",
    skills: [
      { name: "SQL", level: 90, icon: Database },
      { name: "Power BI", level: 88, icon: BarChart3 },
      { name: "Excel Avançado", level: 92, icon: FileSpreadsheet },
      { name: "Data Analysis", level: 85, icon: BarChart3 },
    ],
  },
  {
    title: "Development",
    color: "blue",
    skills: [
      { name: "React / Next.js", level: 78, icon: Code2 },
      { name: "TypeScript", level: 72, icon: Code2 },
      { name: "Node.js", level: 70, icon: Settings },
      { name: "Python", level: 68, icon: Globe },
    ],
  },
  {
    title: "Engineering",
    color: "violet",
    skills: [
      { name: "Gestão de Riscos", level: 85, icon: AlertTriangle },
      { name: "Gestão de Projetos", level: 80, icon: FolderKanban },
      { name: "Automação Industrial", level: 75, icon: Settings },
      { name: "Processos Industriais", level: 88, icon: Settings },
    ],
  },
];

const colorMap: Record<string, { bar: string; text: string; bg: string; border: string }> = {
  cyan: {
    bar: "bg-cyan-500",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  blue: {
    bar: "bg-blue-500",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  violet: {
    bar: "bg-violet-500",
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
};

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const c = colorMap[color];

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{name}</span>
        <span className={`text-xs font-bold ${c.text}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full ${c.bar} rounded-full relative`}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-code text-sm uppercase tracking-widest mb-3 block">
            // about_me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">{t.about.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed border-l-2 border-cyan-500 pl-4 py-1">
                {t.about.story1}
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-4">
                {t.about.story2}
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-4">
                {t.about.story3}
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-cyan-400" />
                {t.about.journey}
              </h3>
              <div className="space-y-0">
                {t.about.journeyItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0 group-hover:border-cyan-400 transition-colors"
                      >
                        {item.year.slice(-2)}
                      </motion.div>
                      {i < t.about.journeyItems.length - 1 && (
                        <div className="w-0.5 h-12 bg-cyan-500/20 mt-1" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-cyan-400 font-code">{item.year}</span>
                        <span className="w-8 h-0.5 bg-cyan-500/30" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
              <span className="w-6 h-0.5 bg-cyan-400" />
              {t.about.skills}
            </h3>

            {skillCategories.map((category, ci) => {
              const c = colorMap[category.color];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + ci * 0.15 }}
                  className={`p-5 rounded-xl border ${c.border} ${c.bg} backdrop-blur-sm`}
                >
                  <h4 className={`text-sm font-bold ${c.text} uppercase tracking-wider mb-4 font-code`}>
                    {category.title}
                  </h4>
                  <div className="space-y-3">
                    {category.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={category.color}
                        index={si}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
