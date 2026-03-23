"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Github, ExternalLink, X, ChevronRight, Tag } from "lucide-react";
import DashboardProject from "./projects/DashboardProject";
import MonitoringProject from "./projects/MonitoringProject";
import DataAPIProject from "./projects/DataAPIProject";

const projectComponents: Record<string, React.FC> = {
  dashboard: DashboardProject,
  monitoring: MonitoringProject,
  dataapi: DataAPIProject,
};

export default function Projects() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const modalProject = t.projects.items.find((p) => p.id === activeModal);
  const ModalComponent = activeModal ? projectComponents[activeModal] : null;

  return (
    <section id="projects" className="section-padding relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-code text-sm uppercase tracking-widest mb-3 block">
            // projects
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">{t.projects.subtitle}</p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, i) => {
            const isHovered = hoveredCard === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`group relative bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10${project.id === "dashboard" ? " project-card" : ""}`}
                onClick={() => setActiveModal(project.id)}
              >
                {/* Gradient top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

                {/* Card content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-xs text-slate-600 dark:text-slate-400 font-medium"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                        title={t.projects.viewCode}
                      >
                        <Github size={15} />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-all"
                        title={t.projects.liveDemo}
                      >
                        <ExternalLink size={15} />
                      </motion.a>
                    </div>

                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      className="flex items-center gap-1 text-cyan-400 text-sm font-medium"
                    >
                      <span>Ver Demo</span>
                      <ChevronRight size={14} />
                    </motion.div>
                  </div>
                </div>

                {/* Hover glow */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 pointer-events-none`}
                  style={{ opacity: isHovered ? 0.03 : 0 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeModal && modalProject && ModalComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a1628] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className={`h-1 w-full bg-gradient-to-r ${modalProject.color}`} />
              <div className="p-6 border-b border-white/10 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">{modalProject.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {modalProject.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-cyan-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all ml-4 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 grid md:grid-cols-3 gap-6">
                {/* Project info */}
                <div className="md:col-span-1 space-y-5">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Descrição</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{modalProject.fullDesc}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Funcionalidades</h4>
                    <ul className="space-y-1.5">
                      {modalProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
                          <span className="text-cyan-400 mt-0.5">▸</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">
                      {t.projects.techStack}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {modalProject.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400 font-code">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <a
                      href={modalProject.github}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-300 hover:text-white transition-all"
                    >
                      <Github size={14} />
                      {t.projects.viewCode}
                    </a>
                    <a
                      href={modalProject.demo}
                      className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-sm text-cyan-400 transition-all"
                    >
                      <ExternalLink size={14} />
                      {t.projects.liveDemo}
                    </a>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="md:col-span-2">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Demo Interativa
                  </h4>
                  <div className="bg-[#050a0f] rounded-xl p-4 border border-white/10 overflow-hidden">
                    <ModalComponent />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
