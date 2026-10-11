import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Mail,
  Code2,
  Smartphone,
  Server,
  PenTool,
} from "lucide-react";
import Nav from "@/components/Nav";
import LiveClock from "@/components/LiveClock";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import PageAnimations from "@/components/PageAnimations";
import CursorGlow from "@/components/CursorGlow";
import Marquee from "@/components/Marquee";
import TiltCard from "@/components/TiltCard";
import {
  clientProjects,
  buildProjects,
  moduleProjects,
  type ClientProject,
  type BuildProject,
  type ModuleProject,
  socials,
  designStack,
  infraStack,
  fieldLog,
  services,
  processSteps,
  marqueeWords,
  accentBgClass,
} from "@/lib/projects";
import { getActivity, ACTIVITY_WEEKS, type Activity } from "@/lib/github";

const totalProjects =
  clientProjects.length + buildProjects.length + moduleProjects.length;
const stackLayers = designStack.length + infraStack.length;

const processAccents = ["signal", "pop", "grape", "aqua"] as const;

const serviceIcons = [PenTool, Code2, Smartphone, Server] as const;

/** The hero's commit grid is fetched at render time, so the route has to be
    ISR -- without this the page is prerendered once and the grid is frozen
    at whatever the last deploy happened to see. */
export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      <Nav />
      <VideoModal />
      <PageAnimations />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob--signal -left-[10vw] top-[8vh]" data-parallax="25" />
        <div className="blob blob--grape right-[-14vw] top-[42vh]" data-parallax="-18" />
        <div className="blob blob--pop left-[24vw] top-[118vh]" data-parallax="20" />
        <div className="blob blob--aqua right-[6vw] top-[212vh]" data-parallax="-25" />
      </div>

      <main id="main" className="relative z-10 w-full">
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Process />
        <Contact />
      </main>
    </>
  );
}

/* =================================================================
   HERO
   ================================================================= */
