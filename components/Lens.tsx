import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/projects";

/**
 * The lens — the page's one live thing.
 *
 * The whole argument of this portfolio is that one person does both halves
 * of the job. This is that claim made operable: two radio buttons and a
 * `:has()` selector switch the capabilities list between the work decided
 * in Figma and the code written to make it real.
 *
 * No useState, no context, no effect, no hydration. Both panels are always
 * in the DOM and CSS decides which one is shown, so the toggle works with
 * JavaScript disabled and cannot fall out of sync with itself. The switch
 * is animated the same way: opacity and transform transitions keyed off
 * the same selectors, staggered down the four rows.
 *
 * Both halves carry real content on purpose. A toggle that merely reshuffled
 * one list would be theatre.
 */
export default function Lens() {
  return (
    <>
      {/* The heading sits ABOVE the control, not below it. A small label
          directly above a heading reads as an eyebrow, and here it would
          also be a control with nowhere to live.

          `section-title`, not `head`: the four capability names below it
          are set at `--text-head`, so a `head` heading here was the same
          size as the rows it introduces and the red field read as one
          undifferentiated block of type. */}
      <h2 className="section-title">What I do</h2>

      <fieldset className="lens mt-[var(--gap-head)]">
        <legend className="sr-only">
          View the capabilities as designer or as engineer
        </legend>

        <input
          className="lens__input"
          type="radio"
          name="lens"
          id="lens-designer"
          defaultChecked
        />
        <input
          className="lens__input"
          type="radio"
          name="lens"
          id="lens-engineer"
        />

        <div className="lens__tabs">
          <label className="lens__tab" htmlFor="lens-designer">
            Designer
          </label>
          <label className="lens__tab" htmlFor="lens-engineer">
            Engineer
          </label>
        </div>

        <div className="lens__panels mt-[var(--gap-block)]">
          {services.map((s) => (
            <div className="capability" key={s.title} data-reveal-item>
              <h3 className="capability__name">{s.title}</h3>

              {/* The proof is the tail of the blurb, in the same
                  sentence and at the same weight. Set as a separate
                  small line it becomes a label sitting directly above
                  the next capability's heading, which is exactly the
                  badge this page is not supposed to have. */}
              <div className="capability__note" data-lens="designer">
                <p>
                  {s.blurb} Shipped as <ProofLink service={s} />.
                </p>
                <BulletList items={s.design} />
              </div>

              <div className="capability__note" data-lens="engineer">
                <p>
                  {s.blurb} Shipped as <ProofLink service={s} />.
                </p>
                <BulletList items={s.build} />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  );
}

function ProofLink({ service }: { service: (typeof services)[number] }) {
  if (!service.proof.url) {
    return <span className="font-bold">{service.proof.label}</span>;
  }
  return (
    <a
      href={service.proof.url}
      target="_blank"
      rel="noreferrer"
      className="arrow-link"
      style={{ color: "inherit" }}
    >
      {service.proof.label}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}

/** Plain lines, not chips. A list of them reads as content; a row of
    chips would read as decoration. */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-1.5">
      {items.map((line) => (
        <li key={line} className="leading-relaxed">
          {line}
        </li>
      ))}
    </ul>
  );
}