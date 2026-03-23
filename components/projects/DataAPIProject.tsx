"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Database, Table2, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";

// Mock database
const mockDB = {
  vendas: [
    { id: 1, produto: "Parafuso M8", quantidade: 500, valor: 125.0, setor: "Mecânica", data: "2024-01-15" },
    { id: 2, produto: "Rolamento 6205", quantidade: 50, valor: 890.0, setor: "Mecânica", data: "2024-01-16" },
    { id: 3, produto: "Cabo 4mm²", quantidade: 200, valor: 640.0, setor: "Elétrica", data: "2024-01-17" },
    { id: 4, produto: "Válvula Pneum.", quantidade: 30, valor: 1350.0, setor: "Pneumática", data: "2024-01-18" },
    { id: 5, produto: "Sensor IND.", quantidade: 10, valor: 2200.0, setor: "Automação", data: "2024-01-19" },
    { id: 6, produto: "Motor 1cv", quantidade: 5, valor: 3500.0, setor: "Elétrica", data: "2024-01-20" },
    { id: 7, produto: "Correia Dent.", quantidade: 80, valor: 560.0, setor: "Mecânica", data: "2024-01-21" },
    { id: 8, produto: "Inversor 5cv", quantidade: 3, valor: 4800.0, setor: "Automação", data: "2024-01-22" },
  ],
  equipamentos: [
    { id: 1, nome: "Torno CNC-01", setor: "Usinagem", status: "Ativo", ultima_manutencao: "2024-01-10" },
    { id: 2, nome: "Fresadora F-200", setor: "Usinagem", status: "Manutenção", ultima_manutencao: "2024-01-18" },
    { id: 3, nome: "Compressor Atlas", setor: "Pneumática", status: "Ativo", ultima_manutencao: "2023-12-05" },
    { id: 4, nome: "Solda MIG-350", setor: "Soldagem", status: "Ativo", ultima_manutencao: "2024-01-08" },
    { id: 5, nome: "Injetora 250T", setor: "Plástico", status: "Inativo", ultima_manutencao: "2023-11-20" },
  ],
};

type SortDir = "asc" | "desc" | null;

interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  error?: string;
  time: number;
}

const presetQueries = [
  { label: "SELECT * vendas", query: "SELECT * FROM vendas" },
  { label: "SELECT * equipamentos", query: "SELECT * FROM equipamentos" },
  { label: "WHERE setor = 'Automação'", query: "SELECT * FROM vendas WHERE setor = 'Automação'" },
  { label: "GROUP BY setor", query: "SELECT setor, COUNT(*) as total FROM vendas GROUP BY setor" },
  { label: "ORDER BY valor DESC", query: "SELECT * FROM vendas ORDER BY valor DESC LIMIT 5" },
  { label: "SUM valor", query: "SELECT setor, SUM(valor) as total_valor FROM vendas GROUP BY setor" },
];

function executeQuery(query: string): QueryResult {
  const start = performance.now();
  try {
    const q = query.trim().toUpperCase();

    // Determine table
    const tableMatch = query.match(/FROM\s+(\w+)/i);
    if (!tableMatch) throw new Error("Tabela não especificada. Use FROM <table>");
    const tableName = tableMatch[1].toLowerCase() as keyof typeof mockDB;
    const table = mockDB[tableName];
    if (!table) throw new Error(`Tabela '${tableName}' não encontrada. Tabelas: vendas, equipamentos`);

    let rows: Record<string, unknown>[] = table.map(r => ({ ...r }));

    // WHERE clause
    const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*'([^']+)'/i);
    if (whereMatch) {
      const [, col, val] = whereMatch;
      rows = rows.filter(r => String(r[col.toLowerCase()]).toLowerCase() === val.toLowerCase());
    }

    // GROUP BY
    const groupMatch = query.match(/GROUP\s+BY\s+(\w+)/i);
    const countMatch = query.match(/COUNT\(\*\)\s+as\s+(\w+)/i);
    const sumMatch = query.match(/SUM\((\w+)\)\s+as\s+(\w+)/i);

    if (groupMatch) {
      const groupCol = groupMatch[1].toLowerCase();
      const groups: Record<string, Record<string, unknown>[]> = {};
      rows.forEach(r => {
        const key = String(r[groupCol]);
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      });

      rows = Object.entries(groups).map(([key, items]) => {
        const result: Record<string, unknown> = { [groupCol]: key };
        if (countMatch) result[countMatch[1]] = items.length;
        if (sumMatch) result[sumMatch[2]] = items.reduce((acc, r) => acc + Number(r[sumMatch[1].toLowerCase()]), 0).toFixed(2);
        return result;
      });
    }

    // ORDER BY
    const orderMatch = query.match(/ORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i);
    if (orderMatch) {
      const [, col, dir] = orderMatch;
      rows.sort((a, b) => {
        const av = a[col.toLowerCase()], bv = b[col.toLowerCase()];
        const diff = (Number(av) || String(av)) < (Number(bv) || String(bv)) ? -1 : 1;
        return (dir?.toUpperCase() === "DESC" ? -1 : 1) * diff;
      });
    }

    // LIMIT
    const limitMatch = query.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) rows = rows.slice(0, Number(limitMatch[1]));

    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    return { columns, rows, time: Math.round(performance.now() - start + Math.random() * 15) };
  } catch (e) {
    return { columns: [], rows: [], error: (e as Error).message, time: 0 };
  }
}

