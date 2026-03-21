"use client";

import { useState } from "react";

const NAV = [
  { id: "dashboard", label: "Dashboard",     sub: "Portfolio overview" },
  { id: "requests",  label: "Requests",      sub: "All requests" },
  { id: "approvals", label: "Approvals",     sub: "Pending decisions" },
  { id: "queue",     label: "Buyer Queue",   sub: "Ready to order" },
  { id: "control",   label: "Control Tower", sub: "Exceptions" },
  { id: "reports",   label: "Reports",       sub: "Analysis" },
];

const INIT_REQS = [
  { id:"JG-0016", venue:"Site 1 — Central", sup:"Toolstation",    cat:"Maintenance",  amt:145,  by:"John Smith",   desc:"Replacement fittings — irrigation repair",    why:"Active leak affecting irrigation system",           pri:true,  status:"Pending",  created:"Today",  pref:true,  last:138, note:"" },
  { id:"JG-0015", venue:"Site 2 — East",    sup:"Makro",          cat:"Bar Supplies", amt:268,  by:"Emma Taylor",  desc:"Weekend event stock top-up",                  why:"Corporate member event this Saturday",             pri:false, status:"Pending",  created:"1 day",  pref:true,  last:221, note:"" },
  { id:"JG-0014", venue:"Site 3 — North",   sup:"Screwfix",       cat:"Maintenance",  amt:420,  by:"Chris Adams",  desc:"Drainage repair materials",                   why:"Flooding near access road",                        pri:true,  status:"Approved", created:"2 days", pref:true,  last:388, note:"Order ASAP — site access affected" },
  { id:"JG-0013", venue:"Site 1 — Central", sup:"Nisbets",        cat:"Kitchen",      amt:690,  by:"Rachel Green", desc:"Replacement prep equipment",                  why:"Existing kit failing intermittently",               pri:false, status:"Approved", created:"3 days", pref:true,  last:188, note:"" },
  { id:"JG-0012", venue:"Site 2 — East",    sup:"Booker",         cat:"Bar Supplies", amt:332,  by:"Emma Taylor",  desc:"Stock replenishment for event weekend",        why:"Member event demand spike",                        pri:true,  status:"Ordered",  created:"4 days", pref:false, last:198, note:"" },
  { id:"JG-0011", venue:"Site 3 — North",   sup:"Makro",          cat:"Cleaning",     amt:180,  by:"Chris Adams",  desc:"Monthly cleaning supplies order",              why:"Routine replenishment",                            pri:false, status:"Ordered",  created:"5 days", pref:true,  last:172, note:"" },
  { id:"JG-0010", venue:"Site 1 — Central", sup:"Travis Perkins", cat:"Maintenance",  amt:1180, by:"John Smith",   desc:"Emergency repair materials — burst pipe",     why:"Water leak affecting operations",                  pri:true,  status:"Rejected", created:"5 days", pref:true,  last:900, note:"" },
];

const VB: Record<string,{t:number,u:number}> = {
  "Site 1 — Central": { t:6200, u:3480 },
  "Site 2 — East":    { t:4900, u:2180 },
  "Site 3 — North":   { t:4300, u:1960 },
};
const CB: Record<string,{t:number,u:number}> = {
  "Maintenance":  { t:3600, u:2940 },
  "Bar Supplies": { t:3000, u:2110 },
  "Kitchen":      { t:1800, u:1240 },
  "Cleaning":     { t:1400, u:860  },
};

type Req = typeof INIT_REQS[0];
const f = (n: number) => "£" + Math.round(n).toLocaleString();

function ss(s: string) {
  if (s === "Pending")  return { bg: "#fff7ed", c: "#b45309" };
  if (s === "Approved") return { bg: "#eff6ff", c: "#1d4ed8" };
  if (s === "Ordered")  return { bg: "#f0fdf4", c: "#166534" };
  if (s === "Rejected") return { bg: "#fef2f2", c: "#dc2626" };
  return { bg: "#f1f5f9", c: "#475569" };
}

