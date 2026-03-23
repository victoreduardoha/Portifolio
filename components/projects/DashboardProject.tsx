"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const generateDataPoint = (base: number, variance: number) =>
  Math.max(0, Math.round(base + (Math.random() - 0.5) * variance));

const generateTimeLabel = (minutesAgo: number) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - minutesAgo);
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
};

const initialData = Array.from({ length: 12 }, (_, i) => ({
  time: generateTimeLabel(11 - i),
  producao: generateDataPoint(850, 200),
  qualidade: generateDataPoint(92, 8),
  eficiencia: generateDataPoint(78, 15),
  temperatura: generateDataPoint(72, 10),
}));

const kpiCards = [
  { key: "producao", label: "Produção/h", unit: "un", icon: Activity, color: "cyan", threshold: 700 },
  { key: "qualidade", label: "Qualidade", unit: "%", icon: CheckCircle, color: "green", threshold: 85 },
  { key: "eficiencia", label: "Eficiência", unit: "%", icon: TrendingUp, color: "blue", threshold: 70 },
  { key: "temperatura", label: "Temperatura", unit: "°C", icon: AlertTriangle, color: "orange", threshold: 90 },
];

const colorMap: Record<string, string> = {
  cyan: "#22d3ee",
  green: "#4ade80",
  blue: "#60a5fa",
  orange: "#fb923c",
};

const sectors = ["Setor A", "Setor B", "Setor C", "Setor D", "Todos"];

export default function DashboardProject() {
  const [data, setData] = useState(initialData);
  const [selectedSector, setSelectedSector] = useState("Todos");
  const [selectedMetric, setSelectedMetric] = useState("producao");
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [pulseKpi, setPulseKpi] = useState<string | null>(null);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = {
          time: generateTimeLabel(0),
          producao: generateDataPoint(850, 200),
          qualidade: generateDataPoint(92, 8),
          eficiencia: generateDataPoint(78, 15),
          temperatura: generateDataPoint(72, 10),
        };
        // Pulse random KPI
        const keys = Object.keys(newPoint).filter(k => k !== "time");
        setPulseKpi(keys[Math.floor(Math.random() * keys.length)]);
        setTimeout(() => setPulseKpi(null), 500);
        setLastUpdate(new Date());
        return [...prev.slice(1), newPoint];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  return (
    <div className="space-y-4 text-sm">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSector(s)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSector === s
                  ? "bg-cyan-500 text-black"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">
            {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              isLive
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-slate-400 border border-white/10"
            }`}
          >
            <motion.div
              animate={isLive ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-400" : "bg-slate-500"}`}
            />
            {isLive ? "AO VIVO" : "PAUSADO"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiCards.map((kpi) => {
          const val = latest[kpi.key as keyof typeof latest] as number;
          const prev = previous[kpi.key as keyof typeof previous] as number;
          const isUp = val >= prev;
          const isAlert = val < kpi.threshold;
          const color = colorMap[kpi.color];
          const Icon = kpi.icon;

          return (
            <motion.div
              key={kpi.key}
              animate={pulseKpi === kpi.key ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedMetric(kpi.key)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedMetric === kpi.key
                  ? "border-cyan-500/50 bg-cyan-500/10"
                  : isAlert
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={14} style={{ color }} />
                {isAlert ? (
                  <AlertTriangle size={12} className="text-red-400" />
                ) : isUp ? (
                  <TrendingUp size={12} className="text-green-400" />
                ) : (
                  <TrendingDown size={12} className="text-red-400" />
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={val}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-black text-white"
                >
                  {val}
                  <span className="text-xs text-slate-500 ml-0.5 font-normal">{kpi.unit}</span>
                </motion.div>
              </AnimatePresence>
              <div className="text-xs text-slate-500 mt-0.5">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
            {kpiCards.find(k => k.key === selectedMetric)?.label} — Tendência 24h
          </h4>
          <span className="text-xs text-slate-500 font-code">{selectedSector}</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0a1628", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "8px", fontSize: "12px" }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#22d3ee" }}
            />
            <Area type="monotone" dataKey={selectedMetric} stroke="#22d3ee" strokeWidth={2} fill="url(#colorMetric)" dot={false} activeDot={{ r: 4, fill: "#22d3ee" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Secondary charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <h4 className="text-slate-400 text-xs mb-2 uppercase tracking-wider">Produção por Hora</h4>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data.slice(-6)} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "none", borderRadius: "8px", fontSize: "11px" }} />
              <Bar dataKey="producao" fill="#22d3ee" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <h4 className="text-slate-400 text-xs mb-2 uppercase tracking-wider">Qualidade vs Eficiência</h4>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={data.slice(-6)} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "none", borderRadius: "8px", fontSize: "11px" }} />
              <Line type="monotone" dataKey="qualidade" stroke="#4ade80" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="eficiencia" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