async function Hero() {
  const activity = await getActivity();
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      <div className="grid-lines" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-7 lg:gap-9">
        {/* ---- name, full container width ---- */}
        <h1 className="display-xl">
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="block" data-line-hero>
              IRGI
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="block text-stroke" data-line-hero>
              FEBRYANSYAH
            </span>
          </span>
        </h1>

        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* ---- copy ---- */}
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="font-display text-xl font-medium leading-tight tracking-tight text-ink sm:text-2xl md:text-[28px]">
                UI/UX designer &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">full-stack engineer</span>
                  <span
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 rounded-sm bg-signal/35"
                    aria-hidden="true"
                  />
                </span>{" "}
                based in Indonesia.
              </p>

              <p className="max-w-xl text-base leading-relaxed text-steel sm:text-lg">
                Available for freelance projects and collaboration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:irgifebry2006@gmail.com"
                className="btn btn-primary"
                data-magnetic
              >
                <Mail size={17} aria-hidden="true" />
                Email me
              </a>
              <a href="#work" className="btn btn-ghost">
                View work
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-1 grid max-w-sm grid-cols-3 gap-2">
              <Stat value={totalProjects} label="Projects" accent="text-signal" />
              <Stat value={stackLayers} label="Technologies" accent="text-pop" />
              <Stat value={services.length} label="Services" accent="text-grape" />
            </div>
          </div>

          {/* ---- art ---- */}
          <div className="relative hidden lg:block">
            <TiltCard intensity={8} lift={-8} className="card card-hover !rounded-[1.75rem] card-pad">
              <div className="tilt-inner flex flex-col gap-4">
                <span className="eyebrow text-steel">Roles</span>

                <div className="flex flex-col gap-2">
                  {["UI/UX Designer", "React Engineer", "Android Dev", "SysOps"].map((role, i) => (
                    <div
                      key={role}
                      className="flex items-center justify-between border-b border-hair pb-2 last:border-0 last:pb-0"
                    >
                      <span className="font-display text-[15px] font-bold tracking-tight sm:text-base">
                        {role}
                      </span>
                      <span className="font-mono text-[11px] text-steel">
                        0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {activity && <CommitGrid activity={activity} />}
              </div>
            </TiltCard>

            <div
              aria-hidden="true"
              className="absolute -bottom-6 -left-8 -z-10 h-48 w-48 rounded-full bg-signal/20 blur-3xl"
            />
          </div>
        </div>
        </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-steel">
          Scroll
          <ArrowDown size={12} aria-hidden="true" className="animate-bounce" />
        </span>
      </div>
    </section>
  );
}

/* =================================================================
   COMMIT ACTIVITY
   ================================================================= */

/** Static strings so Tailwind's scanner can see every variant. */
const activityLevels = [
  "bg-hair-strong",
  "bg-signal/25",
  "bg-signal/50",
  "bg-signal/75",
  "bg-signal",
] as const;

const monthShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Deterministic, server-side only -- avoids any locale/timezone drift. */
function formatDay(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${monthShort[month - 1]} ${year}`;
}

function CommitGrid({ activity }: { activity: Activity }) {
  const label = `GitHub commit activity: ${activity.total} ${
    activity.total === 1 ? "commit" : "commits"
  } across the last ${ACTIVITY_WEEKS} weeks.`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
          GitHub activity
        </span>
        <span className="font-mono text-[10px] text-signal">
          {activity.total} commits
        </span>
      </div>

      {/* role="img" keeps assistive tech on the summary rather than
          reading out every individual day cell. */}
      <div
        role="img"
        aria-label={label}
        className="mt-2.5 flex gap-[3px]"
      >
        {activity.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex min-w-0 flex-1 flex-col gap-[3px]">
            {week.map((day, dayIndex) => (
              <span
                key={dayIndex}
                title={
                  day
                    ? `${day.count} ${
                        day.count === 1 ? "commit" : "commits"
                      } on ${formatDay(day.date)}`
                    : undefined
                }
                className={`aspect-square w-full rounded-[2px] ${
                  day ? activityLevels[day.level] : "bg-transparent"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-2.5 font-mono text-[9px] uppercase tracking-wider text-steel">
        last {ACTIVITY_WEEKS} weeks
      </p>
    </div>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-hair bg-panel/50 px-3.5 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-signal/50">
      <div
        className={`truncate font-display text-xl font-bold tracking-tight sm:text-2xl ${accent}`}
      >
        {/* server-rendered final value: stays correct if JS/animation never runs */}
        <span className="count-up" data-count-up data-value={value}>
          {value}
        </span>
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-wider text-steel sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

/* =================================================================
   TICKER
   ================================================================= */
function Ticker() {
  return (
    <section aria-label="Skills ticker" className="border-y border-hair bg-panel/40 py-4 backdrop-blur-sm">
      <Marquee duration={38}>
        {marqueeWords.map((w) => (
          <span key={w} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg font-bold uppercase tracking-tight text-ink sm:text-xl">
              {w}
            </span>
            <span className="size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* =================================================================
   SERVICES
   ================================================================= */
function Services() {
  return (
    <section id="services" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader
          num="03"
          title="Services"
          blurb="Four disciplines: design, web engineering, mobile apps, and infrastructure."
        />

        <div className="section-body card-grid sm:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[Number(s.num) - 1];
            return (
              <TiltCard key={s.num} intensity={4} lift={-4} className="card card-hover card-glow card-pad">
                <div className="tilt-inner flex h-full flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl ${accentBgClass[s.accent]} text-on-accent`}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-steel">{s.num}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-[22px]">
                    {s.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-steel">{s.blurb}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {s.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   ABOUT
   ================================================================= */
function About() {
  return (
    <section id="about" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader num="02" title="About" />

        <div className="section-body card-grid lg:grid-cols-[1.15fr_1fr]">
          <div
            className="card card-pad flex flex-col gap-4"
            data-reveal-item
          >
            <p className="text-lg leading-relaxed text-ink sm:text-[21px] sm:leading-[1.4]">
              I work across design and engineering. Wireframes and prototypes in Figma,
              implementation in{" "}
              <span className="text-signal">React / React Native / Android</span>, and Linux
              infrastructure for deployment.
            </p>
            <p className="max-w-2xl text-[15px] leading-relaxed text-steel">
              Design and implementation stay with the same person, so interface decisions are
              informed by what the code and the infrastructure can actually support.
            </p>

            <div className="mt-1 flex flex-wrap gap-3">
              <a href="mailto:irgifebry2006@gmail.com" className="btn btn-pop" data-magnetic>
                Email me
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="#process" className="btn btn-ghost">
                Process
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="card-stack">
            <div className="card card-pad" data-reveal-item>
              <p className="eyebrow mb-3 text-steel">Design &amp; build</p>
              <div className="flex flex-wrap gap-2">
                {designStack.map((s) => (
                  <span key={s} className="chip hover:border-signal/60 hover:text-ink">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card card-pad" data-reveal-item>
              <p className="eyebrow mb-3 text-steel">Infrastructure</p>
              <div className="flex flex-wrap gap-2">
                {infraStack.map((s) => (
                  <span key={s} className="chip hover:border-aqua/60 hover:text-ink">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   EXPERIENCE
   ================================================================= */
function Experience() {
  return (
    <section id="experience" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader
          num="04"
          title="Experience"
          blurb="Operations and infrastructure work, before moving into design and front-end engineering."
        />

        <div className="section-body">
          {/* role detail */}
          <div className="card card-pad" data-reveal-item>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hair pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">
                  {fieldLog.title}
                </h3>
                <p className="mt-1 text-base text-signal">{fieldLog.role}</p>
              </div>
              <span className="pill">{fieldLog.period}</span>
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {fieldLog.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-steel">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   PROJECTS
   ================================================================= */
function Projects() {
  return (
    <section id="work" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader
          num="05"
          title="Work"
          blurb="Client projects, personal builds, and open-source tools."
        />

        <div className="section-body flex flex-col gap-[var(--section-group-gap)]">
          <Group title="Client work" projects={clientProjects} kind="client" />
          <Group title="Personal builds" projects={buildProjects} kind="build" />
          <Group title="Open source" projects={moduleProjects} kind="module" />
        </div>
      </div>
    </section>
  );
}

function Group({
  title,
  projects,
  kind,
}: {
  title: string;
  projects: (ClientProject | BuildProject | ModuleProject)[];
  kind: "client" | "build" | "module";
}) {
  return (
    // No data-reveal here: this sits inside the Projects wrapper, and nesting
    // two [data-reveal] scopes animates the same cards twice — the second tween
    // re-applies opacity:0 and the cards stay invisible.
    <div>
      <div className="section-sub flex items-center gap-4">
        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
        <span className="font-mono text-[11px] text-steel">({projects.length})</span>
        <span className="rule flex-1" data-rule />
      </div>

      <div className="card-grid sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} kind={kind} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  kind,
}: {
  project: ClientProject | BuildProject | ModuleProject;
  kind: "client" | "build" | "module";
}) {
  /* ---- open source: compact link cards ---- */
  if (kind === "module") {
    const m = project as ModuleProject;
    return (
      <a
        href={m.url}
        target="_blank"
        rel="noreferrer"
        className="card card-hover card-glow card-pad group flex flex-col justify-between gap-3"
        data-flip-id={`card-${m.slug}`}
        data-reveal-item
      >
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-signal">
            {m.title}
          </h4>
          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
          />
        </div>
        <p className="text-sm leading-relaxed text-steel">{m.subtitle}</p>
        <div className="flex flex-wrap gap-1.5">
          {m.tags.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>
      </a>
    );
  }

  /* ---- client + personal builds: media cards ---- */
  const f = project as ClientProject | BuildProject;

  const isClient = "timeline" in f;
  const timeline = isClient ? (f as ClientProject).timeline : "";
  // "Feb — Jul 2026" -> "FEB — JUL 2026", sized to sit beside the title
  const timelinePill = timeline.toUpperCase().replace(/\s+—\s+/, " — ");
  const role = "role" in f ? (f as ClientProject).role : "";
  const company = "company" in f ? (f as ClientProject).company : undefined;
  const note = "note" in f ? (f as ClientProject).note : undefined;
  const tags = "tags" in f ? (f as BuildProject).tags : undefined;
  const hasFooter = Boolean(tags?.length || f.url);

  return (
    <TiltCard intensity={4} lift={-6} className="card card-hover card-glow group flex flex-col">
      <article
        className="flex h-full flex-col p-2.5"
        data-flip-id={`card-${f.slug}`}
        data-reveal-item
      >
        {f.video && (
          <div className="mb-3">
            <VideoCard src={f.video} label={f.title} slug={f.slug} />
          </div>
        )}

        <div className="flex flex-1 flex-col px-1 pb-0.5">
          {/* head: title + timeline pill (builds have no timeline, so no pill) */}
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-signal">
              {f.title}
            </h4>
            {timeline && (
              <span className="pill mt-0.5 shrink-0 whitespace-nowrap !text-[10px] tracking-[0.12em]">
                {timelinePill}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-steel">{f.subtitle}</p>

          {/* detail block, anchored to the bottom so stretched cards never
              leave a dead gap below the last line of content */}
          <div className="mt-auto flex flex-col gap-3 pt-4">
            {(role || company) && (
              <div className="flex flex-col gap-1 border-t border-hair pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
                  {role}
                  {company && <span className="text-signal"> · {company}</span>}
                </span>
              </div>
            )}

            {note && (
              <p className="rounded-lg border border-hair bg-panel-2/60 p-3 text-[13px] leading-relaxed text-steel">
                {note}
              </p>
            )}

            {hasFooter && (
              <div className="flex items-end justify-between gap-4">
                {tags?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span key={t} className="tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span />
                )}

                {f.url && (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-pop shrink-0 text-sm"
                  >
                    Open
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

/* =================================================================
   PROCESS
   ================================================================= */
function Process() {
  return (
    <section id="process" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader
          num="06"
          title="Process"
          blurb="The same four stages on every project."
        />

        <div className="section-body card-grid sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <div key={s.num} className="card card-hover card-pad relative flex flex-col gap-2.5" data-reveal-item>
              <span className={`absolute right-4 top-4 h-2 w-2 rounded-full ${accentBgClass[processAccents[i % 4]]}`} />
              <span className="font-mono text-[11px] tracking-[0.2em] text-steel">{s.num}</span>
              <h3 className="font-display text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-steel">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   CONTACT
   ================================================================= */
function Contact() {
  return (
    <section id="contact" className="section px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]" data-reveal>
        <SectionHeader num="07" title="Contact" />

        <div className="section-body card-grid lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col justify-between gap-8" data-reveal-item>
            <h3 className="display-lg balance">
              Available for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-signal">freelance</span>
                <span
                  className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 rounded-sm bg-signal/30"
                  aria-hidden="true"
                />
              </span>{" "}
              work.
            </h3>
            <p className="max-w-xl text-lg leading-relaxed text-steel">
              Design, front-end, mobile, and infrastructure projects. Replies usually land within
              one business day.
            </p>
          </div>

          <div className="card-stack" data-reveal-item>
            <a
              href="mailto:irgifebry2006@gmail.com"
              className="card card-hover card-glow card-pad group flex flex-col gap-2"
              data-magnetic
            >
              <span className="eyebrow text-steel">Email</span>
              <span className="flex items-center justify-between gap-3 break-all font-display text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-signal sm:text-lg">
                irgifebry2006@gmail.com
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
                />
              </span>
            </a>

            <div className="card flex flex-col gap-1 p-1.5">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-panel-2"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-display text-[15px] font-bold tracking-tight">{s.label}</span>
                      <span className="font-mono text-[11px] text-steel">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>

        <footer className="mt-[var(--section-group-gap)] flex flex-col gap-5 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
            © {new Date().getFullYear()} Irgi Febryansyah
          </span>
          <LiveClock />
        </footer>
      </div>
    </section>
  );
}

/* =================================================================
   SHARED
   ================================================================= */
function SectionHeader({
  num,
  title,
  blurb,
}: {
  num: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="index-num">{num}</span>
        <span className="rule flex-1" data-rule />
      </div>

      <h2 className="display-md balance max-w-4xl">{title}</h2>

      {blurb && <p className="max-w-2xl text-base leading-relaxed text-steel">{blurb}</p>}
    </div>
  );
}