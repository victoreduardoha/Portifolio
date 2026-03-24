"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import {
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
} from "lucide-react";


const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/victoreduardoha",
    target: "_blank",
    color: "hover:text-slate-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/40",
    desc: "@victoreduardoha",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victoreduardoml",
    target: "_blank",
    color: "hover:text-blue-400 hover:border-blue-400/40",
    desc: "victoreduardoml",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contato@victoreduardo.site",
    target: "_self",
    color: "hover:text-cyan-400 hover:border-cyan-400/40",
    desc: "contato@victoreduardo.site",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5584991198268",
    target: "_blank",
    color: "hover:text-green-400 hover:border-green-400/40",
    desc: "+55 84 99119-8268",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email inválido";
    if (!form.subject.trim()) e.subject = "Assunto obrigatório";
    if (form.message.trim().length < 10) e.message = "Mínimo 10 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Falha ao enviar");

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputBase =
    "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-all text-sm";
  const inputError = "border-red-500/50 focus:border-red-500/60";

  return (
    <section id="contact" className="section-padding relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-code text-sm uppercase tracking-widest mb-3 block">
            // contact
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">{t.contact.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {t.contact.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} className="text-cyan-400" />
                <span>Brasil · Remoto</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={14} className="text-cyan-400" />
                <span>GMT-3 · Disponível para qualquer fuso</span>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-4 font-bold">
                {t.contact.orContact}
              </p>
              <div className="space-y-2">
                {socialLinks.map(({ icon: Icon, label, href, target, color, desc }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={target}
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all group ${color}`}
                  >
                    <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{label}</div>
                      <div className="text-xs text-slate-600">{desc}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1.5">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder={t.contact.namePlaceholder}
                    className={`${inputBase} ${errors.name ? inputError : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1.5">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder={t.contact.emailPlaceholder}
                    className={`${inputBase} ${errors.email ? inputError : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1.5">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  placeholder={t.contact.subjectPlaceholder}
                  className={`${inputBase} ${errors.subject ? inputError : ""}`}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1.5">
                  {t.contact.message}
                </label>
                <textarea
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 30px rgba(34,211,238,0.3)" } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all text-sm ${
                  status === "sent"
                    ? "bg-green-500 text-white"
                    : status === "error"
                    ? "bg-red-500 text-white"
                    : status === "sending"
                    ? "bg-cyan-500/50 text-black/60 cursor-not-allowed"
                    : "bg-cyan-500 text-black hover:bg-cyan-400"
                }`}
              >
                {status === "sent" ? (
                  <>
                    <CheckCircle size={16} />
                    {t.contact.success.split("!")[0]}!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={16} />
                    Erro ao enviar — tente novamente
                  </>
                ) : status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={16} />
                    </motion.div>
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t.contact.send}
                  </>
                )}
              </motion.button>

              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  {t.contact.success}
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
