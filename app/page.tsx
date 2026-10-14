import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import PinnedPoster from "@/components/PinnedPoster";
import PageAnimations from "@/components/PageAnimations";
import Lens from "@/components/Lens";
import Disclosure from "@/components/Disclosure";
import {
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
        <Intro />
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

/* =================================================================
   INTRO — the claim, with the two headline lines as its furniture.
   The headline above is the name; this is what the name means.
   ================================================================= */
function Intro() {
  return (
    <section className="band">
      <div className="shell grid gap-10 md:grid-cols-12" data-reveal>
        <div className="md:col-span-7" data-reveal-item>
          <h2 className="section-title">No handoff</h2>
          <p className="lead balance mt-6">{statement}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
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

        <div
          className="flex flex-col gap-5 md:col-span-4 md:col-start-9"
          data-reveal-item
        >
          <div className="flex items-center gap-3">
            <span className="size-3 shrink-0 bg-accent" aria-hidden="true" />
            <span className="font-bold">Taking freelance work</span>
          </div>
          <p className="text-muted">
            Remote from Indonesia. Available for design, front-end, Android
            and infrastructure work.
          </p>
          <p className="text-muted">
            Replies usually land within a business day.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   CAPABILITIES — a poster-scale list on a full colour field, with the
   lens above it. The heading is the first row of the list itself.
   ================================================================= */
function Capabilities() {
  return (
    <section id="services" className="field-red band">
      <div className="shell" data-reveal>
        <Lens />
      </div>
    </section>
  );
}

/* =================================================================
   INDEX — the projects with no footage. Filled bars that open in
   place, so it never reads as another panel run.
   ================================================================= */
function Index() {
  return (
    /* `band` on both sides, like every other section on the page. With only
       a bottom pad the giant word sat flush against the red field above it
       while the rest of the page got a full section gap either side. */
    <section className="band">
      <div className="shell" data-reveal>
        {/* Not `giant-word`. That class is 15cqw, which was doing a
            section title's job with no size relationship to any other
            heading on the page -- so it read as a poster flourish, not as
            "this is a section". `section-title` puts it on the same scale
            as every other section title, which is the whole point. */}
        <h2 className="section-title" data-reveal-item>
          Also
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
                    <span className="small shrink-0 opacity-70">
                      {p.meta}
                    </span>
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

        <p className="measure mt-8 text-muted" data-reveal-item>
          An LMS, two Android apps and a moon-visibility model. No demo
          footage for any of them yet, so they get bars instead of a panel.
        </p>
      </div>
    </section>
  );
}

/* =================================================================
   ABOUT — the paragraph, the real stacks, and the live commit wall.
   ================================================================= */
function About({ activity }: { activity: Activity | null }) {
  return (
    <section id="about" className="band">
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

/* =================================================================
   COMMIT WALL — real data, straight from the public calendar.
   role="img" keeps a screen reader on the summary rather than reading
   out every cell.
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

/* =================================================================
   NUMBERS — three stepped tiles that refuse to line up. Every figure
   is countable from the work above. When GitHub is unreachable the
   first tile falls back to the shipped count, which is also real.
   ================================================================= */
function Numbers({ activity }: { activity: Activity | null }) {
  const commits = activity
    ? { value: activity.total, note: `Commits in the last ${ACTIVITY_WEEKS} weeks, pulled from the public GitHub calendar at build time.` }
    : { value: figures.shipped.value, note: "The shipped-project count, used while the contribution calendar is unreachable." };

  return (
    <section className="field-mustard band">
      {/* The scope was missing here, so the heading and the three tiles
          carried `data-reveal-item` with no trigger to ever fire them: this
          section was the one part of the page that appeared with no
          entrance at all. */}
      <div className="shell" data-reveal>
        {/* The heading sits in the notch above the right-hand tiles, as the
            blueprint describes. It is in normal flow, so it must come
            before them in the DOM to occupy that space. */}
        {/* No `max-w-[14ch]` cap: at section-title size that wrapped the
            title into three lines on desktop, which made the loudest
            heading on the mustard field the smallest block on it. */}
        <h2 className="section-title mb-[var(--gap-head)]" data-reveal-item>
          What the work adds up to
        </h2>

        <div className="tiles mt-[var(--gap-head)]">
          {/* Explicit field classes, not `field-accent`. The accent resolves to
                mustard in dark mode, which is the colour of the section
                behind it -- so the tall tile vanished against its own
                background. The tiles must be chosen by what sits NEXT to
                them, not by the theme's accent. */}
          <div className="tile tile--tall field-red" data-reveal-item>
            <span className="tile__figure tnum">{commits.value}</span>
            <span className="max-w-[34ch] leading-relaxed">{commits.note}</span>
          </div>

          <div className="tile tile--mid field-slate" data-reveal-item>
            <span className="tile__figure tnum">{figures.shipped.value}</span>
            <span className="max-w-[30ch] leading-relaxed">
              {figures.shipped.label}. {figures.shipped.note}
            </span>
          </div>

          <div className="tile tile--low field-maroon" data-reveal-item>
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

/* =================================================================
   EXPERIENCE — one role, so it gets one wide row, not a card.
   ================================================================= */
function Experience() {
  return (
    <section className="band">
      <div className="shell" data-reveal>
        {/* The section had no title of its own: the bone band went straight
            to the employer's name, which is a subheading pretending to be a
            section title. The title sits above the band, in the page's own
            ground, so the band reads as the content of this section. */}
        <h2 className="section-title mb-[var(--gap-head)]" data-reveal-item>
          Experience
        </h2>

        {/* One role, so it gets one wide band with the three items as running
            prose under it. As a bordered three-column grid it read as a
            row of identical cards, which is the tell this section is
            meant to avoid. */}
        <div className="field-bone p-[clamp(1.5rem,4vw,3.5rem)]" data-reveal-item>
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

/* =================================================================
   CONTACT — a stack of display-size rows on alternating tones.
   ================================================================= */
function Contact() {
  return (
    <section id="contact" className="band">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12" data-reveal>
          <div className="md:col-span-5" data-reveal-item>
            <h2 className="section-title">Available</h2>
            <p className="measure mt-5 text-lg leading-relaxed">
              {contactLead}
            </p>
          </div>

          <div className="md:col-span-7" data-reveal-item>
            {/* The handle is the row's own affordance: a row this size is
                unmistakably a link, so it carries no icon. A repeated
                icon on four identical rows turns the stack back into the
                card row it was meant to replace. */}
            <a
              href={`mailto:${email}`}
              className="row-link field-red"
            >
              <span className="row-link__long">{email}</span>
              <span className="row-link__tag">Write to Irgi</span>
            </a>

            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="row-link field-slate mt-[6px]"
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

/* =================================================================
   FOOTER — small print only. The invitation, the mail link and the
   social rows already live in CONTACT; repeating them here would say
   the same thing a third time at a third volume.

   No colour field here, and that is deliberate: the small print sits on
   the page's own ground. The footer used to carry `field-ink`, which is
   not a class in globals.css — it rendered transparent either way, but
   the markup claimed a colour block that never existed.
   ================================================================= */
function Footer() {
  return (
    <footer>
      {/* One row when both halves fit, a deliberate stack when they do
         not. `flex-wrap` + `justify-between` used to handle the narrow
         case by wrapping: on a 360px phone the line measures 282px of
         the 320px content box, so the year fell to a second line and
         sat flush under the start of the first — an orphan, not a
         layout. Stacked, it reads as two lines of small print. */}
      <div className="shell flex flex-col items-start gap-2 pb-8 pt-[var(--gap-block)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-small opacity-75">
          Design &amp; engineering, from Indonesia
        </p>
        <span className="tnum text-small opacity-75">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}