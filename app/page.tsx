import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageAnimations from "@/components/PageAnimations";
import PanelVideo from "@/components/PanelVideo";
import Lens from "@/components/Lens";
import Disclosure from "@/components/Disclosure";
import {
  panels,
  indexProjects,
  statement,
  aboutParagraph,
  contactLead,
  stacks,
  fieldLog,
  socials,
  figures,
  email,
} from "@/lib/projects";
import { getActivity, ACTIVITY_WEEKS, type Activity } from "@/lib/github";

export const metadata: Metadata = {
  title: "Irgi Febryansyah — UI/UX design and engineering, one person",
  description:
    "UI/UX designer and full-stack engineer in Indonesia. The same person draws the interface, writes the code and keeps it running.",
};

export const revalidate = 3600;

export default async function Page() {
  const activity = await getActivity();

  return (
    <>
      <Nav />
      <PageAnimations />

      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <Capabilities />
        <Index />
        <About activity={activity} />
        <Numbers activity={activity} />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-bg px-[var(--margin)] pb-8 pt-[calc(var(--nav-h)+2rem)]"
    >
      <div className="flex items-start justify-between gap-6 text-small">
        <span className="text-muted">Designer / Engineer</span>
        <a href="#contact" className="arrow-link text-muted">
          Start a project
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>

      <h1
        className="display w-full leading-[0.85] tracking-[-0.04em]"
        data-hero-line
        style={{ fontSize: "clamp(60px, 14vw, 220px)" }}
      >
        Irgi
        <br />
        Febryansyah
      </h1>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-[40ch] text-lead leading-tight">
          The same person draws the interface, writes the code and keeps it
          running.
        </p>
        <a href="#work" className="arrow-link">
          See the work
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="field-cream band">
      <div className="shell grid gap-10 md:grid-cols-12" data-reveal>
        <div className="md:col-span-5" data-reveal-item>
          <h2 className="section-title">No handoff</h2>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal-item>
          <p className="lead balance">{statement}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-ink">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#work" className="arrow-link">
              See the work
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-bg band">
      <div className="shell" data-reveal>
        <div className="mb-[var(--gap-head)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-title" data-reveal-item>
            Work
          </h2>
          <p className="measure text-muted" data-reveal-item>
            Six projects with footage of themselves. The rest live in the index
            below.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2" data-reveal>
          {panels.map((p) => (
            <article
              key={p.slug}
              className="group relative overflow-hidden rounded-[24px] bg-s1"
              data-reveal-item
            >
              <div
                className="group relative w-full overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <PanelVideo
                  src={p.video}
                  poster={p.poster}
                  alt={p.alt}
                  active={false}
                  autoplay
                />
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 p-6">
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.kicker}</p>
                  <p className="mt-1 text-small text-muted">
                    <span className="tnum">{p.year}</span> · {p.role}
                  </p>
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-link text-small justify-self-end"
                    aria-label={`${p.title} (opens in a new tab)`}
                  >
                    Visit
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="services" className="field-lime band">
      <div className="shell" data-reveal>
        <Lens />
      </div>
    </section>
  );
}

function Index() {
  return (
    <section className="field-violet band">
      <div className="shell" data-reveal>
        <h2 className="section-title" data-reveal-item>
          Also built
        </h2>

        <div className="mt-[var(--gap-head)]">
          {indexProjects.map((p) => {
            const body = (
              <>
                <p className="measure leading-relaxed">{p.subtitle}</p>
                <p className="mt-4 text-small opacity-80">{p.meta}</p>
              </>
            );

            return (
              <Disclosure
                key={p.slug}
                className="bar"
                data-reveal-item
                summary={
                  <>
                    <span className="h3">{p.title}</span>
                    <span className="small shrink-0 opacity-70">{p.meta}</span>
                  </>
                }
              >
                <div className="bar__body">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block"
                      aria-label={`${p.title} (opens in a new tab)`}
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </div>
              </Disclosure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ activity }: { activity: Activity | null }) {
  return (
    <section id="about" className="field-cream band">
      <div className="shell" data-reveal>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6" data-reveal-item>
            <h2 className="section-title">One person, both halves</h2>
            <p className="measure mt-6 text-lg leading-relaxed">
              {aboutParagraph}
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8" data-reveal-item>
            {activity && <CommitWall activity={activity} />}
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
  );
}

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

function formatDay(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${monthShort[month - 1]} ${year}`;
}

function CommitWall({ activity }: { activity: Activity }) {
  return (
    <figure>
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-bold">GitHub activity</span>
        <span className="tnum text-muted">{activity.total} commits</span>
      </figcaption>

      <div
        role="img"
        aria-label={`GitHub commit activity: ${activity.total} ${
          activity.total === 1 ? "commit" : "commits"
        } across the last ${ACTIVITY_WEEKS} weeks.`}
        className="commit-wall mt-4"
      >
        {activity.weeks.map((week, wi) => (
          <div key={wi} className="commit-week">
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
                className={`commit-day ${
                  day ? activityLevels[day.level] : "bg-transparent"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-4 leading-relaxed text-muted">
        {activity.total} commits over the last {ACTIVITY_WEEKS} weeks, read
        live from the public contributions calendar.
      </p>
    </figure>
  );
}

function Numbers({ activity }: { activity: Activity | null }) {
  const commits = activity
    ? { value: activity.total, note: `Commits in the last ${ACTIVITY_WEEKS} weeks, pulled from the public GitHub calendar at build time.` }
    : { value: figures.shipped.value, note: "The shipped-project count, used while the contribution calendar is unreachable." };

  return (
    <section className="field-red band">
      <div className="shell" data-reveal>
        <h2 className="section-title mb-[var(--gap-head)]" data-reveal-item>
          What the work adds up to
        </h2>

        <div className="tiles mt-[var(--gap-head)]">
          <div className="tile tile--tall field-cream" data-reveal-item>
            <span className="tile__figure tnum">{commits.value}</span>
            <span className="max-w-[34ch] leading-relaxed">{commits.note}</span>
          </div>

          <div className="tile tile--mid field-cream" data-reveal-item>
            <span className="tile__figure tnum">{figures.shipped.value}</span>
            <span className="max-w-[30ch] leading-relaxed">
              {figures.shipped.label}. {figures.shipped.note}
            </span>
          </div>

          <div className="tile tile--low field-cream" data-reveal-item>
            <span className="tile__figure tnum">{figures.areas.value}</span>
            <span className="max-w-[30ch] leading-relaxed">
              {figures.areas.label}. {figures.areas.note}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="field-pink band">
      <div className="shell" data-reveal>
        <h2 className="section-title mb-[var(--gap-head)]" data-reveal-item>
          Experience
        </h2>

        <div className="field-cream p-[clamp(1.5rem,4vw,3.5rem)]" data-reveal-item>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="head">{fieldLog.title}</h3>
            <p className="tnum text-lead font-bold">{fieldLog.period}</p>
          </div>

          <p className="mt-3 text-lead">{fieldLog.role}</p>

          <ul className="mt-8 flex max-w-[68ch] flex-col gap-3 text-lg leading-relaxed">
            {fieldLog.items.map((item) => (
              <li key={item} className="flex gap-4">
                <span aria-hidden="true" className="select-none font-bold">
                  &mdash;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="field-cream band">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12" data-reveal>
          <div className="md:col-span-5" data-reveal-item>
            <h2 className="section-title">Available</h2>
            <p className="measure mt-5 text-lg leading-relaxed">
              {contactLead}
            </p>
          </div>

          <div className="md:col-span-7" data-reveal-item>
            <a href={`mailto:${email}`} className="row-link field-red">
              <span className="row-link__long">{email}</span>
              <span className="row-link__tag">Write to Irgi</span>
            </a>

            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="row-link field-violet mt-[6px]"
                aria-label={`${s.label}, ${s.handle} (opens in a new tab)`}
              >
                <span>{s.label}</span>
                <span className="row-link__tag">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-bg">
      <div className="shell flex flex-col items-start gap-2 pb-8 pt-[var(--gap-block)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-small text-muted">
          Design &amp; engineering, from Indonesia
        </p>
        <span className="tnum text-small text-muted">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}