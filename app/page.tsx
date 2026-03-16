export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">

        {/* HERO */}

        <section className="mx-auto max-w-5xl pt-6 text-center">

          <div className="flex justify-center">
            <img
              src="/spendgate-logo.png"
              alt="SpendGate logo"
              className="h-56 w-auto sm:h-64 lg:h-72"
            />
          </div>

          <h1 className="mx-auto mt-10 max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-7xl">
            Control operational spend
            <br />
            <span className="bg-[linear-gradient(135deg,#0c2d5b_0%,#18b39b_55%,#8bc53f_100%)] bg-clip-text text-transparent">
              before it becomes spending chaos
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            SpendGate is lightweight operational software, helping multi-site businesses bring structure, visibility,
            and approval control to everyday operational purchasing before it
            turns into downstream finance noise.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@spendgate.io"
              className="inline-flex items-center justify-center rounded-full bg-[#0c2d5b] px-8 py-4 text-base font-semibold text-white shadow-md hover:-translate-y-0.5 hover:bg-[#0a254b] transition"
            >
              hello@spendgate.io
            </a>
          </div>

        </section>

        {/* PRODUCT VISUAL */}

        <section className="mx-auto mt-20 max-w-6xl">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="text-sm font-semibold text-slate-700">
                Purchase Requests
              </div>
            </div>

            <div className="divide-y">

              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <div className="font-semibold text-slate-900">
                    Kitchen equipment replacement
                  </div>
                  <div className="text-sm text-slate-500">
                    Site: London Central
                  </div>
                </div>

                <div className="text-sm font-semibold text-amber-600">
                  Awaiting approval
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <div className="font-semibold text-slate-900">
                    Cleaning supplies order
                  </div>
                  <div className="text-sm text-slate-500">
                    Site: Manchester
                  </div>
                </div>

                <div className="text-sm font-semibold text-emerald-600">
                  Approved
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <div className="font-semibold text-slate-900">
                    Emergency plumbing repair
                  </div>
                  <div className="text-sm text-slate-500">
                    Site: Birmingham
                  </div>
                </div>

                <div className="text-sm font-semibold text-sky-600">
                  Pending review
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* WHO IT'S FOR */}

        <section className="mx-auto mt-24 max-w-5xl text-center">

          <h2 className="text-2xl font-semibold text-slate-900">
            Designed for multi-site operators
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 text-slate-600 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Hospitality groups
            </div>

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Restaurant chains
            </div>

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Golf operators
            </div>

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Gym & fitness groups
            </div>

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Facilities businesses
            </div>

            <div className="rounded-xl border border-slate-200 px-4 py-3">
              Retail groups
            </div>

          </div>

        </section>

        {/* PROBLEM */}

        <section className="mx-auto mt-24 max-w-3xl text-center">

          <h2 className="text-2xl font-semibold text-slate-900">
            Operational purchasing is chaotic
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Site managers buy things every day — maintenance supplies,
            consumables, equipment and emergency items.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Requests happen in WhatsApp messages, emails, spreadsheets or
            quick verbal approvals. Finance teams only discover the spend
            when invoices arrive.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            SpendGate brings structure to that process before the money is spent.
          </p>

        </section>

        {/* HOW IT WORKS */}

        <section className="mx-auto mt-24 max-w-6xl">

          <h2 className="text-center text-2xl font-semibold text-slate-900">
            How SpendGate works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-3xl font-semibold text-[#18b39b]">1</div>
              <p className="mt-4 text-slate-600">
                Site teams submit purchase requests with clear context
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-3xl font-semibold text-[#18b39b]">2</div>
              <p className="mt-4 text-slate-600">
                Managers approve operational spend
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-3xl font-semibold text-[#18b39b]">3</div>
              <p className="mt-4 text-slate-600">
                Finance gains visibility before invoices arrive
              </p>
            </div>

          </div>

        </section>

        {/* FOOTER CTA */}

        <section className="mx-auto mt-24 max-w-4xl pb-10 text-center">

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-10">

            <h3 className="text-2xl font-semibold text-slate-900">
              Early conversations now open
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              We’re speaking with operators, finance leaders and early design partners.
            </p>

            <div className="mt-8">
              <a
                href="mailto:hello@spendgate.io"
                className="inline-flex items-center justify-center rounded-full bg-[#0c2d5b] px-8 py-4 text-base font-semibold text-white shadow-md hover:-translate-y-0.5 hover:bg-[#0a254b] transition"
              >
                hello@spendgate.io
              </a>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