export default function DataAPIProject() {
  const [query, setQuery] = useState("SELECT * FROM vendas");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [running, setRunning] = useState(false);
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const pageSize = 5;

  const runQuery = async () => {
    setRunning(true);
    setPage(0);
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
    const res = executeQuery(query);
    setResult(res);
    setSortCol(null);
    setSortDir(null);
    setRunning(false);
  };

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc");
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortedRows = result?.rows
    ? [...result.rows].sort((a, b) => {
        if (!sortCol || !sortDir) return 0;
        const av = a[sortCol], bv = b[sortCol];
        const diff = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? diff : -diff;
      })
    : [];

  const pagedRows = sortedRows.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sortedRows.length / pageSize);

  const endpoints = [
    { method: "GET", path: "/api/vendas", desc: "Lista todas as vendas" },
    { method: "GET", path: "/api/equipamentos", desc: "Lista equipamentos" },
    { method: "POST", path: "/api/query", desc: "Executa query SQL" },
    { method: "GET", path: "/api/vendas/:id", desc: "Busca venda por ID" },
    { method: "GET", path: "/api/stats", desc: "Estatísticas gerais" },
  ];

  return (
    <div className="space-y-4 text-sm">
      {/* API Endpoints */}
      <div className="bg-[#020810] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
          <Database size={12} className="text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Mock REST API</span>
          <span className="ml-auto text-xs text-green-400 font-code flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            localhost:3001
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {endpoints.map((ep) => (
            <div key={ep.path} className="flex items-center gap-3 px-3 py-1.5 hover:bg-white/5 transition-colors">
              <span className={`text-xs font-bold font-code px-1.5 py-0.5 rounded ${
                ep.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
              }`}>
                {ep.method}
              </span>
              <span className="text-cyan-400 font-code text-xs">{ep.path}</span>
              <span className="text-slate-500 text-xs ml-auto">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SQL Editor */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {presetQueries.map((pq) => (
            <button
              key={pq.label}
              onClick={() => setQuery(pq.query)}
              className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-slate-400 hover:text-cyan-400 transition-colors font-code"
            >
              {pq.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.ctrlKey && e.key === "Enter") runQuery(); }}
            className="w-full bg-[#020810] border border-white/10 rounded-xl p-3 text-cyan-300 font-code text-xs resize-none focus:outline-none focus:border-cyan-500/50 transition-colors leading-relaxed"
            rows={3}
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-slate-600 text-xs">Ctrl+Enter</div>
        </div>
        <button
          onClick={runQuery}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-black font-bold text-xs rounded-lg transition-all"
        >
          {running ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
              <Play size={12} />
            </motion.div>
          ) : (
            <Play size={12} />
          )}
          {running ? "Executando..." : "Executar Query"}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {result.error ? (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-red-400 font-bold text-xs">Query Error</div>
                  <div className="text-red-300 text-xs mt-0.5">{result.error}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Table2 size={12} className="text-cyan-400" />
                  <span className="text-white font-bold">{result.rows.length} linha(s)</span>
                  <span>·</span>
                  <span>{result.columns.length} coluna(s)</span>
                  <span>·</span>
                  <span className="text-green-400">{result.time}ms</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full font-code text-xs">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        {result.columns.map((col) => (
                          <th
                            key={col}
                            onClick={() => handleSort(col)}
                            className="text-left px-3 py-2 text-cyan-400 font-bold uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors select-none"
                          >
                            <div className="flex items-center gap-1">
                              {col}
                              {sortCol === col ? (
                                sortDir === "asc" ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                              ) : (
                                <ChevronUp size={10} className="opacity-20" />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {pagedRows.map((row, ri) => (
                        <motion.tr
                          key={ri}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: ri * 0.05 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          {result.columns.map((col) => (
                            <td key={col} className="px-3 py-2 text-slate-300">
                              {String(row[col] ?? "—")}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded disabled:opacity-30 transition-all"
                    >←</button>
                    <span className="text-xs text-slate-500">{page + 1} / {totalPages}</span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                      className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded disabled:opacity-30 transition-all"
                    >→</button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