export default function Demo() {
  const [page, setPage]           = useState("dashboard");
  const [reqs, setReqs]           = useState<Req[]>(INIT_REQS);
  const [selId, setSelId]         = useState("JG-0016");
  const [note, setNote]           = useState("");
  const [filter, setFilter]       = useState("All");
  const [search, setSearch]       = useState("");
  const [period, setPeriod]       = useState("This month");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [activity, setActivity]   = useState([
    "JG-0012 ordered by Rachel · 09:18",
    "JG-0011 ordered by Rachel · 08:41",
    "JG-0010 rejected · 08:15",
  ]);

  const pending  = reqs.filter(r => r.status === "Pending");
  const approved = reqs.filter(r => r.status === "Approved");
  const ordered  = reqs.filter(r => r.status === "Ordered");
  const sel      = reqs.find(r => r.id === selId) ?? reqs[0];

  function addActivity(txt: string) {
    setActivity(p => [txt, ...p].slice(0, 8));
  }

  function doApprove(id: string) {
    setReqs(p => p.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    addActivity(id + " approved · just now");
    const next = reqs.find(r => r.status === "Pending" && r.id !== id);
    if (next) setSelId(next.id);
    setNote("");
  }

  function doReject(id: string) {
    setReqs(p => p.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
    addActivity(id + " rejected · just now");
    const next = reqs.find(r => r.status === "Pending" && r.id !== id);
    if (next) setSelId(next.id);
    setNote("");
  }

  function doOrder(id: string) {
    setReqs(p => p.map(r => r.id === id ? { ...r, status: "Ordered" } : r));
    addActivity(id + " marked ordered · just now");
  }

  const filteredReqs = reqs.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || [r.id, r.venue, r.sup, r.cat, r.by, r.desc].join(" ").toLowerCase().includes(q);
    const matchFilter = filter === "All" || r.status === filter || (filter === "Priority" && r.pri);
    return matchSearch && matchFilter;
  });

  const EXCEPTIONS = reqs.map(r => {
    const flags: { type: string; title: string; bg: string; bd: string; c: string }[] = [];
    const vb = VB[r.venue] ?? { t: 5000, u: 2500 };
    if (r.pri && r.status === "Pending") flags.push({ type: "urgent",   title: "Urgent pending",          bg: "#eff6ff", bd: "#bfdbfe", c: "#1e40af" });
    if (!r.pref)                         flags.push({ type: "supplier", title: "Off-preferred supplier",   bg: "#fff7ed", bd: "#fed7aa", c: "#92400e" });
    if ((vb.u + r.amt) > vb.t)           flags.push({ type: "budget",   title: "Budget exception",         bg: "#fef2f2", bd: "#fecaca", c: "#991b1b" });
    if (r.created !== "Today" && r.status === "Pending") flags.push({ type: "aging", title: "Approval aging", bg: "#fff7ed", bd: "#fed7aa", c: "#92400e" });
    return { r, flags };
  }).filter(e => e.flags.length > 0 && !dismissed.includes(e.r.id));

  const pageInfo: Record<string, [string, string]> = {
    dashboard: ["Dashboard",     "Live portfolio view across spend, approvals and site health"],
    requests:  ["Requests",      "All purchase requests across your sites"],
    approvals: ["Approvals",     "Review each request — approve or reject before money is spent"],
    queue:     ["Buyer Queue",   "Approved spend waiting for order placement"],
    control:   ["Control Tower", "Exceptions surface automatically — nothing requires chasing"],
    reports:   ["Reports",       "Plain-English view of what your business is spending and where"],
  };

  const reportData: Record<string, { totalSpend: number; requests: number; compliance: number; avgApproval: string; deltaSpend: string; spendTone: string; insight1: string; insight2: string; insight3: string }> = {
    "This month":   { totalSpend: 7620,  requests: 18, compliance: 78, avgApproval: "5.8h", deltaSpend: "+12%", spendTone: "up", insight1: "Site 1 — Central accounts for 46% of total spend — highest of the three sites.",      insight2: "Maintenance is the biggest category at £2,940 — 39% of total operational spend.",    insight3: "78% of spend used preferred suppliers. Site 2 — East is pulling the average down." },
    "Last month":   { totalSpend: 6800,  requests: 15, compliance: 82, avgApproval: "6.4h", deltaSpend: "+8%",  spendTone: "up", insight1: "Site 1 — Central was again the highest-spend site at £3,100 — consistent trend.",      insight2: "Maintenance dominated at £2,600. Emergency repairs remain the largest single category.", insight3: "Compliance stronger last month at 82% — all three sites performed above 75%." },
    "This quarter": { totalSpend: 21800, requests: 52, compliance: 80, avgApproval: "6.1h", deltaSpend: "+15%", spendTone: "up", insight1: "Q1 total reached £21,800 across 52 requests — up 15% on the prior quarter.",            insight2: "Maintenance at £8,200 is 38% of all operational spend — consistently the top category.", insight3: "Quarter compliance averaged 80%. Site 2 — East at 74% is consistently below target." },
  };
  const rd = reportData[period];

  const siteBudgets = [
    { l: "Site 1 — Central", pct: 56, c: "#0c2d5b" },
    { l: "Site 2 — East",    pct: 44, c: "#18b39b" },
    { l: "Site 3 — North",   pct: 46, c: "#6366f1" },
  ];
  const catSpend = [
    { l: "Maintenance",  v: 2940, c: "#0c2d5b" },
    { l: "Bar Supplies", v: 2110, c: "#18b39b" },
    { l: "Kitchen",      v: 1240, c: "#f59e0b" },
    { l: "Cleaning",     v: 860,  c: "#6366f1" },
  ];
  const maxCat = Math.max(...catSpend.map(c => c.v));
  const compSites = [
    { l: "Site 1 — Central", v: 88 },
    { l: "Site 2 — East",    v: 71 },
    { l: "Site 3 — North",   v: 76 },
  ];

  const W: React.CSSProperties = { width: "100%" };
  const FLEX_COL: React.CSSProperties = { display: "flex", flexDirection: "column" };
  const CARD: React.CSSProperties = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter',system-ui,sans-serif", background: "#f1f5f9", color: "#0f172a", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 200, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0c2d5b", letterSpacing: "-0.03em" }}>Spend<span style={{ color: "#18b39b" }}>Gate</span></div>
          <div style={{ marginTop: 6, fontSize: 10, fontWeight: 600, color: "#94a3b8", background: "#f8fafc", borderRadius: 5, padding: "3px 8px", display: "inline-block", border: "1px solid #e2e8f0" }}>Apex Operations</div>
        </div>
        <nav style={{ padding: "8px", flex: 1 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: page === n.id ? "#0c2d5b" : "transparent", color: page === n.id ? "#fff" : "#64748b", fontSize: 12, fontWeight: page === n.id ? 600 : 500, marginBottom: 2, fontFamily: "inherit", transition: "all .12s" }}>
              {n.label}
              <span style={{ display: "block", fontSize: 10, color: page === n.id ? "rgba(255,255,255,.45)" : "#94a3b8", marginTop: 1, fontWeight: 400 }}>{n.sub}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 14px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#1d4ed8", flexShrink: 0 }}>S</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Simon</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Approver · All sites</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* TOPBAR */}
        <div style={{ padding: "12px 20px", background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{pageInfo[page][0]}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{pageInfo[page][1]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {page === "reports" && (
              <div style={{ display: "flex", gap: 4 }}>
                {["This month", "Last month", "This quarter"].map(p => (
                  <button key={p} onClick={() => setPeriod(p)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "1px solid #e2e8f0", background: period === p ? "#0c2d5b" : "#fff", color: period === p ? "#fff" : "#64748b", fontFamily: "inherit" }}>{p}</button>
                ))}
              </div>
            )}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: "#059669", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 99, padding: "2px 8px" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>Live
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: page === "approvals" || page === "queue" ? 0 : 16, background: "#f8fafc" }}>

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                  { l: "Pending approval", v: pending.length,  bg: pending.length > 0 ? "#fff7ed" : "#f0fdf4", c: pending.length > 0 ? "#b45309" : "#166534", sub: pending.length > 0 ? pending.filter(r => r.pri).length + " priority" : "All clear" },
                  { l: "Awaiting order",   v: approved.length, bg: "#eff6ff", c: "#1d4ed8", sub: "Approved, not placed" },
                  { l: "Controlled spend", v: f(reqs.filter(r => r.status !== "Rejected").reduce((a, r) => a + r.amt, 0)), bg: "#f8fafc", c: "#64748b", sub: "This month" },
                  { l: "Compliance rate",  v: "78%",           bg: "#fff7ed", c: "#b45309", sub: "Preferred suppliers" },
                ].map(m => (
                  <div key={m.l} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{m.l}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, marginBottom: 5 }}>{m.v}</div>
                    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: m.bg, color: m.c }}>{m.sub}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={CARD}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Approval queue</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Tap to review</div>
                  {pending.length === 0 && <div style={{ fontSize: 12, color: "#94a3b8" }}>No pending approvals.</div>}
                  {pending.map(r => (
                    <button key={r.id} onClick={() => { setSelId(r.id); setPage("approvals"); }} style={{ display: "block", width: "100%", textAlign: "left", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 9, padding: "10px 12px", cursor: "pointer", marginBottom: 7, fontFamily: "inherit" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 700 }}>{r.id} · {r.venue}</div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{r.desc}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{f(r.amt)}</div>
                          {r.pri && <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: "#fff7ed", color: "#b45309" }}>Priority</span>}
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: "#18b39b", fontWeight: 600, marginTop: 5 }}>Review →</div>
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={CARD}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Site budget overview</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Monthly spend vs budget</div>
                    {siteBudgets.map(b => (
                      <div key={b.l} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, marginBottom: 3 }}>
                          <span>{b.l}</span>
                          <span style={{ color: b.pct > 85 ? "#ef4444" : b.pct > 65 ? "#f59e0b" : "#18b39b", fontWeight: 700 }}>{b.pct}%</span>
                        </div>
                        <div style={{ height: 5, background: "#f1f5f9", borderRadius: 3, overflow: "hidden", position: "relative" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${b.pct}%`, background: b.c, borderRadius: 3 }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...CARD, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Recent activity</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>Cross-site feed</div>
                    {activity.map((a, i) => <div key={i} style={{ fontSize: 11, color: "#475569", padding: "6px 0", borderBottom: "1px solid #f8fafc" }}>{a}</div>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REQUESTS */}
          {page === "requests" && (
            <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "100%" }}>
              <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
                <div style={{ padding: "10px 14px", background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search requests..." style={{ flex: 1, border: "1px solid #e2e8f0", borderRadius: 7, padding: "6px 10px", fontSize: 12, fontFamily: "inherit", outline: "none", background: "#f8fafc" }} />
                  {["All", "Pending", "Approved", "Ordered", "Priority"].map(fl => (
                    <button key={fl} onClick={() => setFilter(fl)} style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: filter === fl ? "#0c2d5b" : "#fff", color: filter === fl ? "#fff" : "#64748b", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{fl}</button>
                  ))}
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                      {["Request", "Site / Supplier", "Amount", "Status", ""].map(h => (
                        <th key={h} style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", padding: "8px 12px", textAlign: "left" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReqs.map(r => {
                      const st = ss(r.status);
                      return (
                        <tr key={r.id} onClick={() => setSelId(r.id)} style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer", background: selId === r.id ? "#f0f9ff" : "#fff" }}>
                          <td style={{ padding: "10px 12px" }}>
                            <div style={{ fontSize: 12, fontWeight: 700 }}>{r.id}{r.pri && <span style={{ marginLeft: 5, display: "inline-block", padding: "1px 6px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: "#fff7ed", color: "#b45309", textTransform: "uppercase" }}>Urgent</span>}</div>
                            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{r.by} · {r.created}</div>
                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.desc}</div>
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <div style={{ fontSize: 12, fontWeight: 600 }}>{r.venue}</div>
                            <div style={{ fontSize: 11, color: "#64748b" }}>{r.sup} · {r.cat}</div>
                          </td>
                          <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 700 }}>{f(r.amt)}</td>
                          <td style={{ padding: "10px 12px" }}><span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: st.bg, color: st.c }}>{r.status}</span></td>
                          <td style={{ padding: "10px 12px" }}>
                            {r.status === "Pending" && (
                              <button onClick={e => { e.stopPropagation(); setSelId(r.id); setPage("approvals"); }} style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Review</button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ width: 280, borderLeft: "1px solid #e2e8f0", background: "#fff", overflow: "auto", padding: 16, flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{sel.id}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{sel.venue} · {sel.cat}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 10 }}>{f(sel.amt)}</div>
                {[["By", sel.by], ["Supplier", sel.sup], ["Created", sel.created]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "5px 0", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ color: "#94a3b8" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 10, fontSize: 11, background: "#f8fafc", borderRadius: 7, padding: "8px 10px", color: "#475569", lineHeight: 1.55 }}>{sel.desc}</div>
                {sel.status === "Pending" && (
                  <button onClick={() => setPage("approvals")} style={{ width: "100%", marginTop: 12, background: "#18b39b", color: "#fff", border: "none", borderRadius: 8, padding: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Go to approval →</button>
                )}
              </div>
            </div>
          )}

          {/* APPROVALS */}
          {page === "approvals" && (
            <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "100%" }}>
              <div style={{ width: 270, borderRight: "1px solid #e2e8f0", overflow: "auto", background: "#fff", flexShrink: 0 }}>
                <div style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em" }}>Needs decision</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#b45309", background: "#fff7ed", borderRadius: 99, padding: "2px 8px" }}>{pending.length} pending</span>
                </div>
                {pending.map(r => (
                  <div key={r.id} onClick={() => setSelId(r.id)} style={{ padding: "12px 14px", borderBottom: "1px solid #f8fafc", cursor: "pointer", background: selId === r.id ? "#f0f9ff" : "#fff", borderLeft: `3px solid ${selId === r.id ? "#0c2d5b" : "transparent"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700 }}>{r.id}{r.pri && <span style={{ marginLeft: 4, display: "inline-block", padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: "#fff7ed", color: "#b45309", textTransform: "uppercase" }}>Urgent</span>}</div>
                        <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{r.venue} · {r.cat}</div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160 }}>{r.desc}</div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{f(r.amt)}</div>
                    </div>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 5 }}>{r.by} · {r.created}</div>
                  </div>
                ))}
                {pending.length === 0 && <div style={{ padding: "20px 14px", textAlign: "center", color: "#94a3b8", fontSize: 12 }}>All caught up</div>}
                {reqs.filter(r => r.status !== "Pending").length > 0 && (
                  <>
                    <div style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em" }}>Decided</div>
                    {reqs.filter(r => r.status !== "Pending").map(r => (
                      <div key={r.id} style={{ padding: "10px 14px", borderBottom: "1px solid #f8fafc", opacity: 0.5 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>{r.id} · {r.venue}</div>
                          <span style={{ fontSize: 10, fontWeight: 700, color: r.status === "Rejected" ? "#dc2626" : "#166534" }}>{r.status === "Rejected" ? "Rejected" : r.status}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div style={{ flex: 1, overflow: "auto", background: "#f8fafc", minWidth: 0 }}>
                {sel && sel.status === "Pending" ? (() => {
                  const vb = VB[sel.venue] ?? { t: 5000, u: 2500 };
                  const cb = CB[sel.cat] ?? { t: 2000, u: 1000 };
                  const vA = vb.t - vb.u - sel.amt;
                  const cA = cb.t - cb.u - sel.amt;
                  const pd = Math.round(((sel.amt - sel.last) / sel.last) * 100);
                  const ok = vA >= 0 && cA >= 0 && sel.pref && pd < 15;
                  const tone = ok ? "approve" : (!sel.pref || vA < 0 || cA < 0) ? "review" : "caution";
                  const tones: Record<string, { bg: string; bd: string; c: string; msg: string }> = {
                    approve: { bg: "#f0fdf4", bd: "#bbf7d0", c: "#166534", msg: "All signals pass — budget available, preferred supplier, price within range. Recommended: approve." },
                    review:  { bg: "#fef2f2", bd: "#fecaca", c: "#991b1b", msg: "Review required — one or more signals need attention before approving." },
                    caution: { bg: "#fffbeb", bd: "#fde68a", c: "#92400e", msg: "Approve with caution — minor concerns flagged below." },
                  };
                  const t = tones[tone];
                  const nextPending = pending.find(r => r.id !== sel.id);
                  return (
                    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ padding: "11px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, lineHeight: 1.5, border: `1px solid ${t.bd}`, background: t.bg, color: t.c }}>{t.msg}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div style={CARD}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Request detail</div>
                          {[["Requester", sel.by], ["Submitted", sel.created], ["Supplier", sel.sup], ["Category", sel.cat], ["Amount", f(sel.amt)], ["Priority", sel.pri ? "Yes — urgent" : "No"]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "5px 0", borderBottom: "1px solid #f8fafc" }}>
                              <span style={{ color: "#94a3b8" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                            </div>
                          ))}
                          <div style={{ marginTop: 10, fontSize: 11, background: "#f8fafc", borderRadius: 7, padding: "8px 10px", color: "#475569", lineHeight: 1.55 }}>{sel.desc}</div>
                          <div style={{ marginTop: 8, fontSize: 11, background: "#f8fafc", borderRadius: 7, padding: "8px 10px", color: "#94a3b8", fontStyle: "italic", lineHeight: 1.55 }}>{sel.why}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div style={CARD}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Budget impact</div>
                            {[{ lbl: "Venue — " + sel.venue, total: vb.t, used: vb.u, after: vA }, { lbl: "Category — " + sel.cat, total: cb.t, used: cb.u, after: cA }].map(b => {
                              const pct = Math.round(((b.used + sel.amt) / b.total) * 100);
                              const over = b.after < 0;
                              const c = over ? "#ef4444" : pct > 82 ? "#f59e0b" : "#18b39b";
                              return (
                                <div key={b.lbl} style={{ marginBottom: 10 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, marginBottom: 3 }}>
                                    <span>{b.lbl}</span><span style={{ color: c, fontWeight: 700 }}>{over ? "Over" : "OK"}</span>
                                  </div>
                                  <div style={{ height: 5, background: "#e2e8f0", borderRadius: 3, overflow: "hidden", position: "relative" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${Math.min(pct, 100)}%`, background: c, borderRadius: 3 }}></div>
                                  </div>
                                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{f(b.used)} of {f(b.total)} · {over ? f(Math.abs(b.after)) + " over" : f(b.after) + " remaining"}</div>
                                </div>
                              );
                            })}
                          </div>
                          <div style={CARD}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Supplier signals</div>
                            {[
                              ["Preferred supplier", sel.pref ? "Yes" : "No — off list", sel.pref ? "#166534" : "#dc2626"],
                              ["Last price", f(sel.last), "#64748b"],
                              ["Price variance", (pd >= 0 ? "+" : "") + pd + "%", pd > 15 ? "#dc2626" : pd > 5 ? "#b45309" : "#166534"],
                            ].map(([k, v, c]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "5px 0", borderBottom: "1px solid #f8fafc" }}>
                                <span style={{ color: "#94a3b8" }}>{k}</span><span style={{ fontWeight: 700, color: c }}>{v}</span>
                              </div>
                            ))}
                          </div>
                          <div style={CARD}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Note for buyer</div>
                            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Optional context..." style={{ width: "100%", borderRadius: 7, border: "1px solid #e2e8f0", padding: "8px 10px", fontSize: 11, fontFamily: "inherit", resize: "none", height: 56, color: "#0f172a", outline: "none", background: "#f8fafc" }} />
                            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                              <button onClick={() => doReject(sel.id)} style={{ flex: 1, background: "#fff", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, padding: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Reject</button>
                              <button onClick={() => doApprove(sel.id)} style={{ flex: 1, background: "#18b39b", color: "#fff", border: "none", borderRadius: 8, padding: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Approve →</button>
                            </div>
                            {nextPending && (
                              <button onClick={() => setSelId(nextPending.id)} style={{ width: "100%", background: "transparent", border: "none", fontSize: 11, color: "#94a3b8", cursor: "pointer", marginTop: 6, fontFamily: "inherit" }}>Skip to next ↓</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", gap: 8 }}>
                    <div style={{ fontSize: 28 }}>✓</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Select a pending request</div>
                    <div style={{ fontSize: 11 }}>Click any item on the left to review it</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BUYER QUEUE */}
          {page === "queue" && (
            <div style={{ flex: 1, overflow: "auto", padding: "14px 16px", background: "#f8fafc" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
                {[
                  { l: "To place",    v: approved.length, bg: "#eff6ff", c: "#1d4ed8" },
                  { l: "Total value", v: f(approved.reduce((a, r) => a + r.amt, 0)), bg: "#f8fafc", c: "#64748b" },
                  { l: "Urgent",      v: approved.filter(r => r.pri).length, bg: approved.filter(r => r.pri).length > 0 ? "#fff7ed" : "#f0fdf4", c: approved.filter(r => r.pri).length > 0 ? "#b45309" : "#166534" },
                  { l: "Placed",      v: ordered.length,  bg: "#f0fdf4", c: "#166534" },
                ].map(m => (
                  <div key={m.l} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 9, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>{m.l}</div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{m.v}</div>
                  </div>
                ))}
              </div>
              {approved.length === 0 && <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Queue clear — all approved requests have been placed.</div>}
              {approved.map(r => (
                <div key={r.id} onClick={() => setSelId(r.id)} style={{ border: `1px solid ${selId === r.id ? "#bfdbfe" : "#e2e8f0"}`, borderLeft: `3px solid ${selId === r.id ? "#0c2d5b" : "transparent"}`, borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", background: selId === r.id ? "#f0f9ff" : "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{r.id} · {r.venue}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{r.sup} · {r.cat}</div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{r.desc}</div>
                      <div style={{ marginTop: 7, display: "flex", gap: 5 }}>
                        <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: r.pref ? "#f0fdf4" : "#fef2f2", color: r.pref ? "#166534" : "#dc2626" }}>{r.pref ? "Preferred" : "Off-preferred"}</span>
                        <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: "#f1f5f9", color: "#64748b" }}>Approved {r.created} ago</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 14 }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{f(r.amt)}</div>
                      <button onClick={e => { e.stopPropagation(); doOrder(r.id); }} style={{ marginTop: 8, background: "#0c2d5b", color: "#fff", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Mark ordered</button>
                    </div>
                  </div>
                  {r.note && <div style={{ marginTop: 10, padding: "8px 10px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 7, fontSize: 11, color: "#92400e", lineHeight: 1.5 }}><strong style={{ fontSize: 10, textTransform: "uppercase" }}>Approver note: </strong>{r.note}</div>}
                </div>
              ))}
            </div>
          )}

          {/* CONTROL TOWER */}
          {page === "control" && (
            <div style={{ flex: 1, overflow: "auto", padding: "14px 16px", background: "#f8fafc" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
                {[
                  { l: "High severity",   v: EXCEPTIONS.filter(e => e.flags.some(fl => fl.type === "budget")).length,                              bg: "#fef2f2", bd: "#fecaca", c: "#dc2626" },
                  { l: "Medium severity", v: EXCEPTIONS.filter(e => e.flags.some(fl => fl.type === "supplier" || fl.type === "aging")).length,      bg: "#fff7ed", bd: "#fed7aa", c: "#b45309" },
                  { l: "Urgent pending",  v: pending.filter(r => r.pri).length,                                                                      bg: "#eff6ff", bd: "#bfdbfe", c: "#1d4ed8" },
                  { l: "Dismissed",       v: dismissed.length,                                                                                       bg: "#f8fafc", bd: "#e2e8f0", c: "#94a3b8" },
                ].map(m => (
                  <div key={m.l} style={{ background: m.bg, border: `1px solid ${m.bd}`, borderRadius: 9, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5, color: m.c }}>{m.l}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div>
                  </div>
                ))}
              </div>
              {EXCEPTIONS.length === 0 && (
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "32px", textAlign: "center", color: "#94a3b8" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#475569" }}>No exceptions</div>
                  <div style={{ fontSize: 12 }}>All requests are within policy</div>
                </div>
              )}
              {EXCEPTIONS.map(({ r, flags }) => (
                <div key={r.id} onClick={() => setSelId(r.id)} style={{ background: selId === r.id ? "#f0f9ff" : "#fff", border: `1px solid ${selId === r.id ? "#bfdbfe" : "#e2e8f0"}`, borderLeft: `4px solid ${flags.some(fl => fl.type === "budget") ? "#ef4444" : flags.some(fl => fl.type === "supplier" || fl.type === "aging") ? "#f59e0b" : "#a78bfa"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{r.id} · {r.venue} · {f(r.amt)}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{r.sup} · {r.cat} · {r.by}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 7 }}>
                        {flags.map(fl => <span key={fl.type} style={{ display: "inline-block", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: fl.bg, color: fl.c }}>{fl.title}</span>)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: ss(r.status).bg, color: ss(r.status).c }}>{r.status}</span>
                      <button onClick={e => { e.stopPropagation(); setDismissed(p => [...p, r.id]); }} style={{ fontSize: 10, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Dismiss ×</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REPORTS */}
          {page === "reports" && (
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                  { l: "Total spend",  v: f(rd.totalSpend), delta: rd.deltaSpend, tone: rd.spendTone, sub: "vs last period" },
                  { l: "Requests",     v: rd.requests,       delta: "+3",           tone: "up",         sub: "purchase requests" },
                  { l: "Compliance",   v: rd.compliance + "%", delta: "-4pts",      tone: "dn",         sub: "preferred suppliers" },
                  { l: "Avg approval", v: rd.avgApproval,    delta: "-0.6h",        tone: "up",         sub: "to decision" },
                ].map(m => (
                  <div key={m.l} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{m.l}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, marginBottom: 5 }}>{m.v}</div>
                    <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 99, fontSize: 10, fontWeight: 700, background: m.tone === "up" ? "#f0fdf4" : m.tone === "dn" ? "#fef2f2" : "#f8fafc", color: m.tone === "up" ? "#166534" : m.tone === "dn" ? "#dc2626" : "#64748b" }}>{m.delta}</span>
                    <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: 5 }}>{m.sub}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={CARD}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Spend by site</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 14 }}>How much each site has spent this period</div>
                  {siteBudgets.map(b => (
                    <div key={b.l} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, marginBottom: 3 }}><span>{b.l}</span><span style={{ color: "#64748b" }}>{f(b.pct * 70)}</span></div>
                      <div style={{ height: 18, background: "#f1f5f9", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${b.pct}%`, background: b.c, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>{b.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, fontSize: 11, color: "#475569", lineHeight: 1.55, paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>{rd.insight1}</div>
                </div>
                <div style={CARD}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Spend by category</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 14 }}>Where the money is going</div>
                  {catSpend.map(c => {
                    const pct = Math.round((c.v / maxCat) * 100);
                    return (
                      <div key={c.l} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, marginBottom: 3 }}><span>{c.l}</span><span style={{ color: "#64748b" }}>{f(c.v)}</span></div>
                        <div style={{ height: 18, background: "#f1f5f9", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: c.c, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>{pct}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ marginTop: 10, fontSize: 11, color: "#475569", lineHeight: 1.55, paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>{rd.insight2}</div>
                </div>
                <div style={CARD}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Supplier compliance by site</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 14 }}>Preferred supplier usage — target is 85%</div>
                  {compSites.map(s => {
                    const color = s.v >= 85 ? "#18b39b" : s.v >= 70 ? "#f59e0b" : "#ef4444";
                    return (
                      <div key={s.l} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, marginBottom: 3 }}>
                          <span>{s.l}</span>
                          <span style={{ color, fontWeight: 700 }}>{s.v}% {s.v >= 85 ? "On target" : s.v >= 70 ? "Below target" : "Needs attention"}</span>
                        </div>
                        <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${s.v}%`, background: color, borderRadius: 4 }}></div>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ marginTop: 6, fontSize: 11, color: "#475569", lineHeight: 1.55, paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>{rd.insight3}</div>
                </div>
                <div style={CARD}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Key metrics</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 14 }}>{period}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      ["Controlled spend",   f(rd.totalSpend)],
                      ["Requests processed", String(rd.requests)],
                      ["Compliance rate",    rd.compliance + "%"],
                      ["Avg approval time",  rd.avgApproval],
                    ].map(([l, v]) => (
                      <div key={l} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{l}</div>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
