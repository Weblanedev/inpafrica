import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28">
      <section className="text-center">
        <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
          About INP Africa
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
          We believe financial freedom starts with the right knowledge, delivered
          affordably, in XAF, for entrepreneurs who learn in English and French.
        </p>
      </section>

      <section className="mt-20 space-y-12 text-muted md:mt-28">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text">
            Mission
          </h2>
          <p className="mt-4 leading-relaxed">
            To make world-class business and affiliate marketing education
            accessible across Africa through digital books and a fair affiliate
            program. {AFFILIATE_TAGLINE}
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-text">
            Vision
          </h2>
          <p className="mt-4 leading-relaxed">
            A continent where millions earn sustainably online, supported by
            practical books, community, and transparent pricing in local currency.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-text">
            Our story
          </h2>
          <p className="mt-4 leading-relaxed">
            INP Africa was founded by a team of entrepreneurs who understood
            African payment rails, mobile money, markets, and real constraints. We built a
            marketplace that respects them.
          </p>
          <p className="mt-4 leading-relaxed">
            Today we ship PDFs and eBooks instantly, reward members with lower
            prices, and help affiliates earn by spreading titles they believe in.
          </p>
        </div>
      </section>

      {/* <section className="mt-20 rounded-xl border border-border bg-surface p-10 shadow-sm md:mt-28">
        <div className="grid gap-10 text-center sm:grid-cols-4">
          {[
            ["16+", "Books in library"],
            ["2,000+", "Members"],
            ["12+", "Countries"],
            ["4+", "Years"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-3xl font-bold text-gold">{n}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
