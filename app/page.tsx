"use client";

import { useState } from "react";

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How is this different from managing spend over email or WhatsApp?",
      a: "Email and WhatsApp have no structure — no budget check, no audit trail, no supplier enforcement. By the time finance sees the invoice, the decision was made days ago over a chat message. SpendGate captures the request before any money moves, routes it to the right approver automatically, and only hands it to the buyer once approved. Finance sees the full picture in real time, not at month end."
    },
    {
      q: "How is it different from ApprovalMax?",
      a: "ApprovalMax is built around your accounting software — it approves bills and invoices that already exist in Xero or QuickBooks. By the time something reaches ApprovalMax, the spend decision has already been made. SpendGate sits earlier in the process: it captures the purchase request before any money moves, at the point the site manager is deciding to buy something. It is pre-purchase control, not post-purchase approval."
    },
    {
      q: "How is it different from ProcurementExpress or similar tools?",
      a: "ProcurementExpress is a capable tool and the closest comparison. SpendGate is more focused: it is built specifically for multi-site operators managing informal, ad-hoc operational purchasing. The three-role workflow (Requester, Approver, Buyer) and the dedicated Buyer Queue are designed around how operational purchasing actually flows in distributed businesses, not around formal PO management."
    },
    {
      q: "Does it just approve requests, or does it handle the actual ordering too?",
      a: "Both. Once a request is approved it moves into a Buyer Queue — a dedicated execution view for the person responsible for placing the order. Finance sees the full workflow from request submitted through to order placed. There are no more surprise invoices because the spend is visible and controlled at every stage."
    },
    {
      q: "Can we set different approval rules for different spend levels or categories?",
      a: "Yes. You configure approval routing by site, category, and amount threshold. Under 500 might need one manager sign-off. Over 500 escalates to a regional approver. Once the rules are set, routing is automatic."
    },
    {
      q: "We only have 3 sites right now. Is this too early for us?",
      a: "Probably not. The chaos of unstructured operational purchasing tends to start at 2 or 3 sites and compounds quickly from there. Early design partners are typically operators managing between 3 and 20 sites who want to build the right habits before scale makes the problem much harder to fix."
    }
  ];

  const mockupRows = [
    { name: "HVAC emergency repair",            meta: "Site A · J. Walsh · 2h ago · Maintenance",   amount: "£2,400", badge: "Awaiting approval", cls: "badge-amber" },
    { name: "Kitchen equipment replacement",    meta: "Site B · D. Osei · 5h ago · Kitchen",         amount: "£1,850", badge: "Approved",          cls: "badge-green" },
    { name: "Cleaning supplies — monthly",      meta: "Site C · L. Chen · Yesterday · Cleaning",     amount: "£340",   badge: "Approved",          cls: "badge-green" },
    { name: "Emergency plumbing — staff block", meta: "Site D · M. Patel · Yesterday · Maintenance", amount: "£680",   badge: "Pending review",    cls: "badge-sky"   },
    { name: "Treadmill servicing",              meta: "Site E · S. Brooke · 2 days ago · Equipment", amount: "£910",   badge: "Rejected",          cls: "badge-red"   },
  ];

  const verticals = [
    { icon: "🍽️", label: "Restaurant chains",     desc: "Consumable and equipment spend controlled across every site" },
    { icon: "🏨", label: "Hospitality groups",    desc: "Maintenance and ops costs approved before they hit your P&L" },
    { icon: "⛳", label: "Golf and leisure",       desc: "Course, clubhouse, and facility spend, routed before ordered" },
    { icon: "💪", label: "Gym and fitness",        desc: "Equipment servicing and supply requests, tracked centrally" },
    { icon: "🏢", label: "Facilities businesses", desc: "Structured purchasing across complex property portfolios" },
    { icon: "🛍️", label: "Retail and more",        desc: "Any business where site managers buy things every day" },
  ];

  const diffCards = [
    { vs: "vs. ApprovalMax",                    title: "Before the invoice, not after it",                body: "ApprovalMax approves bills that already exist in your accounting system. By then the decision was already made. SpendGate sits earlier — it captures the request before any money moves.",                                                                              tag: "Pre-purchase control" },
    { vs: "vs. ProcurementExpress and similar", title: "Built for operational purchasing, not formal POs", body: "Most purchase order tools are designed around formal PO management for procurement teams. SpendGate is built for the informal, ad-hoc spend that happens every day — managed by site managers, not buyers.",                                                           tag: "Operational, not strategic" },
    { vs: "vs. Email and WhatsApp",             title: "Structure where there was none",                  body: "Chat tools have no budget check, no audit trail, no supplier enforcement. Finance only discovers spend when the invoice lands. SpendGate captures the request before any money moves and routes it to the right approver.",                                              tag: "Replaces informal approval" },
    { vs: "What makes it work at scale",        title: "The Buyer Queue: a step most tools skip",         body: "Most approval tools treat approval as the end of the workflow. SpendGate adds a Buyer Queue — a dedicated execution step where the person placing the order works from a clean list of approved requests. Finance sees the full journey.",                              tag: "Request to order, not just approval" },
  ];

  const steps = [
    { n: "1", title: "Budget impact before approval",  body: "Every request shows site and category budget remaining, what approval would leave, and whether it tips into an exception. Approvers see this before they decide." },
    { n: "2", title: "Preferred supplier enforcement", body: "Flag when a request uses a supplier outside your preferred list. Benchmark the price against recent comparable spend. The context is there before the approver clicks." },
    { n: "3", title: "Configurable approval routing",  body: "Single approver for standard spend. Automatic escalation above a threshold. Additional finance sign-off for specific categories. Rules are yours to define." },
    { n: "4", title: "Buyer queue for execution",      body: "Approved requests move to a dedicated buyer view. The person placing the order works from a clean, structured list of what has been signed off." },
    { n: "5", title: "Control Tower for exceptions",   body: "One view of every request with a policy signal, budget pressure, ageing approval, or off-preferred supplier. Exceptions surface automatically." },
    { n: "6", title: "Finance visibility end to end",  body: "From request submitted to order placed, finance sees the full journey in real time. No more discovering spend when the invoice arrives." },
  ];

  return (
    <>
      <nav>
        <div className="inner">
          <img src="/spendgate-logo.png" alt="SpendGate" />
          <a href="mailto:hello@spendgate.io?subject=SpendGate early access" className="cta">Get in touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-logo a1">
            <img src="/spendgate-logo.png" alt="SpendGate" />
          </div>
          <div className="a2">
            <div className="eyebrow"><span></span>Early access open · Pre-launch</div>
          </div>
          <h1 className="a3">
            Your site managers are spending
            <br />money right now.
            <br /><em>Do you know about it?</em>
          </h1>
          <p className="hero-sub a4">
            SpendGate is lightweight spend control for multi-site businesses.
            Structured purchase requests, approval routing, and a buyer queue —
            so finance sees every penny before the invoice arrives.
          </p>
          <div className="a5">
            <a href="mailto:hello@spendgate.io?subject=SpendGate early access" className="cta-button">
              Get in touch →
            </a>
            <p className="cta-note">We are speaking with operators and finance leaders right now.</p>
          </div>
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="proof-bar">
        <div className="inner">
          <span>Early conversations open with <strong>multi-site businesses</strong></span>
          <span className="dot">·</span>
          <span>Built with operators managing <strong>3 to 80 sites</strong></span>
          <span className="dot">·</span>
          <span><strong>We run this over WhatsApp. It is a nightmare.</strong> — Group Finance Director</span>
        </div>
      </div>

      {/* PRODUCT SCREENSHOT + DEMO CTA */}
      <section className="demo-section">
        <div className="wrap">
          <div className="section-label">See it in action</div>
          <h2 className="section-title">A product built for the people doing the work</h2>
          <p className="section-sub">Site managers, approvers, buyers, and finance — each with their own view. Try the interactive demo to see how it flows.</p>

          {/* Browser chrome screenshot */}
          <div className="browser-frame">
            <div className="browser-chrome">
              <div className="browser-dots">
                <span style={{background:"#ef4444"}}></span>
                <span style={{background:"#f59e0b"}}></span>
                <span style={{background:"#22c55e"}}></span>
              </div>
              <div className="browser-url">app.spendgate.io / dashboard</div>
            </div>
            <div className="browser-product">
              {/* Mini sidebar */}
              <div className="mini-sidebar">
                <div className="mini-logo">Spend<em>Gate</em></div>
                <div className="mini-org">Apex Operations</div>
                {[["Dashboard","on"],["Requests",""],["Approvals",""],["Buyer Queue",""],["Control Tower",""],["Reports",""]].map(([l,a])=>(
                  <div key={l} className={`mini-nav-item${a?" active":""}`}>{l}</div>
                ))}
              </div>
              {/* Mini dashboard */}
              <div className="mini-main">
                <div className="mini-topbar">
                  <div>
                    <div className="mini-title">Dashboard</div>
                    <div className="mini-sub">Live portfolio view</div>
                  </div>
                  <div className="mini-live"><span></span>Live</div>
                </div>
                <div className="mini-content">
                  <div className="mini-metrics">
                    {[
                      {l:"Pending approval",v:"2",bg:"#fff7ed",c:"#b45309"},
                      {l:"Awaiting order",  v:"2",bg:"#eff6ff",c:"#1d4ed8"},
                      {l:"Controlled spend",v:"£7,620",bg:"#f8fafc",c:"#64748b"},
                      {l:"Compliance",      v:"78%",bg:"#fff7ed",c:"#b45309"},
                    ].map(m=>(
                      <div key={m.l} className="mini-metric">
                        <div className="mini-metric-label">{m.l}</div>
                        <div className="mini-metric-value">{m.v}</div>
                        <span className="mini-pill" style={{background:m.bg,color:m.c}}>This month</span>
                      </div>
                    ))}
                  </div>
                  <div className="mini-cards">
                    <div className="mini-card">
                      <div className="mini-card-head">Approval queue</div>
                      <div className="mini-card-sub">Waiting for decision</div>
                      {[
                        {id:"JG-0016",site:"Site 3",desc:"Replacement fittings — irrigation repair",amt:"£145",urgent:true},
                        {id:"JG-0015",site:"Site 2",desc:"Weekend event stock top-up",amt:"£268",urgent:false},
                      ].map(r=>(
                        <div key={r.id} className="mini-qcard">
                          <div className="mini-qcard-top">
                            <div>
                              <div className="mini-qcard-id">{r.id} · {r.site}{r.urgent&&<span className="mini-tag">Urgent</span>}</div>
                              <div className="mini-qcard-desc">{r.desc}</div>
                            </div>
                            <div className="mini-qcard-amt">{r.amt}</div>
                          </div>
                          <div className="mini-qcard-foot">Review →</div>
                        </div>
                      ))}
                    </div>
                    <div className="mini-card">
                      <div className="mini-card-head">Site budget overview</div>
                      <div className="mini-card-sub">Monthly spend vs budget</div>
                      {[
                        {l:"Site 1 — Central",pct:56,c:"#0c2d5b"},
                        {l:"Site 2 — East",   pct:44,c:"#18b39b"},
                        {l:"Site 3 — North",  pct:46,c:"#6366f1"},
                      ].map(b=>(
                        <div key={b.l} className="mini-bar-row">
                          <div className="mini-bar-label">{b.l}</div>
                          <div className="mini-bar-track">
                            <div className="mini-bar-fill" style={{width:`${b.pct}%`,background:b.c}}></div>
                          </div>
                          <div className="mini-bar-pct" style={{color:b.c}}>{b.pct}%</div>
                        </div>
                      ))}
                      <div className="mini-budget-footer">All sites within budget · <span style={{color:"#166534",fontWeight:700}}>Healthy</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo CTA */}
          <div className="demo-cta-row">
            <a href="/demo" target="_blank" className="demo-btn">Try the interactive demo →</a>
            <span className="demo-note">No login required · All screens included · Takes 2 minutes</span>
          </div>
        </div>
      </section>

      {/* THREE-ROLE WORKFLOW */}
      <section className="workflow-section">
        <div className="wrap">
          <div className="section-label">How SpendGate works</div>
          <h2 className="section-title">Three roles. One controlled workflow.</h2>
          <p className="section-sub">Every purchase request travels through a structured path — from submission to approval to order placed. Finance sees all of it, in real time.</p>
          <div className="workflow-grid">
            <div className="workflow-step">
              <div className="step-badge requester">Requester</div>
              <h3>Submit in 30 seconds</h3>
              <p>Site managers submit purchase requests with supplier, amount, category, and reason. No WhatsApp, no email chain. A structured form that feeds directly into the approval queue.</p>
              <div className="step-arrow">→</div>
            </div>
            <div className="workflow-step">
              <div className="step-badge approver">Approver</div>
              <h3>Approve before money moves</h3>
              <p>Managers see the full picture — budget impact, preferred supplier check, price against last comparable spend — and approve or reject before anything is ordered.</p>
              <div className="step-arrow">→</div>
            </div>
            <div className="workflow-step">
              <div className="step-badge buyer">Buyer</div>
              <h3>Execute from a clean queue</h3>
              <p>Approved requests land in a Buyer Queue. The person placing the order works from a single list of what has been signed off. Finance sees the full journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="wrap-sm">
          <h2>Operational purchasing happens whether you are watching or not.</h2>
          <p>Site managers buy things every day — maintenance supplies, consumables, equipment, emergency fixes. <strong>That spending is happening right now,</strong> across every site you run.</p>
          <p>Most of it travels over WhatsApp threads, forwarded emails, and verbal sign-offs. Finance teams are the last to know — when the invoice arrives, the decision was made days ago.</p>
          <div className="highlight-box">SpendGate puts approval control and spend visibility at the point of request, not the point of payment.</div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="diff-section">
        <div className="wrap">
          <div className="section-label">How SpendGate is different</div>
          <h2 className="section-title">There are other tools. Here is why we built this one.</h2>
          <div className="diff-grid">
            {diffCards.map(d => (
              <div className="diff-card" key={d.title}>
                <div className="vs-label">{d.vs}</div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
                <span className="tag-teal">{d.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section className="verticals-section">
        <div className="wrap">
          <div className="section-label">Who it is built for</div>
          <h2 className="section-title">Any multi-site business with operational purchasing</h2>
          <div className="vertical-grid">
            {verticals.map(v => (
              <div className="vertical-card" key={v.label}>
                <div className="icon">{v.icon}</div>
                <div className="label">{v.label}</div>
                <div className="desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS DETAIL */}
      <section className="how-section">
        <div className="wrap">
          <div className="section-label">The detail</div>
          <h2 className="section-title">Built for the messy reality of operational purchasing</h2>
          <p className="section-sub">SpendGate handles the edge cases your current process ignores.</p>
          <div className="steps">
            {steps.map(s => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap-sm">
          <div className="section-label">Common questions</div>
          <h2 className="section-title">Things people usually ask</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={openFaq === i ? "faq-item open" : "faq-item"} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta">
        <div className="wrap">
          <h2>Interested in an early conversation?</h2>
          <p>We are speaking with operators and finance leaders right now. No pitch, no demo pressure — just an honest conversation about the problem.</p>
          <a href="mailto:hello@spendgate.io?subject=SpendGate early access" className="cta-button">
            Email us →
          </a>
          <div className="urgency-row">
            <div className="urgency-pill"><span className="dot-teal"></span>Early conversations open now</div>
            <div className="urgency-pill">Targeting Q3 2026 beta</div>
            <div className="urgency-pill">hello@spendgate.io</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="site-footer">
        <img src="/spendgate-logo.png" alt="SpendGate" />
        <span>© {new Date().getFullYear()} SpendGate · Lightweight spend control for multi-site businesses</span>
        <a href="mailto:hello@spendgate.io">hello@spendgate.io</a>
      </div>
    </>
  );
}
