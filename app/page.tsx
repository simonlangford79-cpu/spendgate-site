"use client";

import { useState, FormEvent } from "react";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

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
      a: "ProcurementExpress is a capable tool and the closest comparison. SpendGate is more focused: it is built specifically for multi-site operators managing informal, ad-hoc operational purchasing — the emergency repair, the weekend stock top-up, the maintenance call-out. The three-role workflow (Requester, Approver, Buyer) and the dedicated Buyer Queue are designed around how operational purchasing actually flows in distributed businesses, not around formal PO management."
    },
    {
      q: "Does it just approve requests, or does it handle the actual ordering too?",
      a: "Both. Once a request is approved it moves into a Buyer Queue — a dedicated execution view for the person responsible for placing the order. Finance sees the full workflow from request submitted through to order placed. There are no more surprise invoices because the spend is visible and controlled at every stage, not just when the invoice arrives."
    },
    {
      q: "Can we set different approval rules for different spend levels or categories?",
      a: "Yes. You configure approval routing by site, category, and amount threshold. Under £500 might need one manager sign-off. Over £500 escalates to a regional approver. Kitchen spend over £400 can require an additional finance step. Once the rules are set, routing is automatic — no manual intervention needed."
    },
    {
      q: "We only have 3 sites right now. Is this too early for us?",
      a: "Probably not. The chaos of unstructured operational purchasing tends to start at 2 or 3 sites and compounds quickly from there. Early design partners are typically operators managing between 3 and 20 sites who want to build the right habits before scale makes the problem much harder to fix."
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #0c2d5b;
          --teal:   #18b39b;
          --green:  #8bc53f;
          --ink:    #0f172a;
          --muted:  #64748b;
          --border: #e2e8f0;
          --bg:     #ffffff;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp .55s ease both; }
        .a2 { animation: fadeUp .55s .1s ease both; }
        .a3 { animation: fadeUp .55s .2s ease both; }
        .a4 { animation: fadeUp .55s .3s ease both; }
        .a5 { animation: fadeUp .55s .4s ease both; }

        @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:.35; } }

        .wrap    { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .wrap-sm { max-width: 760px;  margin: 0 auto; padding: 0 24px; }

        /* NAV */
        nav {
          padding: 18px 0;
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(10px);
        }
        nav .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        nav img { height: 32px; width: auto; }
        nav a.cta {
          font-size: 13px; font-weight: 600; color: #fff;
          background: var(--navy); text-decoration: none;
          border-radius: 99px; padding: 9px 22px;
          transition: background .18s, transform .15s; white-space: nowrap;
        }
        nav a.cta:hover { background: #0a254b; transform: translateY(-1px); }

        /* HERO */
        .hero {
          padding: 60px 0 56px; text-align: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 55% at 50% -5%, rgba(24,179,155,.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-logo { display: flex; justify-content: center; margin-bottom: 36px; }
        .hero-logo img { width: clamp(180px, 30vw, 340px); height: auto; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase;
          color: var(--teal); background: rgba(24,179,155,.07);
          border: 1px solid rgba(24,179,155,.22);
          border-radius: 99px; padding: 5px 14px; margin-bottom: 28px;
        }
        .eyebrow span { width: 6px; height: 6px; background: var(--teal); border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }

        .hero h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(38px, 5.5vw, 70px);
          line-height: 1.03; letter-spacing: -.025em;
          color: var(--ink); max-width: 860px; margin: 0 auto;
        }
        .hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 55%, var(--green) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .hero-sub {
          margin: 22px auto 0; max-width: 580px;
          font-size: 17px; line-height: 1.75; color: var(--muted);
        }

        /* FORM */
        .capture-form {
          margin: 34px auto 0; max-width: 500px;
          background: #f8fafc; border: 1px solid var(--border);
          border-radius: 18px; padding: 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .capture-form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 500px) { .capture-form .row { grid-template-columns: 1fr; } }
        .capture-form input {
          width: 100%; font-family: 'DM Sans', sans-serif;
          font-size: 14px; padding: 11px 15px;
          border: 1.5px solid var(--border); border-radius: 10px;
          background: #fff; color: var(--ink); outline: none; transition: border-color .18s;
        }
        .capture-form input::placeholder { color: #94a3b8; }
        .capture-form input:focus { border-color: var(--teal); }
        .capture-form button {
          width: 100%; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; padding: 13px;
          border: none; border-radius: 10px; cursor: pointer;
          background: var(--navy); color: #fff; transition: background .18s, transform .15s;
        }
        .capture-form button:hover { background: #0a254b; transform: translateY(-1px); }
        .form-note { text-align: center; font-size: 12px; color: #94a3b8; }

        .success-box {
          margin: 34px auto 0; max-width: 500px;
          background: rgba(24,179,155,.07); border: 1px solid rgba(24,179,155,.28);
          border-radius: 18px; padding: 22px; text-align: center;
          color: var(--teal); font-weight: 600; font-size: 15px;
        }

        /* PROOF BAR */
        .proof-bar {
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 14px 0; background: #fafbfc;
        }
        .proof-bar .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 6px 28px; font-size: 13px; color: var(--muted);
        }
        .proof-bar strong { color: var(--ink); }
        .proof-bar .dot { color: #cbd5e1; }

        /* SECTION HEADERS */
        .section-label {
          text-align: center; font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 14px;
        }
        .section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.12; letter-spacing: -.02em;
          color: var(--ink); text-align: center; margin-bottom: 12px;
        }
        .section-sub {
          text-align: center; font-size: 16px; line-height: 1.75;
          color: var(--muted); max-width: 560px; margin: 0 auto 48px;
        }

        /* WORKFLOW */
        .workflow-section { padding: 80px 0 0; }
        .workflow-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
          border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
        }
        @media (max-width: 680px) { .workflow-grid { grid-template-columns: 1fr; } }

        .workflow-step {
          background: #fff; padding: 28px 24px;
          border-right: 1px solid var(--border); position: relative;
        }
        .workflow-step:last-child { border-right: none; }

        .step-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
          border-radius: 99px; padding: 4px 12px; margin-bottom: 16px;
        }
        .step-badge.requester { background: rgba(12,45,91,.07);  color: var(--navy); }
        .step-badge.approver  { background: rgba(24,179,155,.08); color: #0d7a6a; }
        .step-badge.buyer     { background: rgba(139,197,63,.1);  color: #4d7c0f; }

        .workflow-step h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .workflow-step p  { font-size: 14px; line-height: 1.7; color: var(--muted); }

        .step-arrow {
          position: absolute; right: -13px; top: 50%; transform: translateY(-50%);
          width: 24px; height: 24px; background: #fff; border: 1px solid var(--border);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--muted); z-index: 2;
        }
        @media (max-width: 680px) { .step-arrow { display: none; } }

        /* MOCKUP */
        .mockup-section { padding: 72px 0 0; }
        .mockup {
          border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 40px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
          max-width: 860px; margin: 0 auto;
        }
        .mockup-header {
          background: #f8fafc; border-bottom: 1px solid var(--border); padding: 13px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mockup-header .title { font-size: 13px; font-weight: 600; color: var(--ink); }
        .mockup-header .budget-tag {
          font-size: 11px; font-weight: 600;
          background: rgba(12,45,91,.06); color: var(--navy);
          border-radius: 99px; padding: 4px 12px;
        }
        .mockup-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px; border-bottom: 1px solid var(--border); transition: background .15s;
        }
        .mockup-row:last-child { border-bottom: none; }
        .mockup-row:hover { background: #fafbfc; }
        .mockup-row .name { font-size: 14px; font-weight: 600; color: var(--ink); }
        .mockup-row .meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .mockup-row .right { display: flex; align-items: center; gap: 12px; }
        .mockup-row .amount { font-size: 14px; font-weight: 700; color: var(--ink); }
        .badge { font-size: 11px; font-weight: 700; border-radius: 99px; padding: 3px 10px; white-space: nowrap; }
        .badge-amber { background: #fff7ed; color: #b45309; }
        .badge-green { background: #f0fdf4; color: #16a34a; }
        .badge-sky   { background: #f0f9ff; color: #0369a1; }
        .badge-red   { background: #fef2f2; color: #dc2626; }

        /* PROBLEM */
        .problem-section { padding: 80px 0; }
        .problem-section h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.15; letter-spacing: -.02em; color: var(--ink); margin-bottom: 28px;
        }
        .problem-section p { font-size: 17px; line-height: 1.8; color: var(--muted); margin-bottom: 16px; }
        .problem-section p strong { color: var(--ink); }
        .highlight-box {
          margin-top: 28px; padding: 20px 24px;
          background: linear-gradient(135deg, rgba(12,45,91,.04), rgba(24,179,155,.06));
          border: 1px solid rgba(24,179,155,.2); border-radius: 14px;
          font-size: 16px; font-weight: 600; color: var(--navy); line-height: 1.65;
        }

        /* DIFFERENTIATION */
        .diff-section { padding: 0 0 80px; }
        .diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
        @media (max-width: 680px) { .diff-grid { grid-template-columns: 1fr; } }
        .diff-card {
          border: 1.5px solid var(--border); border-radius: 18px; padding: 24px;
          transition: border-color .2s, box-shadow .2s;
        }
        .diff-card:hover { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(24,179,155,.07); }
        .diff-card .vs-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
        .diff-card h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .diff-card p  { font-size: 14px; line-height: 1.7; color: var(--muted); }
        .diff-card .tag {
          display: inline-block; margin-top: 14px; font-size: 11px; font-weight: 700;
          background: rgba(24,179,155,.08); color: #0d7a6a; border-radius: 99px; padding: 4px 12px;
        }

        /* VERTICALS */
        .verticals-section {
          background: #fafbfc; padding: 72px 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .vertical-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 40px; }
        @media (max-width: 600px) { .vertical-grid { grid-template-columns: 1fr 1fr; } }
        .vertical-card {
          background: #fff; border: 1.5px solid var(--border); border-radius: 14px; padding: 16px 18px;
          transition: border-color .2s, box-shadow .2s;
        }
        .vertical-card:hover { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(24,179,155,.06); }
        .vertical-card .icon  { font-size: 20px; margin-bottom: 8px; }
        .vertical-card .label { font-size: 14px; font-weight: 600; color: var(--ink); }
        .vertical-card .desc  { font-size: 12px; color: var(--muted); margin-top: 3px; line-height: 1.55; }

        /* HOW IT WORKS */
        .how-section { background: var(--navy); padding: 72px 0; }
        .how-section .section-title { color: #fff; }
        .how-section .section-sub   { color: rgba(255,255,255,.5); }
        .how-section .section-label { color: rgba(255,255,255,.35); }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 640px) { .steps { grid-template-columns: 1fr; } }
        .step {
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px; padding: 26px;
        }
        .step-num { font-family: 'DM Serif Display', serif; font-size: 44px; line-height: 1; color: var(--teal); margin-bottom: 14px; }
        .step h3  { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: #fff; }
        .step p   { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,.55); }

        /* FAQ */
        .faq-section { padding: 80px 0; }
        .faq-list { margin-top: 40px; display: flex; flex-direction: column; gap: 8px; }
        .faq-item { border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color .2s; }
        .faq-item.open { border-color: rgba(24,179,155,.35); }
        .faq-q {
          width: 100%; text-align: left;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 18px 20px; font-size: 15px; font-weight: 600; color: var(--ink);
          background: none; border: none; cursor: pointer; transition: background .15s;
        }
        .faq-q:hover { background: #fafbfc; }
        .faq-chevron {
          flex-shrink: 0; width: 22px; height: 22px;
          border: 1.5px solid var(--border); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--muted);
          transition: transform .2s, background .2s, border-color .2s;
        }
        .faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--teal); border-color: var(--teal); color: #fff; }
        .faq-a { padding: 0 20px 18px; font-size: 15px; line-height: 1.8; color: var(--muted); }

        /* FOOTER CTA */
        .footer-cta { padding: 80px 0; text-align: center; border-top: 1px solid var(--border); }
        .footer-cta h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 46px);
          letter-spacing: -.02em; color: var(--ink); margin-bottom: 14px;
        }
        .footer-cta p { font-size: 17px; color: var(--muted); margin-bottom: 34px; }

        .urgency-row {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap; margin-top: 20px; font-size: 13px; color: var(--muted);
        }
        .urgency-pill {
          display: flex; align-items: center; gap: 6px;
          background: #f8fafc; border: 1px solid var(--border); border-radius: 99px; padding: 6px 14px;
        }
        .dot-teal { width: 6px; height: 6px; background: var(--teal); border-radius: 50%; display: inline-block; }

        /* FOOTER */
        .site-footer {
          border-top: 1px solid var(--border); padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
          max-width: 1120px; margin: 0 auto; font-size: 13px; color: var(--muted);
        }
        .site-footer a { color: var(--muted); text-decoration: none; }
        .site-footer a:hover { color: var(--ink); }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="inner">
          <img src="/spendgate-logo.png" alt="SpendGate" />
          <a href="#early-access" className="cta">Request early access</a>
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
          {!submitted ? (
            <form className="capture-form a5" onSubmit={handleSubmit} id="early-access">
              <div className="row">
                <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <button type="submit">Request early access →</button>
              <p className="form-note">No commitment. We will reach out within 48 hours.</p>
            </form>
          ) : (
            <div className="success-box a5">You are on the list — we will be in touch within 48 hours.</div>
          )}
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="proof-bar">
        <div className="inner">
          <span>Early conversations open with <strong>multi-site businesses</strong></span>
          <span className="dot">·</span>
          <span>Built with operators managing <strong>3 to 80 sites</strong></span>
          <span className="dot">·</span>
          <span><strong>"We run this over WhatsApp. It is a nightmare."</strong> — Group Finance Director</span>
        </div>
      </div>

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
              <p>Managers see the full picture — budget impact, preferred supplier check, price against last comparable spend — and approve or reject before anything is ordered. Rules route by amount, category, or site.</p>
              <div className="step-arrow">→</div>
            </div>
            <div className="workflow-step">
              <div className="step-badge buyer">Buyer</div>
              <h3>Execute from a clean queue</h3>
              <p>Approved requests land in a Buyer Queue. The person placing the order works from a single list of what has been signed off. Finance sees the full journey — request, approval, order placed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUP */}
      <section className="mockup-section">
        <div className="wrap">
          <div className="section-label" style={{marginBottom: 28}}>Live purchase request queue</div>
          <div className="mockup">
            <div className="mockup-header">
              <span className="title">Purchase Requests — All Sites</span>
              <span className="budget-tag">Monthly budget: £28,000 remaining</span>
            </div>
            {[
              { name: "HVAC emergency repair",            meta: "Site A · J. Walsh · 2h ago · Maintenance",     amount: "£2,400", badge: "Awaiting approval", cls: "badge-amber" },
              { name: "Kitchen equipment replacement",    meta: "Site B · D. Osei · 5h ago · Kitchen",           amount: "£1,850", badge: "Approved",          cls: "badge-green" },
              { name: "Cleaning supplies — monthly",      meta: "Site C · L. Chen · Yesterday · Cleaning",       amount: "£340",   badge: "Approved",          cls: "badge-green" },
              { name: "Emergency plumbing — staff block", meta: "Site D · M. Patel · Yesterday · Maintenance",   amount: "£680",   badge: "Pending review",    cls: "badge-sky"   },
              { name: "Treadmill servicing",              meta: "Site E · S. Brooke · 2 days ago · Equipment",   amount: "£910",   badge: "Rejected",          cls: "badge-red"   },
            ].map(row => (
              <div className="mockup-row" key={row.name}>
                <div>
                  <div className="name">{row.name}</div>
                  <div className="meta">{row.meta}</div>
                </div>
                <div className="right">
                  <div className="amount">{row.amount}</div>
                  <span className={`badge ${row.cls}`}>{row.badge}</span>
                </div>
              </div>
            ))}
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
          <div className="section-label" style={{textAlign: "left"}}>How SpendGate is different</div>
          <h2 className="section-title" style={{textAlign: "left", maxWidth: 640}}>There are other tools. Here is why we built this one.</h2>
          <div className="diff-grid">
            <div className="diff-card">
              <div className="vs-label">vs. ApprovalMax</div>
              <h3>Before the invoice, not after it</h3>
              <p>ApprovalMax approves bills and invoices that already exist in your accounting system. By then, the purchase decision was already made. SpendGate sits earlier — it captures the request at the moment someone decides to buy something, before any money moves.</p>
              <span className="tag">Pre-purchase control</span>
            </div>
            <div className="diff-card">
              <div className="vs-label">vs. ProcurementExpress and similar</div>
              <h3>Built for operational purchasing, not formal POs</h3>
              <p>Most purchase order tools are designed around formal PO management for procurement teams. SpendGate is built for the informal, ad-hoc operational spend that happens every day across your sites — the emergency repair, the weekend stock top-up, the maintenance call-out — managed by site managers, not buyers.</p>
              <span className="tag">Operational, not strategic</span>
            </div>
            <div className="diff-card">
              <div className="vs-label">vs. Email and WhatsApp</div>
              <h3>Structure where there was none</h3>
              <p>Chat tools have no budget check, no audit trail, no supplier enforcement. Finance only discovers what was spent when the invoice lands. SpendGate captures the request before any money moves and routes it to the right approver automatically.</p>
              <span className="tag">Replaces informal approval</span>
            </div>
            <div className="diff-card">
              <div className="vs-label">What makes it work at scale</div>
              <h3>The Buyer Queue: a step most tools skip</h3>
              <p>Most approval tools treat approval as the end of the workflow. SpendGate adds a Buyer Queue — a dedicated execution step where the person placing the order works from a clean list of what has been signed off. Finance sees the full journey, not just the decision.</p>
              <span className="tag">Request to order, not just approval</span>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section className="verticals-section">
        <div className="wrap">
          <div className="section-label">Who it is built for</div>
          <h2 className="section-title">Any multi-site business with operational purchasing</h2>
          <div className="vertical-grid">
            {[
              { icon: "🍽️", label: "Restaurant chains",      desc: "Consumable and equipment spend controlled across every site" },
              { icon: "🏨", label: "Hospitality groups",     desc: "Maintenance and ops costs approved before they hit your P&L" },
              { icon: "⛳", label: "Golf and leisure",        desc: "Course, clubhouse, and facility spend, routed before ordered" },
              { icon: "💪", label: "Gym and fitness",         desc: "Equipment servicing and supply requests, tracked centrally" },
              { icon: "🏢", label: "Facilities businesses",  desc: "Structured purchasing across complex property portfolios" },
              { icon: "🛍️", label: "Retail and more",         desc: "Any business where site managers buy things every day" },
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

      {/* HOW IT WORKS — DETAIL */}
      <section className="how-section">
        <div className="wrap">
          <div className="section-label">The detail</div>
          <h2 className="section-title">Built for the messy reality of operational purchasing</h2>
          <p className="section-sub">SpendGate handles the edge cases your current process ignores.</p>
          <div className="steps">
            {[
              { n: "1", title: "Budget impact before approval",   body: "Every request shows site and category budget remaining, what approval would leave, and whether it tips into an exception. Approvers see this before they decide." },
              { n: "2", title: "Preferred supplier enforcement",  body: "Flag when a request uses a supplier outside your preferred list. Benchmark the price against recent comparable spend. The context is there before the approver clicks." },
              { n: "3", title: "Configurable approval routing",   body: "Single approver for standard spend. Automatic escalation above a threshold. Additional finance sign-off for specific categories. Rules are yours to define and adjust." },
              { n: "4", title: "Buyer queue for execution",       body: "Approved requests move to a dedicated buyer view. The person placing the order works from a clean, structured list of what has been signed off — nothing slips through." },
              { n: "5", title: "Control Tower for exceptions",    body: "One view of every request with a policy signal, budget pressure, ageing approval, or off-preferred supplier. Exceptions surface automatically, not when someone notices." },
              { n: "6", title: "Finance visibility end to end",   body: "From request submitted to order placed, finance sees the full journey in real time. No more discovering spend when the invoice arrives. The paper trail is built in." },
            ].map(s => (
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
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={i}>
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
          <h2>Join the early access list</h2>
          <p>We are speaking with operators, finance leaders, and design partners right now.</p>
          {!submitted ? (
            <form className="capture-form" style={{margin: "0 auto"}} onSubmit={handleSubmit}>
              <div className="row">
                <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <button type="submit">Get early access →</button>
              <p className="form-note">No commitment · We will reach out within 48 hours</p>
            </form>
          ) : (
            <div className="success-box" style={{maxWidth: 500, margin: "0 auto"}}>You are on the list — we will be in touch within 48 hours.</div>
          )}
          <div className="urgency-row">
            <div className="urgency-pill"><span className="dot-teal"></span>Early conversations open now</div>
            <div className="urgency-pill">Targeting Q3 2026 beta</div>
            <div className="urgency-pill"><a href="mailto:hello@spendgate.io" style={{color: "inherit"}}>hello@spendgate.io</a></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="site-footer">
        <img src="/spendgate-logo.png" alt="SpendGate" style={{height: 22}} />
        <span>© {new Date().getFullYear()} SpendGate · Lightweight spend control for multi-site businesses</span>
        <a href="mailto:hello@spendgate.io">hello@spendgate.io</a>
      </div>
    </>
  );
}
"use client";

import { useState, FormEvent } from "react";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  const faqs = [
    {
      q: "How is this different from managing spend over email or WhatsApp?",
      a: "Email and WhatsApp have no structure — no budget check, no audit trail, no supplier enforcement. By the time finance sees the invoice, the decision was made days ago over a chat message. SpendGate captures the request before any money moves, routes it to the right approver automatically, and only hands it to the buyer once approved. Finance sees the full picture in real time, not at month end."
    },
    {
      q: "How is it different from procurement software like Coupa or SAP Ariba?",
      a: "Those platforms are built for strategic, high-value procurement managed by a dedicated procurement team. SpendGate is built for operational purchasing — the £150 maintenance repair, the weekend bar stock top-up, the emergency plumbing call-out. Site managers submit a request in under 30 seconds. There is no implementation project, no consultant, and no six-figure licence fee. It is lightweight by design."
    },
    {
      q: "Does it just approve requests, or does it handle the actual ordering too?",
      a: "Both. Once a request is approved it moves into a Buyer Queue — a dedicated execution view for the person responsible for placing the order. Finance sees the full workflow from request submitted through to order placed. There are no more surprise invoices because the spend is visible and controlled at every stage, not just when the invoice arrives."
    },
    {
      q: "Can we set different approval rules for different spend levels or categories?",
      a: "Yes. You configure approval routing by venue, category, and amount threshold. Under £500 might need one manager sign-off. Over £500 escalates to a regional approver. Kitchen spend over £400 can require an additional finance step. Once the rules are set, routing is automatic — no manual intervention needed."
    },
    {
      q: "What about preferred suppliers and price checks?",
      a: "SpendGate flags when a request uses a supplier outside your preferred list for that category, and benchmarks the price against recent comparable spend. Approvers see a clear signal — preferred route, price within normal range, or a reason to question — before they approve. It is the kind of context that currently lives in someone's head, or nowhere at all."
    },
    {
      q: "We only have 3 sites right now. Is this too early for us?",
      a: "Probably not. The chaos of unstructured operational purchasing tends to start at 2 or 3 sites and compounds quickly from there. Early design partners are typically operators managing between 3 and 20 sites who want to build the right habits before scale makes the problem much harder to fix."
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #0c2d5b;
          --teal:   #18b39b;
          --green:  #8bc53f;
          --ink:    #0f172a;
          --muted:  #64748b;
          --border: #e2e8f0;
          --bg:     #ffffff;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp .55s ease both; }
        .a2 { animation: fadeUp .55s .1s ease both; }
        .a3 { animation: fadeUp .55s .2s ease both; }
        .a4 { animation: fadeUp .55s .3s ease both; }
        .a5 { animation: fadeUp .55s .4s ease both; }

        @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:.35; } }

        .wrap    { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .wrap-sm { max-width: 760px;  margin: 0 auto; padding: 0 24px; }

        /* NAV */
        nav {
          padding: 18px 0;
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(10px);
        }
        nav .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        nav img { height: 32px; width: auto; }
        nav a.cta {
          font-size: 13px; font-weight: 600; color: #fff;
          background: var(--navy); text-decoration: none;
          border-radius: 99px; padding: 9px 22px;
          transition: background .18s, transform .15s; white-space: nowrap;
        }
        nav a.cta:hover { background: #0a254b; transform: translateY(-1px); }

        /* HERO */
        .hero {
          padding: 60px 0 56px; text-align: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 55% at 50% -5%, rgba(24,179,155,.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-logo { display: flex; justify-content: center; margin-bottom: 36px; }
        .hero-logo img { width: clamp(180px, 30vw, 340px); height: auto; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase;
          color: var(--teal); background: rgba(24,179,155,.07);
          border: 1px solid rgba(24,179,155,.22);
          border-radius: 99px; padding: 5px 14px; margin-bottom: 28px;
        }
        .eyebrow span { width: 6px; height: 6px; background: var(--teal); border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }

        .hero h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(38px, 5.5vw, 70px);
          line-height: 1.03; letter-spacing: -.025em;
          color: var(--ink); max-width: 860px; margin: 0 auto;
        }
        .hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 55%, var(--green) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .hero-sub {
          margin: 22px auto 0; max-width: 580px;
          font-size: 17px; line-height: 1.75; color: var(--muted);
        }

        /* FORM */
        .capture-form {
          margin: 34px auto 0; max-width: 500px;
          background: #f8fafc; border: 1px solid var(--border);
          border-radius: 18px; padding: 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .capture-form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 500px) { .capture-form .row { grid-template-columns: 1fr; } }
        .capture-form input {
          width: 100%; font-family: 'DM Sans', sans-serif;
          font-size: 14px; padding: 11px 15px;
          border: 1.5px solid var(--border); border-radius: 10px;
          background: #fff; color: var(--ink); outline: none; transition: border-color .18s;
        }
        .capture-form input::placeholder { color: #94a3b8; }
        .capture-form input:focus { border-color: var(--teal); }
        .capture-form button {
          width: 100%; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; padding: 13px;
          border: none; border-radius: 10px; cursor: pointer;
          background: var(--navy); color: #fff; transition: background .18s, transform .15s;
        }
        .capture-form button:hover { background: #0a254b; transform: translateY(-1px); }
        .form-note { text-align: center; font-size: 12px; color: #94a3b8; }

        .success-box {
          margin: 34px auto 0; max-width: 500px;
          background: rgba(24,179,155,.07); border: 1px solid rgba(24,179,155,.28);
          border-radius: 18px; padding: 22px; text-align: center;
          color: var(--teal); font-weight: 600; font-size: 15px;
        }

        /* PROOF BAR */
        .proof-bar {
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 14px 0; background: #fafbfc;
        }
        .proof-bar .inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 6px 28px; font-size: 13px; color: var(--muted);
        }
        .proof-bar strong { color: var(--ink); }
        .proof-bar .dot { color: #cbd5e1; }

        /* SECTION HEADERS */
        .section-label {
          text-align: center; font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 14px;
        }
        .section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.12; letter-spacing: -.02em;
          color: var(--ink); text-align: center; margin-bottom: 12px;
        }
        .section-sub {
          text-align: center; font-size: 16px; line-height: 1.75;
          color: var(--muted); max-width: 560px; margin: 0 auto 48px;
        }

        /* WORKFLOW */
        .workflow-section { padding: 80px 0 0; }
        .workflow-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
          border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
        }
        @media (max-width: 680px) { .workflow-grid { grid-template-columns: 1fr; } }

        .workflow-step {
          background: #fff; padding: 28px 24px;
          border-right: 1px solid var(--border); position: relative;
        }
        .workflow-step:last-child { border-right: none; }

        .step-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
          border-radius: 99px; padding: 4px 12px; margin-bottom: 16px;
        }
        .step-badge.requester { background: rgba(12,45,91,.07);  color: var(--navy); }
        .step-badge.approver  { background: rgba(24,179,155,.08); color: #0d7a6a; }
        .step-badge.buyer     { background: rgba(139,197,63,.1);  color: #4d7c0f; }

        .workflow-step h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .workflow-step p  { font-size: 14px; line-height: 1.7; color: var(--muted); }

        .step-arrow {
          position: absolute; right: -13px; top: 50%; transform: translateY(-50%);
          width: 24px; height: 24px; background: #fff; border: 1px solid var(--border);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--muted); z-index: 2;
        }
        @media (max-width: 680px) { .step-arrow { display: none; } }

        /* MOCKUP */
        .mockup-section { padding: 72px 0 0; }
        .mockup {
          border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 40px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
          max-width: 860px; margin: 0 auto;
        }
        .mockup-header {
          background: #f8fafc; border-bottom: 1px solid var(--border); padding: 13px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mockup-header .title { font-size: 13px; font-weight: 600; color: var(--ink); }
        .mockup-header .budget-tag {
          font-size: 11px; font-weight: 600;
          background: rgba(12,45,91,.06); color: var(--navy);
          border-radius: 99px; padding: 4px 12px;
        }
        .mockup-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px; border-bottom: 1px solid var(--border); transition: background .15s;
        }
        .mockup-row:last-child { border-bottom: none; }
        .mockup-row:hover { background: #fafbfc; }
        .mockup-row .name { font-size: 14px; font-weight: 600; color: var(--ink); }
        .mockup-row .meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .mockup-row .right { display: flex; align-items: center; gap: 12px; }
        .mockup-row .amount { font-size: 14px; font-weight: 700; color: var(--ink); }
        .badge { font-size: 11px; font-weight: 700; border-radius: 99px; padding: 3px 10px; white-space: nowrap; }
        .badge-amber { background: #fff7ed; color: #b45309; }
        .badge-green { background: #f0fdf4; color: #16a34a; }
        .badge-sky   { background: #f0f9ff; color: #0369a1; }
        .badge-red   { background: #fef2f2; color: #dc2626; }

        /* PROBLEM */
        .problem-section { padding: 80px 0; }
        .problem-section h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.15; letter-spacing: -.02em; color: var(--ink); margin-bottom: 28px;
        }
        .problem-section p { font-size: 17px; line-height: 1.8; color: var(--muted); margin-bottom: 16px; }
        .problem-section p strong { color: var(--ink); }
        .highlight-box {
          margin-top: 28px; padding: 20px 24px;
          background: linear-gradient(135deg, rgba(12,45,91,.04), rgba(24,179,155,.06));
          border: 1px solid rgba(24,179,155,.2); border-radius: 14px;
          font-size: 16px; font-weight: 600; color: var(--navy); line-height: 1.65;
        }

        /* DIFFERENTIATION */
        .diff-section { padding: 0 0 80px; }
        .diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
        @media (max-width: 680px) { .diff-grid { grid-template-columns: 1fr; } }
        .diff-card {
          border: 1.5px solid var(--border); border-radius: 18px; padding: 24px;
          transition: border-color .2s, box-shadow .2s;
        }
        .diff-card:hover { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(24,179,155,.07); }
        .diff-card .vs-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
        .diff-card h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .diff-card p  { font-size: 14px; line-height: 1.7; color: var(--muted); }
        .diff-card .tag {
          display: inline-block; margin-top: 14px; font-size: 11px; font-weight: 700;
          background: rgba(24,179,155,.08); color: #0d7a6a; border-radius: 99px; padding: 4px 12px;
        }

        /* VERTICALS */
        .verticals-section {
          background: #fafbfc; padding: 72px 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .vertical-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 40px; }
        @media (max-width: 600px) { .vertical-grid { grid-template-columns: 1fr 1fr; } }
        .vertical-card {
          background: #fff; border: 1.5px solid var(--border); border-radius: 14px; padding: 16px 18px;
          transition: border-color .2s, box-shadow .2s;
        }
        .vertical-card:hover { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(24,179,155,.06); }
        .vertical-card .icon  { font-size: 20px; margin-bottom: 8px; }
        .vertical-card .label { font-size: 14px; font-weight: 600; color: var(--ink); }
        .vertical-card .desc  { font-size: 12px; color: var(--muted); margin-top: 3px; line-height: 1.55; }

        /* HOW IT WORKS */
        .how-section { background: var(--navy); padding: 72px 0; }
        .how-section .section-title { color: #fff; }
        .how-section .section-sub   { color: rgba(255,255,255,.5); }
        .how-section .section-label { color: rgba(255,255,255,.35); }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 640px) { .steps { grid-template-columns: 1fr; } }
        .step {
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px; padding: 26px;
        }
        .step-num { font-family: 'DM Serif Display', serif; font-size: 44px; line-height: 1; color: var(--teal); margin-bottom: 14px; }
        .step h3  { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: #fff; }
        .step p   { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,.55); }

        /* FAQ */
        .faq-section { padding: 80px 0; }
        .faq-list { margin-top: 40px; display: flex; flex-direction: column; gap: 8px; }
        .faq-item { border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color .2s; }
        .faq-item.open { border-color: rgba(24,179,155,.35); }
        .faq-q {
          width: 100%; text-align: left;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 18px 20px; font-size: 15px; font-weight: 600; color: var(--ink);
          background: none; border: none; cursor: pointer; transition: background .15s;
        }
        .faq-q:hover { background: #fafbfc; }
        .faq-chevron {
          flex-shrink: 0; width: 22px; height: 22px;
          border: 1.5px solid var(--border); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--muted);
          transition: transform .2s, background .2s, border-color .2s;
        }
        .faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--teal); border-color: var(--teal); color: #fff; }
        .faq-a { padding: 0 20px 18px; font-size: 15px; line-height: 1.8; color: var(--muted); }

        /* FOOTER CTA */
        .footer-cta { padding: 80px 0; text-align: center; border-top: 1px solid var(--border); }
        .footer-cta h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 46px);
          letter-spacing: -.02em; color: var(--ink); margin-bottom: 14px;
        }
        .footer-cta p { font-size: 17px; color: var(--muted); margin-bottom: 34px; }

        .urgency-row {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap; margin-top: 20px; font-size: 13px; color: var(--muted);
        }
        .urgency-pill {
          display: flex; align-items: center; gap: 6px;
          background: #f8fafc; border: 1px solid var(--border); border-radius: 99px; padding: 6px 14px;
        }
        .dot-teal { width: 6px; height: 6px; background: var(--teal); border-radius: 50%; display: inline-block; }

        /* FOOTER */
        .site-footer {
          border-top: 1px solid var(--border); padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
          max-width: 1120px; margin: 0 auto; font-size: 13px; color: var(--muted);
        }
        .site-footer a { color: var(--muted); text-decoration: none; }
        .site-footer a:hover { color: var(--ink); }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="inner">
          <img src="/spendgate-logo.png" alt="SpendGate" />
          <a href="#early-access" className="cta">Request early access</a>
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
            SpendGate is lightweight spend control for multi-site operators.
            Structured purchase requests, approval routing, and a buyer queue —
            so finance sees every penny before the invoice arrives.
          </p>
          {!submitted ? (
            <form className="capture-form a5" onSubmit={handleSubmit} id="early-access">
              <div className="row">
                <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <button type="submit">Request early access →</button>
              <p className="form-note">No commitment. We will reach out within 48 hours.</p>
            </form>
          ) : (
            <div className="success-box a5">You are on the list — we will be in touch within 48 hours.</div>
          )}
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="proof-bar">
        <div className="inner">
          <span>Currently in conversations with <strong>golf groups, hospitality operators, and facilities businesses</strong></span>
          <span className="dot">·</span>
          <span>Built with teams managing <strong>3 to 80 sites</strong></span>
          <span className="dot">·</span>
          <span><strong>"We run this over WhatsApp. It is a nightmare."</strong> — Group Finance Director</span>
        </div>
      </div>

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
              <p>Managers see the full picture — budget impact, preferred supplier check, price against last comparable spend — and approve or reject before anything is ordered. Rules route by amount, category, or venue.</p>
              <div className="step-arrow">→</div>
            </div>
            <div className="workflow-step">
              <div className="step-badge buyer">Buyer</div>
              <h3>Execute from a clean queue</h3>
              <p>Approved requests land in a Buyer Queue. The person placing the order works from a single list of what has been signed off. Finance sees the full journey — request, approval, order placed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUP */}
      <section className="mockup-section">
        <div className="wrap">
          <div className="section-label" style={{marginBottom: 28}}>Live purchase request queue</div>
          <div className="mockup">
            <div className="mockup-header">
              <span className="title">Purchase Requests — All Sites</span>
              <span className="budget-tag">Monthly budget: £28,000 remaining</span>
            </div>
            {[
              { name: "HVAC emergency repair",            meta: "The Belfry · J. Walsh · 2h ago · Maintenance",       amount: "£2,400", badge: "Awaiting approval", cls: "badge-amber" },
              { name: "Kitchen equipment replacement",    meta: "London Central · D. Osei · 5h ago · Kitchen",         amount: "£1,850", badge: "Approved",          cls: "badge-green" },
              { name: "Cleaning supplies — monthly",      meta: "Manchester · L. Chen · Yesterday · Cleaning",         amount: "£340",   badge: "Approved",          cls: "badge-green" },
              { name: "Emergency plumbing — staff block", meta: "Birmingham NEC · M. Patel · Yesterday · Maintenance", amount: "£680",   badge: "Pending review",    cls: "badge-sky"   },
              { name: "Treadmill servicing",              meta: "Leeds Central · S. Brooke · 2 days ago · Gym",        amount: "£910",   badge: "Rejected",          cls: "badge-red"   },
            ].map(row => (
              <div className="mockup-row" key={row.name}>
                <div>
                  <div className="name">{row.name}</div>
                  <div className="meta">{row.meta}</div>
                </div>
                <div className="right">
                  <div className="amount">{row.amount}</div>
                  <span className={`badge ${row.cls}`}>{row.badge}</span>
                </div>
              </div>
            ))}
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
          <div className="section-label" style={{textAlign: "left"}}>How SpendGate is different</div>
          <h2 className="section-title" style={{textAlign: "left", maxWidth: 600}}>Not WhatsApp. Not Coupa. Something built for this.</h2>
          <div className="diff-grid">
            {[
              { vs: "vs. Email and WhatsApp", title: "Structure where there was none", body: "Chat tools have no budget check, no audit trail, no supplier enforcement. Finance only discovers what was spent when the invoice lands. SpendGate captures the request before any money moves and routes it to the right approver automatically.", tag: "Replaces informal approval" },
              { vs: "vs. Coupa, SAP Ariba, and similar", title: "Lightweight by design", body: "Enterprise procurement tools are built for strategic buying managed by a dedicated team. SpendGate is built for the £150 maintenance repair and the weekend bar stock top-up. Site managers submit in 30 seconds. No implementation project. No consultant.", tag: "Operational purchasing only" },
              { vs: "vs. Spreadsheets and forms", title: "A workflow, not a log", body: "Spreadsheets record what happened. SpendGate controls what happens. Approval routing, budget impact signals, preferred supplier checks, and a buyer execution queue are all built in — not bolted on manually.", tag: "Active control, not passive record" },
              { vs: "What makes it work at scale", title: "Three roles. Configurable rules.", body: "Requester, Approver, and Buyer each have a distinct view. Approval routing adapts by amount, category, and venue. Under £500 needs one sign-off. Over £500 escalates automatically. Kitchen spend above £400 can require finance approval. The logic is yours to configure.", tag: "Multi-role, multi-rule" },
            ].map(d => (
              <div className="diff-card" key={d.title}>
                <div className="vs-label">{d.vs}</div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
                <span className="tag">{d.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section className="verticals-section">
        <div className="wrap">
          <div className="section-label">Who it is built for</div>
          <h2 className="section-title">Operators running distributed estates</h2>
          <div className="vertical-grid">
            {[
              { icon: "🍽️", label: "Restaurant chains",      desc: "Consumable and equipment spend controlled across every site" },
              { icon: "🏨", label: "Hospitality groups",     desc: "Maintenance and ops costs approved before they hit your P&L" },
              { icon: "⛳", label: "Golf operators",          desc: "Course and clubhouse spend, routed before it is ordered" },
              { icon: "💪", label: "Gym and fitness groups",  desc: "Equipment servicing and supply requests, tracked centrally" },
              { icon: "🏢", label: "Facilities businesses",  desc: "Structured purchasing across complex property portfolios" },
              { icon: "🛍️", label: "Retail groups",           desc: "Store-level spend under control, without the spreadsheets" },
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

      {/* HOW IT WORKS — DETAIL */}
      <section className="how-section">
        <div className="wrap">
          <div className="section-label">The detail</div>
          <h2 className="section-title">Built for the messy reality of operational purchasing</h2>
          <p className="section-sub">SpendGate handles the edge cases your current process ignores.</p>
          <div className="steps">
            {[
              { n: "1", title: "Budget impact before approval",   body: "Every request shows venue and category budget remaining, what approval would leave, and whether it tips into an exception. Approvers see this before they decide." },
              { n: "2", title: "Preferred supplier enforcement",  body: "Flag when a request uses a supplier outside your preferred list. Benchmark the price against recent comparable spend. The context is there before the approver clicks." },
              { n: "3", title: "Configurable approval routing",   body: "Single approver for standard spend. Automatic escalation above a threshold. Additional finance sign-off for specific categories. Rules are yours to define and adjust." },
              { n: "4", title: "Buyer queue for execution",       body: "Approved requests move to a dedicated buyer view. The person placing the order works from a clean, structured list of what has been signed off — nothing slips through." },
              { n: "5", title: "Control Tower for exceptions",    body: "One view of every request with a policy signal, budget pressure, ageing approval, or off-preferred supplier. Exceptions surface automatically, not when someone notices." },
              { n: "6", title: "Finance visibility end to end",   body: "From request submitted to order placed, finance sees the full journey in real time. No more discovering spend when the invoice arrives. The paper trail is built in." },
            ].map(s => (
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
          <h2 className="section-title">Things operators usually ask</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={i}>
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
          <h2>Join the early access list</h2>
          <p>We are speaking with operators, finance leaders, and design partners right now.</p>
          {!submitted ? (
            <form className="capture-form" style={{margin: "0 auto"}} onSubmit={handleSubmit}>
              <div className="row">
                <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <button type="submit">Get early access →</button>
              <p className="form-note">No commitment · We will reach out within 48 hours</p>
            </form>
          ) : (
            <div className="success-box" style={{maxWidth: 500, margin: "0 auto"}}>You are on the list — we will be in touch within 48 hours.</div>
          )}
          <div className="urgency-row">
            <div className="urgency-pill"><span className="dot-teal"></span>Early conversations open now</div>
            <div className="urgency-pill">Targeting Q3 2026 beta</div>
            <div className="urgency-pill"><a href="mailto:hello@spendgate.io" style={{color: "inherit"}}>hello@spendgate.io</a></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="site-footer">
        <img src="/spendgate-logo.png" alt="SpendGate" style={{height: 22}} />
        <span>© {new Date().getFullYear()} SpendGate · Lightweight spend control for multi-site operators</span>
        <a href="mailto:hello@spendgate.io">hello@spendgate.io</a>
      </div>
    </>
  );
}
