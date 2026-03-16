export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf8] text-slate-900">

      {/* Background gradients */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7faf8_0%,#fcfdfc_45%,#ffffff_100%)]" />
      <div className="absolute inset-x-0 top-[-220px] -z-20 h-[620px] bg-[radial-gradient(circle_at_50%_50%,rgba(24,179,155,0.18),transparent_34%),radial-gradient(circle_at_20%_30%,rgba(139,197,63,0.14),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(12,45,91,0.10),transparent_24%)]" />
      <div className="absolute left-[-80px] top-[220px] -z-10 h-[240px] w-[240px] rounded-full bg-[#18b39b]/10 blur-3xl" />
      <div className="absolute right-[-60px] top-[140px] -z-10 h-[280px] w-[280px] rounded-full bg-[#8bc53f]/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full text-center">

          {/* Coming soon badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur">
            Coming soon
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/spendgate-logo.png"
              alt="SpendGate logo"
              className="h-44 w-auto sm:h-56 lg:h-64"
            />
          </div>

          {/* Tagline */}
          <h1 className="mx-auto mt-10 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0c2d5b] sm:text-5xl lg:text-7xl">
            Control operational spend
            <br />
            <span className="bg-[linear-gradient(135deg,#0c2d5b_0%,#18b39b_58%,#8bc53f_100%)] bg-clip-text text-transparent">
              before it becomes invoice chaos
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            SpendGate helps multi-site businesses bring structure, visibility, and
            approval control to everyday operational purchasing.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@spendgate.io"
              className="inline-flex items-center justify-center rounded-full bg-[#0c2d5b] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(12,45,91,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0a254b]"
            >
              hello@spendgate.io
            </a>

          
          </div>

        </div>
      </div>
    </main>
  );
}
