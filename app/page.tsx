import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import Nav from "@/components/Nav";
import PinnedPoster from "@/components/PinnedPoster";
import PageAnimations from "@/components/PageAnimations";
import {
  indexProjects,
  services,
  statement,
  aboutParagraph,
  contactLead,
  stacks,
  fieldLog,
  socials,
  email,
} from "@/lib/projects";
import { getActivity, ACTIVITY_WEEKS, type Activity } from "@/lib/github";

export const metadata: Metadata = {
  title: "Irgi Febryansyah, design and engineering, one person",
  description:
    "UI/UX designer and full-stack engineer in Indonesia. The same person draws the interface, writes the code and keeps it running.",
};

/** The hero reads live GitHub activity, so the route is ISR. */
export const revalidate = 3600;

export default async function Page() {
  const activity = await getActivity();

  return (
    <>
      <Nav />
      <PageAnimations />

      <main id="main">
        <PinnedPoster />
        <Statement />
        <Index />
        <Services />
        <About activity={activity} />
        <Proof activity={activity} />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

/* =================================================================
   STATEMENT — the claim, in the only large sentence on the page.
   ================================================================= */
function Statement() {
  return (
    <section className="band">
      <div className="shell grid gap-10 md:grid-cols-12" data-reveal>
        <div className="md:col-span-7" data-reveal-item>
          <p className="lead balance">{statement}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#contact" className="btn btn-ink">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#services" className="arrow-link">
              What I do
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:col-span-4 md:col-start-9" data-reveal-item>
          <div className="flex items-center gap-3">
            <span className="size-2.5 shrink-0 bg-accent" aria-hidden="true" />
            <span className="font-semibold">Taking freelance work</span>
          </div>
          <p className="text-muted">
            Remote from Indonesia. Available for design, front-end,
            Android and infrastructure work.
          </p>
          <p className="text-muted">Replies usually land within a business day.</p>
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   INDEX — the projects with no footage. A typographic list, so it
   never reads as another panel run.
   ================================================================= */
function Index() {
  return (
    <section className="pb-[var(--gap-section)]">
      <div className="shell" data-reveal>
        <h2 className="head" data-reveal-item>
          Also built
        </h2>
        <p className="measure mt-4 text-muted" data-reveal-item>
          An LMS, two Android apps and a moon-visibility model. No demo footage
          for any of them yet, so they get a list instead of a panel.
        </p>

        <ul className="mt-10 flex flex-col gap-px">
          {indexProjects.map((p) => {
            const inner = (
              <>
                <div className="min-w-0">
                  <h3 className="h3">{p.title}</h3>
                  <p className="measure mt-2 leading-relaxed opacity-75">{p.subtitle}</p>
                </div>
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span className="small tnum opacity-70">{p.meta}</span>
                  {p.url && <ArrowUpRight size={18} aria-hidden="true" className="shrink-0" />}
                </div>
              </>
            );

            return (
              <li key={p.slug} data-reveal-item>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="idx-row"
                    aria-label={`${p.title} (opens in a new tab)`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="idx-row cursor-default">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* =================================================================
   SERVICES — the one field-colour section. The heading holds while
   the blocks travel past it.
   ================================================================= */
function Services() {
  return (
    <section id="services" className="field band">
      <div className="shell" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4" data-reveal-item>
          <h2 className="head">What I do</h2>
          <p className="max-w-[42ch] text-field-ink opacity-90">
            Four things, all of them shipped rather than handed over. Each one
            below carries a project that proves it.
          </p>
        </div>

        <div className="mt-[var(--gap-head)] grid gap-x-12 gap-y-[var(--gap-block)] md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} data-reveal-item>
              <h3 className="h3">{s.title}</h3>
              <p className="measure mt-3 leading-relaxed opacity-90">{s.blurb}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {s.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6">
                Shipped as{" "}
                {s.proof.url ? (
                  <a
                    href={s.proof.url}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-link"
                    style={{ color: "var(--c-field-ink)" }}
                  >
                    {s.proof.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-semibold">{s.proof.label}</span>
                )}
                .
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   ABOUT — the paragraph, the real stacks, and the live commit grid.
   ================================================================= */
function About({ activity }: { activity: Activity | null }) {
  return (
    <section id="about" className="band">
      <div className="shell" data-reveal>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6" data-reveal-item>
            <h2 className="head">One person, both halves</h2>
            <p className="measure mt-6 text-lg leading-relaxed">{aboutParagraph}</p>
          </div>

          <div className="md:col-span-5 md:col-start-8" data-reveal-item>
            {activity && <CommitGrid activity={activity} />}
          </div>
        </div>

        <div className="mt-[var(--gap-head)] grid gap-x-12 gap-y-8 md:grid-cols-2">
          <div data-reveal-item>
            <h3 className="h3">Designing and building</h3>
            <p className="measure mt-3 leading-relaxed text-muted">
              {stacks.design.join(", ")}.
            </p>
          </div>
          <div data-reveal-item>
            <h3 className="h3">Shipping and running</h3>
            <p className="measure mt-3 leading-relaxed text-muted">
              {stacks.infra.join(", ")}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   COMMIT GRID — real data, straight from the public calendar.
   role="img" keeps a screen reader on the summary rather than
   reading out every cell.
   ================================================================= */
const activityLevels = [
  "bg-s2",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
] as const;

const monthShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Deterministic and server-side only — no locale or timezone drift. */
function formatDay(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${monthShort[month - 1]} ${year}`;
}

function CommitGrid({ activity }: { activity: Activity }) {
  return (
    <figure>
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-semibold">GitHub activity</span>
        <span className="tnum text-muted">{activity.total} commits</span>
      </figcaption>

      <div
        role="img"
        aria-label={`GitHub commit activity: ${activity.total} ${
          activity.total === 1 ? "commit" : "commits"
        } across the last ${ACTIVITY_WEEKS} weeks.`}
        className="mt-4 flex gap-[3px]"
      >
        {activity.weeks.map((week, wi) => (
          <div key={wi} className="flex min-w-0 flex-1 flex-col gap-[3px]">
            {week.map((day, di) => (
              <span
                key={di}
                title={
                  day
                    ? `${day.count} ${
                        day.count === 1 ? "commit" : "commits"
                      } on ${formatDay(day.date)}`
                    : undefined
                }
                className={`aspect-square w-full ${
                  day ? activityLevels[day.level] : "bg-transparent"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-4 leading-relaxed text-muted">
        {activity.total} commits over the last {ACTIVITY_WEEKS} weeks, read live
        from the public contributions calendar.
      </p>
    </figure>
  )
}

/* =================================================================
   PROOF — one number owns the screen. When GitHub is unreachable
   the figure falls back to the project count, which is also real.
   ================================================================= */
function Proof({ activity }: { activity: Activity | null }) {
  const figure = activity ? activity.total : indexProjects.length + 4;
  const unit = activity ? "commits" : "projects";
  const claim = activity ? `Commits in the last ${ACTIVITY_WEEKS} weeks` : "Projects shipped";
  const caption = activity
    ? "Pulled from the GitHub contributions calendar at build time, hourly. It is a record of what got written, not a claim about skill."
    : "Four client and personal builds with footage above, plus four open-source and client projects listed under Also built.";

  return (
    <section className="field-accent band" style={{ minHeight: "80svh" }}>
      <div className="shell flex min-h-[60svh] flex-col justify-between gap-[var(--gap-block)]" data-reveal>
        <p className="lead max-w-[20ch]" data-reveal-item>
          {claim}
        </p>

        <div data-reveal-item>
          <div className="flex items-start gap-3">
            <span className="tnum font-display text-stat font-normal leading-[0.78] tracking-tight">
              {figure}
            </span>
            <span className="mt-[0.3em] font-display text-h3 font-normal uppercase leading-none tracking-tight">
              {unit}
            </span>
          </div>
          <p className="measure mt-6 max-w-[40ch] leading-relaxed">{caption}</p>
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   EXPERIENCE — one role, so it gets one wide row, not a card.
   ================================================================= */
function Experience() {
  return (
    <section className="band">
      <div className="shell" data-reveal>
        <div className="bg-s2 p-[clamp(1.5rem,4vw,3rem)]" data-reveal-item>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 className="head">{fieldLog.title}</h2>
            <p className="tnum text-muted">{fieldLog.period}</p>
          </div>

          <p className="mt-2 text-muted">{fieldLog.role}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {fieldLog.items.map((item) => (
              <li key={item} className="bg-bg p-5 leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   CONTACT — one opaque card on a field.
   ================================================================= */
function Contact() {
  return (
    <section id="contact" className="bg-s2 band">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between" data-reveal>
          <div className="max-w-[24ch]" data-reveal-item>
            <h2 className="head">Available</h2>
            <p className="mt-5 text-lg leading-relaxed">{contactLead}</p>
          </div>

          <div className="w-full bg-bg p-[clamp(1.5rem,3vw,2rem)] md:max-w-[420px]" data-reveal-item>
            <p className="text-muted">Email</p>
            <a href={`mailto:${email}`} className="mt-3 flex items-start justify-between gap-4">
              <span className="h3 break-all">{email}</span>
              <Mail size={20} aria-hidden="true" className="mt-1 shrink-0" />
            </a>

            <ul className="mt-8 flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 bg-s2 px-4 py-3 transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-semibold">{s.label}</span>
                      <span className="text-muted opacity-70">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a href={`mailto:${email}`} className="btn btn-accent mt-8 w-full">
              Write to Irgi
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =================================================================
   FOOTER — one quiet line.
   ================================================================= */
function Footer() {
  return (
    <footer className="pb-[clamp(2.5rem,8vh,5rem)] pt-[var(--gap-section)]">
      <div className="shell grid items-baseline gap-4 sm:grid-cols-[1fr_auto_1fr]" data-reveal>
        <p className="text-muted" data-reveal-item>
          Irgi Febryansyah, design &amp; engineering
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <span className="tnum text-muted sm:justify-self-end">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
