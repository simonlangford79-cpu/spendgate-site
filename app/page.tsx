"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // Wire up to your actual backend / email service here
    setSubmitted(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #0c2d5b;
          --teal:   #18b39b;
          --green:  #8bc53f;
          --ink:    #0f172a;
          --muted:  #64748b;
          --border: #e2e8f0;
          --bg:     #ffffff;
          --grain:  url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        /* ── Animations ─────────────────────────────── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp .6s ease both; }
        .a2 { animation: fadeUp .6s .12s ease both; }
        .a3 { animation: fadeUp .6s .22s ease both; }
        .a4 { animation: fadeUp .6s .34s ease both; }
        .a5 { animation: fadeUp .6s .44s ease both; }

        /* ── Layout ─────────────────────────────────── */
        .wrap  { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .wrap-sm { max-width: 720px; margin: 0 auto; padding: 0 24px; }

        /* ── Nav ────────────────────────────────────── */
        nav {
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
        }
        nav .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        nav img { height: 36px; width: auto; }
        nav a {
          font-size: 14px; font-weight: 600;
          color: var(--navy);
          text-decoration: none;
          border: 1.5px solid var(--navy);
          border-radius: 99px;
          padding: 8px 20px;
          transition: background .18s, color .18s;
        }
        nav a:hover { background: var(--navy); color: #fff; }

        /* ── Hero ───────────────────────────────────── */
        .hero {
          padding: 72px 0 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% -10%, rgba(24,179,155,.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
          color: var(--teal);
          background: rgba(24,179,155,.08);
          border: 1px solid rgba(24,179,155,.25);
          border-radius: 99px;
          padding: 5px 14px;
          margin-bottom: 28px;
        }
        .eyebrow span { width: 6px; height: 6px; background: var(--teal); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:.4; } }

        .hero h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(40px, 6vw, 76px);
          line-height: 1.02;
          letter-spacing: -.02em;
          color: var(--ink);
          max-width: 820px;
          margin: 0 auto;
        }
        .hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 55%, var(--green) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          margin: 24px auto 0;
          max-width: 560px;
          font-size: 18px; line-height: 1.7;
          color: var(--muted);
        }

        /* ── Form ───────────────────────────────────── */
        .capture-form {
          margin: 36px auto 0;
          max-width: 520px;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .capture-form .row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        @media (max-width: 520px) {
          .capture-form .row { grid-template-columns: 1fr; }
        }
        .capture-form input {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          background: #fff;
          color: var(--ink);
          outline: none;
          transition: border-color .18s;
        }
        .capture-form input::placeholder { color: #94a3b8; }
        .capture-form input:focus { border-color: var(--teal); }
        .capture-form button {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          padding: 14px;
          border: none; border-radius: 10px; cursor: pointer;
          background: var(--navy);
          color: #fff;
          transition: background .18s, transform .15s;
        }
        .capture-form button:hover { background: #0a254b; transform: translateY(-1px); }

        .success-box {
          margin: 36px auto 0;
          max-width: 520px;
          background: rgba(24,179,155,.07);
          border: 1px solid rgba(24,179,155,.3);
          border-radius: 18px;
          padding: 24px;
          text-align: center;
          color: var(--teal);
          font-weight: 600;
          font-size: 15px;
        }

        .form-note {
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 6px;
        }

        /* ── Social proof bar ───────────────────────── */
        .proof-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
          background: #fafbfc;
        }
        .proof-bar .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 8px 32px;
          font-size: 13px; color: var(--muted);
        }
        .proof-bar strong { color: var(--ink); }
        .proof-bar .dot { color: var(--border); }

        /* ── Mock UI ────────────────────────────────── */
        .mockup-section { padding: 72px 0 0; }

        .mockup-label {
          text-align: center;
          font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 32px;
        }

        .mockup {
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04);
          max-width: 840px;
          margin: 0 auto;
        }

        .mockup-header {
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
          padding: 14px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mockup-header .title { font-size: 13px; font-weight: 600; color: var(--ink); }
        .mockup-header .budget-tag {
          font-size: 12px; font-weight: 600;
          background: rgba(12,45,91,.07); color: var(--navy);
          border-radius: 99px; padding: 4px 12px;
        }

        .mockup-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          transition: background .15s;
        }
        .mockup-row:last-child { border-bottom: none; }
        .mockup-row:hover { background: #fafbfc; }

        .mockup-row .left {}
        .mockup-row .name { font-size: 14px; font-weight: 600; color: var(--ink); }
        .mockup-row .meta { font-size: 12px; color: var(--muted); margin-top: 2px; }

        .mockup-row .right { display: flex; align-items: center; gap: 14px; text-align: right; }
        .mockup-row .amount { font-size: 14px; font-weight: 700; color: var(--ink); }
        .badge {
          font-size: 11px; font-weight: 700; border-radius: 99px; padding: 3px 10px;
        }
        .badge-amber  { background: #fff7ed; color: #b45309; }
        .badge-green  { background: #f0fdf4; color: #16a34a; }
        .badge-sky    { background: #f0f9ff; color: #0369a1; }
        .badge-red    { background: #fef2f2; color: #dc2626; }

        /* ── Divider ────────────────────────────────── */
        .section-divider {
          max-width: 1px; height: 60px; background: var(--border);
          margin: 72px auto 0;
        }

        /* ── Problem ────────────────────────────────── */
        .problem-section { padding: 72px 0; }

        .problem-section h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 44px);
          line-height: 1.15;
          letter-spacing: -.02em;
          color: var(--ink);
          margin-bottom: 32px;
        }

        .problem-section p {
          font-size: 17px; line-height: 1.8;
          color: var(--muted);
          margin-bottom: 16px;
        }
        .problem-section p strong { color: var(--ink); }

        .highlight-box {
          margin-top: 32px;
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(12,45,91,.04), rgba(24,179,155,.06));
          border: 1px solid rgba(24,179,155,.2);
          border-radius: 14px;
          font-size: 16px; font-weight: 600; color: var(--navy);
          line-height: 1.6;
        }

        /* ── Verticals ──────────────────────────────── */
        .verticals-section { padding: 0 0 72px; }
        .verticals-section h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(24px, 3vw, 36px);
          letter-spacing: -.02em;
          margin-bottom: 28px;
          color: var(--ink);
        }

        .vertical-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        @media (max-width: 600px) { .vertical-grid { grid-template-columns: 1fr 1fr; } }

        .vertical-card {
          border: 1.5px solid var(--border);
          border-radius: 14px;
          padding: 16px 18px;
          transition: border-color .2s, box-shadow .2s;
        }
        .vertical-card:hover {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(24,179,155,.08);
        }
        .vertical-card .icon { font-size: 20px; margin-bottom: 8px; }
        .vertical-card .label { font-size: 14px; font-weight: 600; color: var(--ink); }
        .vertical-card .desc  { font-size: 12px; color: var(--muted); margin-top: 3px; line-height: 1.5; }

        /* ── How it works ───────────────────────────── */
        .how-section { background: var(--navy); padding: 72px 0; color: #fff; }

        .how-section h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 42px);
          letter-spacing: -.02em;
          margin-bottom: 48px;
          color: #fff;
        }

        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 640px) { .steps { grid-template-columns: 1fr; } }

        .step {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px;
          padding: 28px;
        }

        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 48px; line-height: 1;
          color: var(--teal);
          margin-bottom: 16px;
        }

        .step h3 {
          font-size: 16px; font-weight: 700; margin-bottom: 8px;
          color: #fff;
        }

        .step p {
          font-size: 14px; line-height: 1.7;
          color: rgba(255,255,255,.6);
        }

        /* ── Footer CTA ─────────────────────────────── */
        .footer-cta {
          padding: 80px 0;
          text-align: center;
          border-top: 1px solid var(--border);
        }
        .footer-cta h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 46px);
          letter-spacing: -.02em;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .footer-cta p {
          font-size: 17px; color: var(--muted); margin-bottom: 36px;
        }

        .urgency-row {
          display: flex; align-items: center; justify-content: center;
          gap: 20px; flex-wrap: wrap;
          margin-top: 20px;
          font-size: 13px; color: var(--muted);
        }
        .urgency-row .pill {
          display: flex; align-items: center; gap: 6px;
          background: #f8fafc; border: 1px solid var(--border);
          border-radius: 99px; padding: 6px 14px;
        }
        .urgency-row .dot-green { width: 7px; height: 7px; background: var(--teal); border-radius: 50%; }

        /* ── Footer bar ─────────────────────────────── */
        footer {
          border-top: 1px solid var(--border);
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
          max-width: 1120px; margin: 0 auto;
          font-size: 13px; color: var(--muted);
        }
        footer a { color: var(--muted); text-decoration: none; }
        footer a:hover { color: var(--ink); }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="inner">
          <img src="/spendgate-logo.png" alt="SpendGate" />
          <a href="#early-access">Request early access</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="a1">
            <div className="eyebrow">
              <span></span>
              Early access open · Pre-launch
            </div>
          </div>

          <h1 className="a2">
            Your site managers are spending
            <br />
            money right now.
            <br />
            <em>Do you know about it?</em>
          </h1>

          <p className="hero-sub a3">
            SpendGate gives multi-site businesses structured purchase approvals
            and spend visibility — before invoices land on your desk.
          </p>

          {!submitted ? (
            <form className="capture-form a4" onSubmit={handleSubmit} id="early-access">
              <div className="row">
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>
              <button type="submit">Request early access →</button>
              <p className="form-note">No commitment. We'll reach out within 48 hours.</p>
            </form>
          ) : (
            <div className="success-box a4">
              ✓ &nbsp;You're on the list — we'll be in touch within 48 hours.
            </div>
          )}
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <div className="proof-bar">
        <div className="inner">
          <span><strong>14 operators</strong> in early conversations</span>
          <span className="dot">·</span>
          <span>Built with teams managing <strong>10–80 sites</strong></span>
          <span className="dot">·</span>
          <span><strong>"We run this over WhatsApp. It's a nightmare."</strong> — Group Finance Director</span>
        </div>
      </div>

      {/* PRODUCT MOCKUP */}
      <section className="mockup-section">
        <div className="wrap">
          <div className="mockup-label">Live purchase request queue</div>
          <div className="mockup">
            <div className="mockup-header">
              <span className="title">Purchase Requests — All Sites</span>
              <span className="budget-tag">Monthly budget: £28,000 remaining</span>
            </div>
            <div className="mockup-row">
              <div className="left">
                <div className="name">HVAC emergency repair</div>
                <div className="meta">The Belfry Golf Club · Submitted by J. Walsh · 2h ago</div>
              </div>
              <div className="right">
                <div className="amount">£2,400</div>
                <span className="badge badge-amber">Awaiting approval</span>
              </div>
            </div>
            <div className="mockup-row">
              <div className="left">
                <div className="name">Kitchen equipment replacement</div>
                <div className="meta">London Central · Submitted by D. Osei · 5h ago</div>
              </div>
              <div className="right">
                <div className="amount">£1,850</div>
                <span className="badge badge-green">Approved</span>
              </div>
            </div>
            <div className="mockup-row">
              <div className="left">
                <div className="name">Cleaning supplies — monthly order</div>
                <div className="meta">Manchester Spinningfields · Submitted by L. Chen · Yesterday</div>
              </div>
              <div className="right">
                <div className="amount">£340</div>
                <span className="badge badge-green">Approved</span>
              </div>
            </div>
            <div className="mockup-row">
              <div className="left">
                <div className="name">Emergency plumbing — staff toilets</div>
                <div className="meta">Birmingham NEC · Submitted by M. Patel · Yesterday</div>
              </div>
              <div className="right">
                <div className="amount">£680</div>
                <span className="badge badge-sky">Pending review</span>
              </div>
            </div>
            <div className="mockup-row">
              <div className="left">
                <div className="name">Gym equipment — treadmill servicing</div>
                <div className="meta">Leeds Central · Submitted by S. Brooke · 2 days ago</div>
              </div>
              <div className="right">
                <div className="amount">£910</div>
                <span className="badge badge-red">Rejected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="wrap-sm">
          <h2>Operational purchasing happens whether you're watching or not.</h2>
          <p>
            Site managers buy things every day — maintenance supplies, consumables,
            equipment, emergency fixes. <strong>That spending is happening right now,</strong> across
            every site you run.
          </p>
          <p>
            Most of it travels over WhatsApp threads, forwarded emails, and verbal
            sign-offs. Finance teams are the last to know — when the invoice arrives,
            the decision is already made.
          </p>
          <div className="highlight-box">
            SpendGate puts approval control and spend visibility at the point of
            request, not the point of payment.
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="verticals-section">
        <div className="wrap">
          <h2>Built for operators running distributed estates</h2>
          <div className="vertical-grid">
            {[
              { icon: "🍽️", label: "Restaurant chains",      desc: "Manage consumable & equipment spend across every site" },
              { icon: "🏨", label: "Hospitality groups",     desc: "Control maintenance costs before they hit your P&L" },
              { icon: "⛳", label: "Golf operators",          desc: "Course & clubhouse spend, approved before it's ordered" },
              { icon: "💪", label: "Gym & fitness groups",   desc: "Equipment servicing and supply requests, tracked centrally" },
              { icon: "🏢", label: "Facilities businesses",  desc: "Structured purchasing across complex property portfolios" },
              { icon: "🛍️", label: "Retail groups",          desc: "Store-level spend under control, without the spreadsheets" },
            ].map(v => (
              <div className="vertical-card" key={v.label}>
                <div className="icon">{v.icon}</div>
                <div className="label">{v.label}</div>
                <div className="desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="wrap">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Site teams submit requests in 30 seconds</h3>
              <p>No email chains. No WhatsApp. A simple request form with cost, context, and urgency — sent directly into the approval queue.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Managers approve (or reject) before money is spent</h3>
              <p>Every request reaches the right approver instantly. Approve on mobile, add notes, or push back — before anything is ordered.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Finance sees the full picture, in real time</h3>
              <p>No more invoice surprises. Finance gets a live view of approved spend, pending requests, and budget position across all sites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta" id="footer-access">
        <div className="wrap">
          <h2>Join the early access list</h2>
          <p>We're speaking with operators, finance leaders, and design partners right now.</p>

          {!submitted ? (
            <form className="capture-form" style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
              <div className="row">
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>
              <button type="submit">Get early access →</button>
              <p className="form-note">No commitment · We'll reach out within 48 hours</p>
            </form>
          ) : (
            <div className="success-box" style={{ maxWidth: 520, margin: "0 auto" }}>
              ✓ &nbsp;You're on the list — we'll be in touch within 48 hours.
            </div>
          )}

          <div className="urgency-row">
            <div className="pill"><div className="dot-green"></div>14 operators already in conversations</div>
            <div className="pill">Targeting Q3 2025 beta</div>
            <div className="pill">
              <a href="mailto:hello@spendgate.io" style={{ color: "inherit" }}>hello@spendgate.io</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img src="/spendgate-logo.png" alt="SpendGate" style={{ height: 24 }} />
        <span>© {new Date().getFullYear()} SpendGate · Lightweight spend control for multi-site operators</span>
        <a href="mailto:hello@spendgate.io">hello@spendgate.io</a>
      </footer>
    </>
  );
}
