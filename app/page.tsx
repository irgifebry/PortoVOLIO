import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import TypeLine from "@/components/TypeLine";
import LiveClock from "@/components/LiveClock";
import ScrollTop from "@/components/ScrollTop";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import SignalTrace from "@/components/SignalTrace";
import {
  clientProjects,
  buildProjects,
  moduleProjects,
  socials,
  designStack,
  infraStack,
  fieldLog,
} from "@/lib/projects";

export default function Page() {
  return (
    <>
      <Nav />
      <VideoModal />
      <ScrollTop />

      <main id="top" className="mx-auto max-w-[var(--maxw)] px-5 pb-24 pt-24">
        <Hero />
        <Profile />
        <Capabilities />
        <FieldLog />
        <Delivered />
        <Contact />
      </main>
    </>
  );
}

function SectionDivider({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="section-divider">
      <p className="label">{kicker}</p>
      <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <span className="rule" aria-hidden="true" />
    </Reveal>
  );
}

function Hero() {
  return (
    <section
      id="main"
      className="flex min-h-[80vh] flex-col justify-center py-12"
    >
      <Reveal>
        <p className="label mb-6 flex items-center gap-2">
          <span className="blink inline-block h-2 w-2 rounded-full bg-[var(--color-amber)]" />
          designer &amp; engineer — currently online
        </p>
        <h1 className="font-[var(--font-display)] text-[clamp(3rem,11vw,7rem)] font-bold leading-[0.92] tracking-tight">
          Irgi
          <br />
          Febryansyah
        </h1>
        <div className="mt-8">
          <SignalTrace />
        </div>
      </Reveal>
      <Reveal delay className="mt-10 max-w-xl">
        <p className="font-[var(--font-display)] text-lg text-[var(--color-dim)] sm:text-xl">
          Designs the surface, builds the substrate — one route from interface
          to infrastructure.
        </p>
        <div className="mt-6">
          <TypeLine text="designs screens · builds systems · keeps them running" />
        </div>
        <p className="mt-6 font-[var(--font-mono)] text-xs text-[var(--color-dim)]">
          local time <LiveClock /> · based in indonesia · wib (utc+7)
        </p>
      </Reveal>
    </section>
  );
}

function Profile() {
  return (
    <section id="profile" className="py-16">
      <SectionDivider kicker="profile" title="Who I am" />
      <Reveal className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          <p>
            I work at the seam between design and engineering. I shape interfaces
            in Figma, then build them in React, React Native, and Android — and
            when the product ships, I&apos;m the one who keeps the servers,
            networks, and hardware underneath it alive.
          </p>
          <p className="text-[var(--color-dim)]">
            Most people pick one side. I picked the route through all of them,
            because the best interface is the one whose foundation doesn&apos;t
            fall over at 2 a.m.
          </p>
        </div>
        <div className="module">
          <p className="label mb-4">on the route</p>
          <div className="spec-row">
            <span className="spec-key">design</span>
            <span className="spec-val">UI/UX, prototypes, design systems</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">build</span>
            <span className="spec-val">Web, Android, React Native apps</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">infra</span>
            <span className="spec-val">Networks, Linux, hardware, ops</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">also</span>
            <span className="spec-val">Python &amp; ML side experiments</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="py-16">
      <SectionDivider kicker="stack" title="What I work with" />
      <Reveal className="grid gap-6 md:grid-cols-2">
        <StackBlock title="Design &amp; build" items={designStack} />
        <StackBlock title="Infra &amp; operations" items={infraStack} />
      </Reveal>
    </section>
  );
}

function StackBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="module">
      <p className="label mb-5">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FieldLog() {
  return (
    <section id="fieldlog" className="py-16">
      <SectionDivider kicker="field log" title="On the ground" />
      <Reveal className="module">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-[var(--font-display)] text-2xl font-semibold">
            {fieldLog.title}
          </h3>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-amber)]">
            {fieldLog.role.toUpperCase()}
          </span>
        </div>
        <p className="mt-1 font-[var(--font-mono)] text-xs text-[var(--color-dim)]">
          {fieldLog.period}
        </p>
        <ul className="mt-6 space-y-3">
          {fieldLog.items.map((it) => (
            <li key={it} className="flex gap-3 text-[var(--color-dim)]">
              <i
                className="ph ph-arrow-right mt-1 text-[var(--color-teal)]"
                aria-hidden="true"
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Delivered() {
  return (
    <section id="delivered" className="py-16">
      <SectionDivider kicker="delivered" title="The work" />
      <div className="space-y-16">
        <WorkGroup title="Client work" hint="design-led, shipped">
          <div className="grid gap-5 md:grid-cols-2">
            {clientProjects.map((p) => (
              <Reveal
                key={p.slug}
                className="module"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-[var(--font-display)] text-xl font-semibold">
                    {p.title}
                  </h3>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-[var(--color-teal)] transition hover:text-[var(--color-amber)]"
                      aria-label={`Open ${p.title}`}
                    >
                      <i className="ph ph-arrow-up-right text-lg" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="mt-2 text-[var(--color-dim)]">{p.subtitle}</p>
                <div className="mt-5">
                  {p.role && (
                    <div className="spec-row">
                      <span className="spec-key">role</span>
                      <span className="spec-val">{p.role}</span>
                    </div>
                  )}
                  {p.client && (
                    <div className="spec-row">
                      <span className="spec-key">client</span>
                      <span className="spec-val">{p.client}</span>
                    </div>
                  )}
                  {p.company && (
                    <div className="spec-row">
                      <span className="spec-key">company</span>
                      <span className="spec-val">{p.company}</span>
                    </div>
                  )}
                  <div className="spec-row">
                    <span className="spec-key">timeline</span>
                    <span className="spec-val">{p.timeline}</span>
                  </div>
                </div>
                {p.note && (
                  <p className="mt-4 border-l-2 border-[var(--color-amber)] pl-3 text-sm text-[var(--color-dim)]">
                    {p.note}
                  </p>
                )}
                {p.video && (
                  <div className="mt-5">
                    <VideoCard src={p.video} label={p.title} />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </WorkGroup>

        <WorkGroup title="Builds" hint="things I made and shipped">
          <Reveal className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {buildProjects.map((p) => (
              <article key={p.slug} className="module flex flex-col">
                <div className="aspect-[16/10]">
                  {p.video && <VideoCard src={p.video} label={p.title} />}
                </div>
                <h3 className="mt-4 font-[var(--font-display)] text-lg font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-dim)]">
                  {p.subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--color-teal)] transition hover:text-[var(--color-amber)]"
                  >
                    Visit <i className="ph ph-arrow-up-right" aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </Reveal>
        </WorkGroup>

        <WorkGroup title="Modules" hint="experiments &amp; open source">
          <Reveal className="stagger grid gap-4 sm:grid-cols-3">
            {moduleProjects.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group module transition hover:border-[var(--color-teal)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold">
                    {p.title}
                  </h3>
                  <i
                    className="ph ph-arrow-up-right text-[var(--color-dim)] transition group-hover:text-[var(--color-amber)]"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--color-dim)]">
                  {p.subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </Reveal>
        </WorkGroup>
      </div>
    </section>
  );
}

function WorkGroup({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-baseline gap-3">
        <h3 className="font-[var(--font-display)] text-xl font-semibold">
          {title}
        </h3>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-dim)]">
          / {hint}
        </span>
      </div>
      {children}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16">
      <SectionDivider kicker="contact" title="Let's build the route" />
      <Reveal className="module">
        <p className="font-[var(--font-display)] text-2xl font-medium sm:text-3xl">
          Got a surface to design or a substrate to keep standing?
        </p>
        <a
          href="mailto:irgifebry2006@gmail.com"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-5 py-2.5 font-[var(--font-mono)] text-sm font-medium text-[var(--color-panel)] transition hover:opacity-90"
        >
          <i className="ph ph-envelope-simple" aria-hidden="true" /> Email me
        </a>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-[var(--color-dim)] transition hover:text-[var(--color-text)]"
            >
              <i
                className={`ph ph-${
                  s.label === "GitHub"
                    ? "github-logo"
                    : s.label === "Instagram"
                    ? "instagram-logo"
                    : s.label === "TikTok"
                    ? "tiktok-logo"
                    : "envelope-simple"
                }`}
                aria-hidden="true"
              />
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-dim)]">
                {s.label}
              </span>
              <span>{s.handle}</span>
            </a>
          ))}
        </div>
      </Reveal>
      <p className="mt-10 text-center font-[var(--font-mono)] text-xs text-[var(--color-dim)]">
        © {new Date().getFullYear()} irgi febryansyah — drawn from interface to
        infrastructure.
      </p>
    </section>
  );
}
