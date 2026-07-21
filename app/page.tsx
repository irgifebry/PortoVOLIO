"use client";

import { useRef } from "react";
import { ArrowUpRight, Mail, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Nav from "@/components/Nav";
import LiveClock from "@/components/LiveClock";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import Typewriter from "@/components/Typewriter";
import {
  clientProjects,
  buildProjects,
  moduleProjects,
  socials,
  designStack,
  infraStack,
  fieldLog,
} from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const totalProjects =
  clientProjects.length + buildProjects.length + moduleProjects.length;
const stackLayers = designStack.length + infraStack.length;

export default function Page() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    sections.forEach((section) => {
      const children = section.querySelectorAll(".reveal-item");
      if (children.length > 0) {
        gsap.from(children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
      }
    });

    const counters = gsap.utils.toArray<HTMLElement>(".count-up");
    counters.forEach((el) => {
      const target = Number(el.dataset.value);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.2,
        ease: "power1.out",
        delay: 0.2,
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });
  }, { scope: mainRef });

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <VideoModal />

      <main ref={mainRef} id="main" className="w-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-6 min-h-[100dvh] flex flex-col justify-center max-w-6xl mx-auto py-12 md:px-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <div className="absolute inset-y-0 left-6 right-6 border-l border-r border-dashed border-hair" />
        <div className="absolute inset-x-0 top-12 bottom-12 border-t border-b border-dashed border-hair" />
      </div>

      <div className="reveal-section flex flex-col gap-10 relative z-10">
        <div className="reveal-item flex items-center gap-4 select-none">
          <span className="font-mono text-[9px] uppercase tracking-widest text-signal font-semibold">Designer / Engineer</span>
          <div className="h-px flex-1 border-t border-dashed border-signal/20 hidden sm:block" />
        </div>

        <div className="reveal-item relative border border-dashed border-hair/20 p-6 md:p-8">
          <span className="absolute -top-2 left-3 font-mono text-[8px] uppercase tracking-wider text-steel bg-canvas px-1.5 select-none">H1 &middot; Display</span>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-none text-ink">
            Irgi Febryansyah
          </h1>
          <span className="absolute -bottom-2 right-3 font-mono text-[8px] uppercase tracking-wider text-signal bg-canvas px-1.5 select-none">W: 100%</span>
        </div>

        <div className="reveal-item relative border-l border-dashed border-signal/30 pl-6 py-2">
          <span className="absolute -top-2 left-6 font-mono text-[8px] uppercase tracking-wider text-signal bg-canvas px-1.5 select-none">Bio &middot; Text</span>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-ink/70 leading-relaxed max-w-3xl">
            <Typewriter
              phrases={[
                "I shape interfaces in Figma, build them in React, and architect the networks and servers underneath.",
                "A full-stack designer and engineer with a passion for clean interfaces and solid infrastructure.",
                "Bridging design and engineering — from pixel-perfect UI to resilient server architecture.",
                "Designer by trade, engineer at heart. Turning complex problems into seamless experiences.",
              ]}
            />
          </p>
        </div>

        <div className="reveal-item flex flex-col gap-8 md:flex-row md:items-center md:justify-between items-center justify-center pt-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:irgifebry2006@gmail.com" className="btn-signal">
              <Mail size={18} aria-hidden="true" />
              Start a project
            </a>
            <a href="#work" className="link-signal px-2 py-3">
              Explore projects <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="flex gap-10 font-mono text-xs text-steel select-none justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-ink font-semibold text-lg flex items-center gap-1">
                <span className="text-signal">[</span>
                <span className="count-up" data-value={totalProjects}>0</span>
                <span className="text-signal">]</span>
              </div>
              <div className="text-[10px] text-steel uppercase tracking-wider mt-1">Projects Built</div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-ink font-semibold text-lg flex items-center gap-1">
                <span className="text-signal">[</span>
                <span className="count-up" data-value={stackLayers}>0</span>
                <span className="text-signal">]</span>
              </div>
              <div className="text-[10px] text-steel uppercase tracking-wider mt-1">Stack Layers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 pt-32 pb-24 md:px-10 md:py-32 border-t border-hair">
      <div className="mx-auto max-w-6xl">
        <div className="reveal-section grid gap-12 lg:grid-cols-[250px_1fr]">
          <div>
            <h2 className="font-display text-4xl italic text-ink">About</h2>
            <p className="mt-2 font-mono text-[11px] text-steel uppercase tracking-wider">The philosophy</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="reveal-item space-y-6 text-lg leading-relaxed text-ink/70">
              <p>
                I work at the intersection of design and engineering. I shape
                interfaces in Figma, then build them in React, React Native, and
                Android — and when the product ships, I keep the servers,
                networks, and hardware underneath it running.
              </p>
              <p className="text-steel">
                Most people pick one side. I chose to understand the full picture,
                because the best interface is one whose foundation does not fall
                over at 2 a.m.
              </p>
            </div>

            <div className="reveal-item space-y-8">
              <div>
                <p className="font-mono text-[10px] text-steel uppercase tracking-wider mb-3">Design &amp; build</p>
                <div className="flex flex-wrap gap-2">
                  {designStack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] text-steel uppercase tracking-wider mb-3">Infrastructure</p>
                <div className="flex flex-wrap gap-2">
                  {infraStack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-6 pt-32 pb-24 md:px-10 md:py-32 border-t border-hair">
      <div className="mx-auto max-w-6xl">
        <div className="reveal-section grid gap-12 lg:grid-cols-[250px_1fr]">
          <div>
            <h2 className="font-display text-4xl italic text-ink">Experience</h2>
            <p className="mt-2 font-mono text-[11px] text-steel uppercase tracking-wider">The path</p>
          </div>
          <div className="w-full reveal-item">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 border-b border-hair pb-4">
              <div>
                <h3 className="font-display text-3xl font-normal text-ink">{fieldLog.title}</h3>
                <p className="text-lg text-steel">{fieldLog.role}</p>
              </div>
              <span className="font-mono text-xs text-signal border border-hair px-3 py-1 rounded-full">{fieldLog.period}</span>
            </div>
            <ul className="mt-6 space-y-4">
              {fieldLog.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/70">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="px-6 pt-32 pb-24 md:px-10 md:py-32 border-t border-hair">
      <div className="mx-auto max-w-6xl">
        <div className="reveal-section grid gap-12 lg:grid-cols-[250px_1fr] items-start">
          <div className="lg:sticky lg:top-24 h-fit">
            <h2 className="font-display text-4xl italic text-ink">Work</h2>
            <p className="mt-2 font-mono text-[11px] text-steel uppercase tracking-wider">The outputs</p>
            <p className="mt-4 max-w-[180px] text-xs text-steel leading-relaxed">
              Curated solutions across client projects, personal systems, and open source modules.
            </p>
          </div>

          <div className="space-y-20">
            <Group title="Client work" projects={clientProjects} kind="client" />
            <Group title="Personal builds" projects={buildProjects} kind="build" />
            <Group title="Open source" projects={moduleProjects} kind="module" />
          </div>
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
  projects: any[];
  kind: "client" | "build" | "module";
}) {
  return (
    <div className="reveal-section">
      <p className="font-mono text-xs text-steel uppercase tracking-widest mb-6 border-b border-hair pb-2">{title}</p>
      <div
        className={
          kind === "client"
            ? "grid gap-8 md:grid-cols-2"
            : kind === "build"
            ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
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
  project: any;
  kind: "client" | "build" | "module";
}) {
  if (kind === "module") {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="node group block"
        data-flip-id={`card-${project.slug}`}
      >
        <h3 className="mb-2 font-display text-2xl font-normal group-hover:text-signal transition-colors text-ink">{project.title}</h3>
        <p className="mb-5 text-sm text-steel leading-relaxed">{project.subtitle}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t: string) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </a>
    );
  }

  return (
    <article className="node flex flex-col justify-between" data-flip-id={`card-${project.slug}`}>
      <div>
        <h3 className="mb-3 font-display text-2xl font-normal text-ink">{project.title}</h3>

        {project.video && (
          <div className="mb-5">
            <VideoCard src={project.video} label={project.title} slug={project.slug} />
          </div>
        )}

        <p className="mb-4 text-sm text-steel leading-relaxed">{project.subtitle}</p>

        {kind === "client" && (
          <div className="mb-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[11px] text-steel border-t border-hair/50 pt-3">
            <span>{project.role}{project.company ? ` · ${project.company}` : ""}</span>
            <span className="text-signal">{project.timeline}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        {project.tags ? (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t: string) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        ) : (
          <div />
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="link-signal"
          >
            Open <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 pt-32 pb-24 md:px-10 md:py-32 border-t border-hair max-w-6xl mx-auto w-full">
      <div className="reveal-section">
        <p className="font-mono text-[11px] text-steel uppercase tracking-widest mb-6">Contact</p>

        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <div>
            <h2 className="reveal-item font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight text-ink">
              Let us build <span className="italic text-steel">something</span> solid.
            </h2>
            <p className="reveal-item mt-6 max-w-lg text-lg text-steel leading-relaxed">
              Have an interface to design, a product to build, or a network to keep running? I would like to hear about it.
            </p>
          </div>

          <div className="reveal-item flex flex-col justify-between">
            <a
              href="mailto:irgifebry2006@gmail.com"
              className="group block border border-hair p-6 hover:border-signal transition-colors bg-panel/60"
            >
              <span className="font-mono text-[10px] text-steel uppercase tracking-wider block mb-2">My email</span>
              <span className="font-display text-2xl sm:text-3xl text-ink group-hover:text-signal transition-colors flex items-center gap-3">
                irgifebry2006@gmail.com
                <ArrowUpRight size={20} className="text-steel group-hover:text-signal transition-colors" />
              </span>
            </a>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-hair pt-6 lg:border-t-0 lg:pt-0 justify-center lg:justify-end">
              {socials.filter(s => s.label !== "Email").map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 text-steel transition-colors hover:text-ink"
                >
                  <span className="font-mono text-xs font-semibold uppercase">{s.label}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-item mt-12 sm:mt-24 flex flex-col gap-4 border-t border-hair pt-8 font-mono text-[11px] text-steel items-center sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Irgi Febryansyah</span>
          <LiveClock />
        </div>
      </div>
    </section>
  );
}
