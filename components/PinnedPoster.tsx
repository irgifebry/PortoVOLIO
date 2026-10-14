"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import PanelVideo from "@/components/PanelVideo";
import { panels, type Panel } from "@/lib/projects";

/**
 * The signature move: the name holds its place for two project panels while
 * their footage passes underneath it. Remaining footage then flows normally.
 *
 * Built with `position: sticky` — ordinary scrolling does the work, nothing
 * is hijacked. The masthead is an opaque block of ground colour, so the name
 * never loses contrast and no panel can pass over the words.
 *
 * The sticky layer is zero-height on purpose: panels start at the top of the
 * run and slide underneath it, so the first screen is already name-over-video.
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
      <div
        className="poster-run poster-run--pinned poster-run--brief"
        style={{ height: `calc(${pinnedCount} * var(--panel-h) + ((${pinnedCount} - 1) * var(--panel-gap)))` }}
      >
        <div className="poster-bar">
          <div className="poster-masthead px-[var(--margin)]">
            <div className="shell px-0">
              <h1 className="display balance">Irgi Febryansyah</h1>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                <p className="text-muted">
                  UI/UX designer &amp; full-stack engineer, Indonesia
                </p>
                <p aria-live="polite">
                  <span className="font-semibold">{current.title}</span>
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
          <span className="shell flex items-center justify-between px-0">
            <span className="head">More work</span>
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
      <PanelVideo src={p.video} poster={p.poster} alt={p.alt} active={active} />
      <div className="poster-caption px-[var(--margin)]">
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-0">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <span className="tnum text-muted">{p.year}</span>
            <h2 className="panel-type font-display font-normal uppercase leading-none tracking-tight">{p.title}</h2>
            <span className="text-muted">{p.role}</span>
          </div>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="poster-visit group"
              aria-label={`Visit ${p.title} (opens in a new tab)`}
            >
              Visit
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
