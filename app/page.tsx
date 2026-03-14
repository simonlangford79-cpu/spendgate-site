export default function Page() {
  const sectors = [
    "Hospitality groups",
    "Golf operators",
    "Restaurant chains",
    "Gym chains",
    "Facilities businesses",
    "Retail groups",
  ];

  const problems = [
    {
      title: "Everyday spend sits outside formal procurement",
      body: "Site teams buy constantly: cleaning supplies, maintenance items, uniforms, small equipment, consumables, emergency replacements, and local vendor purchases.",
    },
    {
      title: "Approval logic is usually informal",
      body: "Requests move through calls, messages, screenshots, and hallway approvals. When invoices arrive, finance is left reconstructing what happened after the fact.",
    },
    {
      title: "Heavy suites are the wrong tool",
      body: "Traditional procurement platforms were built for strategic sourcing and central buying teams, not the high-frequency operational spend happening across many locations.",
    },
  ];

  const features = [
    {
      label: "Structured request capture",
      title: "Turn ad hoc operational buying into a controlled workflow",
      body: "SpendGate gives site teams a clean way to request spend with clear context, ownership, purpose, category, and amount from the beginning.",
      bullets: [
        "Site-level request intake",
        "Clear ownership and rationale",
        "Category tagging and documentation",
      ],
    },
    {
      label: "Approval orchestration",
      title: "Apply policy without adding friction to the business",
      body: "Route requests by amount, location, category, urgency, or manager role so the right people approve at the right moments without slowing operations down.",
      bullets: [
        "Threshold-based routing",
        "Multi-step approvals",
        "Role and site permissions",
      ],
    },
    {
      label: "Finance-ready records",
      title: "Create clean spend context before invoice chaos begins",
      body: "Approved operational spend carries forward with decision history and commercial context, giving finance a cleaner audit trail before reconciliation gets messy.",
      bullets: [
        "Approval history attached",
        "Cleaner month-end visibility",
        "Cross-site exception tracking",
      ],
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "A site submits a spend request",
      text: "The purchase starts in a structured operational flow rather than disappearing into email or chat.",
    },
    {
      step: "02",
      title: "SpendGate applies control logic",
      text: "Approval rules activate automatically based on amount, site, category, or policy thresholds.",
    },
    {
      step: "03",
      title: "Managers approve with context",
      text: "Approvers see who requested it, why it matters, what it costs, and where it sits operationally.",
    },
    {
      step: "04",
      title: "Finance gets a cleaner trail",
      text: "The result is clearer oversight, better records, and less confusion once invoices arrive downstream.",
    },
  ];

  const pricing = [
    {
      name: "Launch",
      subtitle: "For early multi-site rollout",
      description:
        "Best for growing operators introducing control across an initial estate, region, or workflow set.",
      features: [
        "Multi-site request workflows",
        "Core approval routing",
        "Site and role permissions",
        "Operational reporting",
        "Implementation support",
      ],
      featured: false,
    },
    {
      name: "Growth",
      subtitle: "For scaled operators",
      description:
        "For groups standardising operational spend control across a larger distributed business.",
      features: [
        "Everything in Launch",
        "Advanced policy logic",
        "Cross-site visibility",
        "Exception workflows",
        "Priority support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      subtitle: "For complex estates",
      description:
        "For operators with larger footprints, tighter governance requirements, and more complex rollout needs.",
      features: [
        "Everything in Growth",
        "Custom governance design",
        "Executive rollout support",
        "Strategic account partnership",
        "Enhanced implementation planning",
      ],
      featured: false,
    },
  ];

  const faqs = [
    {
      q: "Is SpendGate a full procurement suite?",
      a: "No. SpendGate is positioned as an operational spend control layer. It is designed for the everyday site-level spend that creates downstream invoice noise, approval ambiguity, and weak visibility across distributed businesses.",
    },
    {
      q: "Who is it best suited to?",
      a: "SpendGate is strongest for multi-site businesses such as hospitality groups, golf operators, restaurant chains, gym chains, facilities businesses, and retail groups where purchasing happens locally but control still matters centrally.",
    },
    {
      q: "What makes it different from email approvals or spreadsheets?",
      a: "Email and spreadsheets do not create a durable operating record. SpendGate standardises requests, approvals, ownership, rationale, and visibility in one system before finance has to clean things up later.",
    },
    {
      q: "Why not use heavyweight procurement software?",
      a: "Because the problem here is not strategic sourcing complexity. It is daily operational spend happening constantly across sites. SpendGate is designed to be lighter, faster to adopt, and more aligned to how operators actually work.",
    },
    {
      q: "Can it be rolled out gradually?",
      a: "Yes. Teams can start with a subset of locations, categories, or approval pathways and then expand once the control model is working.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f6f8f6_0%,#fbfcfb_22%,#ffffff_52%,#f8faf8_100%)]" />
        <div className="absolute inset-x-0 top-[-260px] -z-20 h-[700px] bg-[radial-gradient(circle_at_50%_50%,rgba(24,179,155,0.20),transparent_34%),radial-gradient(circle_at_20%_28%,rgba(139,197,63,0.16),transparent_22%),radial-gradient(circle_at_78%_22%,rgba(12,45,91,0.12),transparent_24%)]" />
        <div className="absolute left-[-120px] top-[220px] -z-10 h-[280px] w-[280px] rounded-full bg-[#18b39b]/15 blur-3xl" />
        <div className="absolute right-[-80px] top-[140px] -z-10 h-[340px] w-[340px] rounded-full bg-[#8bc53f]/15 blur-3xl" />

        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a href="#" className="flex items-center gap-4">
              <img
                src="/spendgate-logo.png"
                alt="SpendGate logo"
                className="h-10 w-auto sm:h-11"
              />
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="#why" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                Why SpendGate
              </a>
              <a href="#platform" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                Platform
              </a>
              <a href="#who" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                Who it&apos;s for
              </a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                Pricing
              </a>
              <a href="#faq" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#pricing"
                className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
              >
                Pricing
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-[#0c2d5b] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(12,45,91,0.20)] transition hover:-translate-y-0.5 hover:bg-[#0a254b]"
              >
                Book a demo
              </a>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-[#18b39b]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0c2d5b] shadow-sm">
                Lightweight alternative to heavyweight procurement software
              </div>

              <h1 className="mt-7 text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[#0c2d5b] sm:text-6xl lg:text-[5.7rem]">
                Control
                <br />
                operational spend
                <br />
                <span className="bg-[linear-gradient(135deg,#0c2d5b_0%,#18b39b_58%,#8bc53f_100%)] bg-clip-text text-transparent">
                  before it becomes
                </span>
                <br />
                invoice chaos
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                SpendGate gives multi-site operators a cleaner, lighter control layer for
                everyday purchasing, helping site teams move faster while finance gets
                stronger visibility, better approval discipline, and less downstream noise.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-full bg-[#0c2d5b] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(12,45,91,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0a254b]"
                >
                  Book a live walkthrough
                </a>
                <a
                  href="#platform"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Explore the platform
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "Multi-site", label: "Built for distributed operators" },
                  { value: "Lightweight", label: "Faster than enterprise rollouts" },
                  { value: "Pre-invoice", label: "Control before finance cleanup" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(12,45,91,0.05)] backdrop-blur"
                  >
                    <div className="text-lg font-semibold tracking-tight text-[#0c2d5b]">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 hidden h-24 w-24 rounded-[2rem] bg-white/85 shadow-[0_18px_38px_rgba(12,45,91,0.08)] ring-1 ring-white/80 backdrop-blur lg:block">
                <div className="flex h-full flex-col justify-center p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Sites
                  </div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight text-[#0c2d5b]">
                    Many
                  </div>
                </div>
              </div>

              <div className="absolute -right-5 bottom-10 hidden h-28 w-28 rounded-[2rem] bg-[#0c2d5b] p-4 text-white shadow-[0_24px_50px_rgba(12,45,91,0.20)] lg:block">
                <div className="text-xs uppercase tracking-[0.18em] text-white/70">Finance</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">Clean</div>
                <div className="mt-1 text-xs text-white/70">records first</div>
              </div>

              <div className="relative overflow-hidden rounded-[2.1rem] border border-white/70 bg-white/85 shadow-[0_40px_100px_rgba(12,45,91,0.12)] ring-1 ring-slate-200/60 backdrop-blur-xl">
                <div className="border-b border-slate-200/80 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/spendgate-logo.png"
                        alt="SpendGate logo"
                        className="h-8 w-auto"
                      />
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          SpendGate control layer
                        </div>
                        <div className="mt-1 text-xl font-semibold tracking-tight text-[#0c2d5b]">
                          Operational spend dashboard
                        </div>
                      </div>
                    </div>

                    <div className="rounded-full border border-[#18b39b]/20 bg-[#18b39b]/10 px-3 py-1 text-xs font-semibold text-[#138f7d]">
                      Live controls active
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr]">
                    <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbf9_100%)] p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Incoming operational spend
                          </div>
                          <div className="mt-2 text-lg font-semibold tracking-tight text-[#0c2d5b]">
                            Active request flow
                          </div>
                        </div>
                        <div className="rounded-full bg-[#18b39b]/10 px-3 py-1 text-xs font-semibold text-[#138f7d]">
                          184 open
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          {
                            site: "Bristol Riverside Hotel",
                            item: "Kitchen equipment replacement",
                            amount: "£1,240",
                            state: "Regional approval required",
                          },
                          {
                            site: "Westfield Golf Club",
                            item: "Grounds maintenance supplies",
                            amount: "£860",
                            state: "Approved",
                          },
                          {
                            site: "Manchester South Gym",
                            item: "Cleaning consumables top-up",
                            amount: "£420",
                            state: "Waiting on site manager",
                          },
                        ].map((row) => (
                          <div
                            key={`${row.site}-${row.item}`}
                            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_6px_18px_rgba(12,45,91,0.03)]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-slate-900">
                                  {row.item}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">{row.site}</div>
                              </div>
                              <div className="shrink-0 text-sm font-semibold text-[#0c2d5b]">
                                {row.amount}
                              </div>
                            </div>
                            <div className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                              {row.state}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[1.6rem] border border-[#0c2d5b] bg-[#0c2d5b] p-4 text-white shadow-[0_16px_40px_rgba(12,45,91,0.16)]">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                          Policy layer
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-tight">
                          Approval routing
                        </div>
                        <div className="mt-4 space-y-2.5">
                          {[
                            "Under £500 → Site manager",
                            "£500–£2,000 → Regional ops lead",
                            "Facilities category → Central FM sign-off",
                            "Budget exception → Finance escalation",
                          ].map((rule) => (
                            <div
                              key={rule}
                              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white"
                            >
                              {rule}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Finance visibility
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-tight text-[#0c2d5b]">
                          Month-end clarity
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-[#18b39b]/8 p-3">
                            <div className="text-2xl font-semibold tracking-tight text-[#0c2d5b]">
                              92%
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              Requests with full approval context
                            </div>
                          </div>
                          <div className="rounded-2xl bg-[#8bc53f]/10 p-3">
                            <div className="text-2xl font-semibold tracking-tight text-[#0c2d5b]">
                              14
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              Sites flagged for repeat leakage
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fafcfb_100%)] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Category position
                      </div>
                      <div className="mt-2 text-lg font-semibold tracking-tight text-[#0c2d5b]">
                        Not another heavyweight procurement suite
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        SpendGate sits between uncontrolled local purchasing and bloated
                        enterprise procurement rollouts.
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(24,179,155,0.08)_0%,rgba(139,197,63,0.08)_100%)] p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Faster to adopt",
                          "Designed for distributed ops",
                          "Clearer than email approvals",
                          "Built for pre-invoice control",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="why" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
              Why SpendGate
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
              The real problem is not procurement.
              <br />
              It&apos;s uncontrolled operational spend.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Multi-site businesses rarely lose control through a single major buying
              event. They lose it through hundreds of small operational decisions
              happening constantly across properties, clubs, venues, regions, and teams
              without a clean control layer around them.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {problems.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(12,45,91,0.05)]"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm ${
                      index === 0
                        ? "bg-[#8bc53f]/18 text-[#5e9721]"
                        : index === 1
                        ? "bg-[#18b39b]/14 text-[#138f7d]"
                        : "bg-[#0c2d5b]/10 text-[#0c2d5b]"
                    }`}
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-current" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#0c2d5b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="relative overflow-hidden border-y border-slate-200 bg-white"
      >
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(24,179,155,0.10),transparent_58%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
              Platform
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
              A more premium operating model for everyday purchasing
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              SpendGate is not trying to replace every enterprise procurement process.
              It is built to solve the operational spend problems that actually create
              confusion between site teams and finance.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fafcfb_100%)] shadow-[0_18px_50px_rgba(12,45,91,0.05)] lg:grid-cols-[1.02fr_0.98fr]"
              >
                <div className="p-8 lg:p-10">
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
                      index === 0
                        ? "text-[#5e9721]"
                        : index === 1
                        ? "text-[#138f7d]"
                        : "text-[#0c2d5b]"
                    }`}
                  >
                    {feature.label}
                  </div>
                  <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0c2d5b]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                    {feature.body}
                  </p>
                </div>

                <div className="border-t border-slate-200 bg-slate-50/70 p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <div className="grid gap-3">
                    {feature.bullets.map((item, bulletIndex) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
                      >
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${
                            bulletIndex === 0
                              ? "bg-[#0c2d5b]"
                              : bulletIndex === 1
                              ? "bg-[#18b39b]"
                              : "bg-[#8bc53f]"
                          }`}
                        >
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
              How it works
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
              Simple for operators.
              <br />
              Strong for finance.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              The product logic is straightforward: create structure when spend begins,
              then carry that context forward instead of forcing finance to rebuild it later.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(12,45,91,0.05)]"
              >
                <div
                  className={`text-sm font-semibold uppercase tracking-[0.24em] ${
                    index === 0
                      ? "text-[#5e9721]"
                      : index === 1
                      ? "text-[#138f7d]"
                      : index === 2
                      ? "text-[#0c2d5b]"
                      : "text-[#18b39b]"
                  }`}
                >
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#0c2d5b]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="who"
        className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8faf8_100%)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
                Who it&apos;s for
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
                Designed for multi-site operators with distributed buying behaviour
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                SpendGate is strongest where local teams need autonomy, head office needs
                control, and small operational purchases create disproportionate financial noise.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {sectors.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Operations leaders",
                  text: "Standardise site-level spend requests without creating drag for busy teams.",
                },
                {
                  title: "Finance teams",
                  text: "Get stronger control, cleaner approval context, and better visibility before invoices arrive.",
                },
                {
                  title: "Regional managers",
                  text: "Approve quickly with consistent logic and the right information already in front of them.",
                },
                {
                  title: "Growing estates",
                  text: "Introduce a scalable operating layer before fragmented purchasing becomes embedded.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(12,45,91,0.05)]"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-[#0c2d5b]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
            Pricing
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
            Structured for real rollout, not self-serve shortcuts
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            SpendGate is typically scoped around estate size, workflow complexity, and rollout
            requirements. The model is designed for operational adoption, not template pricing.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`relative overflow-hidden rounded-[2rem] border p-7 shadow-[0_18px_50px_rgba(12,45,91,0.06)] ${
                tier.featured
                  ? "border-[#0c2d5b] bg-[#0c2d5b] text-white"
                  : "border-slate-200 bg-white text-slate-950"
              }`}
            >
              {tier.featured ? (
                <div className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  Best fit
                </div>
              ) : null}

              <div
                className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                  tier.featured ? "text-[#8fe3d4]" : "text-[#138f7d]"
                }`}
              >
                {tier.subtitle}
              </div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{tier.name}</h3>
              <p
                className={`mt-4 text-base leading-7 ${
                  tier.featured ? "text-white/75" : "text-slate-600"
                }`}
              >
                {tier.description}
              </p>

              <div className="mt-8 space-y-3">
                {tier.features.map((feature, index) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
                      tier.featured
                        ? "border-white/10 bg-white/5 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        tier.featured
                          ? "bg-white text-[#0c2d5b]"
                          : index === 0
                          ? "bg-[#0c2d5b] text-white"
                          : index === 1
                          ? "bg-[#18b39b] text-white"
                          : "bg-[#8bc53f] text-white"
                      }`}
                    >
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                  tier.featured
                    ? "bg-white text-[#0c2d5b] hover:bg-slate-100"
                    : "bg-[#0c2d5b] text-white hover:bg-[#0a254b]"
                }`}
              >
                Talk to sales
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
              FAQ
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c2d5b] sm:text-5xl">
              Questions operators, investors, and early buyers will ask
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[1.6rem] border border-slate-200 bg-[#fbfcfb] p-6 shadow-[0_12px_30px_rgba(12,45,91,0.04)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-lg font-semibold tracking-tight text-[#0c2d5b]">
                    {item.q}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.3rem] border border-slate-200 bg-[#0c2d5b] px-8 py-10 text-white shadow-[0_30px_90px_rgba(12,45,91,0.20)] sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,179,155,0.26),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,197,63,0.22),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <img
                src="/spendgate-logo.png"
                alt="SpendGate logo"
                className="h-10 w-auto sm:h-11"
              />
              <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                A sharper, more credible product story for a real operational pain point
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                SpendGate is built around a simple idea with real commercial gravity:
                control everyday operational spend before it turns into invoice ambiguity,
                finance friction, and scaling pain across a distributed business.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="mailto:hello@spendgate.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0c2d5b] transition hover:bg-slate-100"
              >
                Book a demo
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore the platform
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#f7f8f6]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
          <div>
            <img
              src="/spendgate-logo.png"
              alt="SpendGate logo"
              className="h-10 w-auto sm:h-11"
            />
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              SpendGate helps multi-site operators control everyday operational spend
              before it turns into invoice chaos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Platform
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a href="#why" className="block transition hover:text-slate-950">
                Why SpendGate
              </a>
              <a href="#platform" className="block transition hover:text-slate-950">
                Product story
              </a>
              <a href="#pricing" className="block transition hover:text-slate-950">
                Pricing
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Sectors
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {sectors.slice(0, 4).map((sector) => (
                <div key={sector}>{sector}</div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a href="mailto:hello@spendgate.com" className="block transition hover:text-slate-950">
                hello@spendgate.com
              </a>
              <a href="#cta" className="block transition hover:text-slate-950">
                Book a demo
              </a>
              <div>London, UK</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>© 2026 SpendGate. All rights reserved.</p>
            <p>Operational spend control for distributed businesses.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
