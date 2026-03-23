"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, Info, Cpu, HardDrive, Wifi, Thermometer, Activity, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Severity = "critical" | "warning" | "info" | "ok";

interface LogEntry {
  id: number;
  time: string;
  severity: Severity;
  system: string;
  message: string;
}

interface Equipment {
  id: string;
  name: string;
  status: "online" | "warning" | "offline";
  cpu: number;
  memory: number;
  temp: number;
  uptime: string;
}

const systems = ["CLP-01", "CLP-02", "SCADA", "HMI", "DB-Server", "Inversor", "Sensor-Temp", "PLC-Main"];
const messages: Record<Severity, string[]> = {
  critical: [
    "Temperatura acima do limite máximo — shutdown preventivo iniciado",
    "Falha de comunicação com CLP principal",
    "Pressão hidráulica fora dos parâmetros críticos",
    "Sobrecarga no motor principal — proteção acionada",
  ],
  warning: [
    "Latência de rede elevada (>200ms) detectada",
    "Memória acima de 85% de utilização",
    "Backup não executado nas últimas 24h",
    "Tensão de alimentação instável no setor B",
  ],
  info: [
    "Sincronização de dados concluída com sucesso",
    "Reinicialização programada agendada para 03:00",
    "Novo dispositivo conectado à rede industrial",
    "Relatório diário gerado e exportado",
  ],
  ok: [
    "Sistema operando dentro dos parâmetros normais",
    "Teste de comunicação concluído — OK",
    "Backup realizado com sucesso",
    "Calibração do sensor concluída",
  ],
};

const generateLog = (id: number): LogEntry => {
  const severities: Severity[] = ["critical", "warning", "info", "ok", "ok", "ok", "info", "warning"];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const now = new Date();
  return {
    id,
    time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
    severity,
    system: systems[Math.floor(Math.random() * systems.length)],
    message: messages[severity][Math.floor(Math.random() * messages[severity].length)],
  };
};

const initialEquipment: Equipment[] = [
  { id: "e1", name: "CLP-01", status: "online", cpu: 42, memory: 65, temp: 68, uptime: "12d 4h" },
  { id: "e2", name: "SCADA-Server", status: "warning", cpu: 87, memory: 91, temp: 79, uptime: "8d 2h" },
  { id: "e3", name: "HMI-Station", status: "online", cpu: 23, memory: 44, temp: 61, uptime: "3d 18h" },
  { id: "e4", name: "DB-Primary", status: "online", cpu: 55, memory: 72, temp: 71, uptime: "30d 6h" },
  { id: "e5", name: "Inversor-B2", status: "offline", cpu: 0, memory: 0, temp: 0, uptime: "—" },
  { id: "e6", name: "PLC-Main", status: "online", cpu: 31, memory: 48, temp: 65, uptime: "15d 9h" },
];

const severityConfig: Record<Severity, { icon: LucideIcon, color: string, bg: string, label: string }> = {
  critical: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", label: "CRÍTICO" },
  warning: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30", label: "AVISO" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "INFO" },
  ok: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "OK" },
};

const statusConfig = {
  online: { color: "text-green-400", dot: "bg-green-400", label: "ONLINE" },
  warning: { color: "text-orange-400", dot: "bg-orange-400", label: "AVISO" },
  offline: { color: "text-red-400", dot: "bg-red-500", label: "OFFLINE" },
};

export default function MonitoringProject() {
  const [logs, setLogs] = useState<LogEntry[]>(() => Array.from({ length: 8 }, (_, i) => generateLog(i)));
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [filterSeverity, setFilterSeverity] = useState<Severity | "all">("all");
  const [logId, setLogId] = useState(100);
  const [activeAlerts, setActiveAlerts] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogId((id) => {
        const newLog = generateLog(id + 1);
        setLogs((prev) => [newLog, ...prev].slice(0, 20));
        if (newLog.severity === "critical") setActiveAlerts((a) => a + 1);
        return id + 1;
      });

      // Update equipment metrics
      setEquipment((prev) =>
        prev.map((eq) =>
          eq.status === "offline"
            ? eq
            : {
                ...eq,
                cpu: Math.max(5, Math.min(99, eq.cpu + Math.round((Math.random() - 0.5) * 15))),
                memory: Math.max(10, Math.min(99, eq.memory + Math.round((Math.random() - 0.5) * 8))),
                temp: Math.max(40, Math.min(95, eq.temp + Math.round((Math.random() - 0.5) * 6))),
              }
        )
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = filterSeverity === "all" ? logs : logs.filter((l) => l.severity === filterSeverity);

  return (
    <div className="space-y-4 text-sm">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-green-400">
            {equipment.filter(e => e.status === "online").length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Online</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
          <motion.div
            animate={{ opacity: activeAlerts > 0 ? [1, 0.5, 1] : 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-black text-orange-400"
          >
            {activeAlerts}
          </motion.div>
          <div className="text-xs text-slate-500 mt-0.5">Alertas</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-red-400">
            {equipment.filter(e => e.status === "offline").length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Offline</div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {equipment.map((eq) => {
          const sc = statusConfig[eq.status];
          return (
            <motion.div
              key={eq.id}
              layout
              className={`p-3 rounded-lg border ${
                eq.status === "offline" ? "border-red-500/20 bg-red-500/5" :
                eq.status === "warning" ? "border-orange-500/20 bg-orange-500/5" :
                "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-code text-white text-xs font-bold">{eq.name}</span>
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={eq.status === "online" ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                  />
                </div>
              </div>
              {eq.status !== "offline" ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Cpu size={9} className="text-slate-500" />
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${eq.cpu > 80 ? "bg-red-400" : eq.cpu > 60 ? "bg-orange-400" : "bg-cyan-400"}`}
                        style={{ width: `${eq.cpu}%` }}
                      />
                    </div>
                    <span className="text-slate-500 text-xs w-7">{eq.cpu}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HardDrive size={9} className="text-slate-500" />
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${eq.memory > 85 ? "bg-red-400" : eq.memory > 70 ? "bg-orange-400" : "bg-blue-400"}`}
                        style={{ width: `${eq.memory}%` }}
                      />
                    </div>
                    <span className="text-slate-500 text-xs w-7">{eq.memory}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Thermometer size={9} />
                      <span className={`text-xs ${eq.temp > 80 ? "text-red-400" : eq.temp > 70 ? "text-orange-400" : "text-slate-400"}`}>
                        {eq.temp}°C
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={9} />
                      <span className="text-xs">{eq.uptime}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-red-400 font-medium mt-1">Sem comunicação</div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Log Feed */}
      <div className="bg-[#020810] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Log de Eventos</span>
          </div>
          <div className="flex gap-1">
            {(["all", "critical", "warning", "info"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterSeverity(s)}
                className={`px-2 py-0.5 rounded text-xs transition-all ${
                  filterSeverity === s
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {s === "all" ? "Todos" : severityConfig[s].label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-40 overflow-y-auto font-code text-xs">
          <AnimatePresence initial={false}>
            {filteredLogs.map((log) => {
              const sc = severityConfig[log.severity];
              const Icon = sc.icon;
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2 px-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors`}
                >
                  <Icon size={11} className={`${sc.color} mt-0.5 shrink-0`} />
                  <span className="text-slate-600 shrink-0">{log.time}</span>
                  <span className={`${sc.color} shrink-0 font-bold`}>[{log.system}]</span>
                  <span className="text-slate-400 leading-tight">{log.message}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
