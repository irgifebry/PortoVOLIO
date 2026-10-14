"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import PanelVideo from "@/components/PanelVideo";
import { panels, type Panel, headline } from "@/lib/projects";

/**
 * The signature move: the name holds its place for two project panels while
 * their footage passes underneath it. Remaining footage then flows normally.
 *
 * Built with `position: sticky` — ordinary scrolling does the work, nothing
 * is hijacked. The masthead is an opaque block of ground colour, so the name
 * never loses contrast and no panel can pass over the words.
 *
 * The sticky bar is in normal flow, so the first screen is the name with
 * panel one fully visible underneath it, and the panels after that slide
 * under the name as you scroll.
 */
export default function PinnedPoster() {
  const [active, setActive] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const pinnedCount = 2;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = panelRefs.current.indexOf(entry.target as HTMLElement);
          if (i >= 0 && entry.isIntersecting) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current: Panel = panels[active] ?? panels[0];

  return (
    <section id="work" aria-label="Selected work">
      {/* No height here on purpose. The bar is in flow (see `.poster-bar`),
          so the run is exactly as tall as the masthead plus the panels —
          measuring it in JS would only add a second number to keep in
          step with the type. */}
      <div className="poster-run poster-run--pinned">
        <div className="poster-bar">
          <div className="poster-masthead px-[var(--margin)]">
            <div className="shell px-0">
              {/* NOTE: no `js-lines` class here. That class belongs on
                  <html> alone -- app/globals.css scopes it as
                  `html.js-lines`, and a bare `.js-lines` descendant
                  selector matches ANY ancestor carrying the name. An
                  earlier draft put it on this heading, which parked the
                  hero below its own mask whenever the reveal did not
                  run. Scoping it to the root element makes that
                  impossible to repeat by accident. */}
              <h1 className="display">
                {/* The hero's one loud moment: each authored line rises
                    from behind its own baseline. The line breaks are set
                    in content, not left to the browser, because the
                    reveal needs to know where they are. */}
                <span className="masked-line">
                  <span className="masked-line__in" data-hero-line>
                    Irgi Febryansyah
                  </span>
                </span>
              </h1>

              {/* Left and right on ONE baseline, authored as a single
                  mask per side. As two separate masked lines inside a
                  flex row they both animated from the same top and the
                  staggered timing made them visibly land apart. */}
              <div className="mt-3 flex items-baseline justify-between gap-x-8">
                <p className="lead masked-line" aria-hidden="true">
                  <span className="masked-line__in" data-hero-line>
                    {headline[0]}
                  </span>
                </p>
                <p className="lead masked-line" aria-hidden="true">
                  <span className="masked-line__in" data-hero-line>
                    {headline[1]}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                <p className="text-muted">
                  UI/UX designer &amp; full-stack engineer, Indonesia
                </p>
                <p aria-live="polite">
                  <span className="font-bold">{current.title}</span>
                  <span className="text-muted">: {current.kicker}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {panels.slice(0, pinnedCount).map((p, i) => (
          <PanelFrame
            key={p.slug}
            panel={p}
            active={i === active}
            setRef={(el) => { panelRefs.current[i] = el; }}
          />
        ))}
      </div>

      <section className={`poster-more${moreOpen ? " is-open" : ""}`}>
        <button
          type="button"
          className="poster-more__summary px-[var(--margin)]"
          aria-expanded={moreOpen}
          aria-controls="more-work-panels"
          onClick={() => setMoreOpen((open) => !open)}
        >
          {/* The lead-in is here for a reason beyond reading well: the
              caption of the panel above ends with a small meta line, and
              with nothing between them that line sits directly above this
              heading and reads as an eyebrow label on it. A sentence in
              between is both better copy and a real structural fix. */}
          <span className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-2 px-0">
            <span>
              <span className="measure block leading-relaxed text-muted">
                Two more with footage of themselves. The four above are the
                ones a visitor should see first.
              </span>
              <span className="head mt-3 block">More work</span>
            </span>
            <ChevronDown className="poster-more__icon" aria-hidden="true" />
          </span>
        </button>
        <div id="more-work-panels" className="poster-more__content" aria-hidden={!moreOpen} inert={!moreOpen}>
          <div className="poster-more__inner">
            {panels.slice(pinnedCount).map((p, offset) => (
              <div key={p.slug} className="poster-run poster-run--flow">
                <PanelFrame
                  panel={p}
                  active={moreOpen && pinnedCount + offset === active}
                  setRef={(el) => { panelRefs.current[pinnedCount + offset] = el; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

function PanelFrame({
  panel: p,
  active,
  setRef,
}: {
  panel: Panel
  active: boolean
  setRef: (el: HTMLElement | null) => void
}) {
  return (
    <div ref={setRef} className="poster-panel">
      <div className="poster-frame">
        <PanelVideo src={p.video} poster={p.poster} alt={p.alt} active={active} />
      </div>
      <div className="poster-caption px-[var(--margin)]">
        <div className="shell flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-0">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
            {/* The title IS the link. A separate "Visit" button in the
                corner of every panel reads as a badge stacked above the
                next heading, and the project name is already the obvious
                thing to click.

                Year and role are one text run for the same reason: a
                standalone "2026" above the next heading is an index
                number wearing a badge. */}
            {p.url ? (
              <h2 className="h3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  aria-label={`${p.title} (opens in a new tab)`}
                >
                  {p.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </h2>
            ) : (
              <h2 className="h3">{p.title}</h2>
            )}

            <span className="text-muted">
              <span className="tnum">{p.year}</span> &middot; {p.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
