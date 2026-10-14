"use client";

import {
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/**
 * A disclosure that moves in BOTH directions.
 *
 * The index bars used to be a `<details>`, and a `<details>` cannot animate
 * shut: the browser drops the whole content slot out of the render tree the
 * instant `open` comes off, so a transition declared on the panel is never
 * seen on the way out. It opened like a card being dealt and closed like a
 * light being switched off.
 *
 * So the attribute is ours to drive. The panel stays in the tree and its
 * height is collapsed with a `0fr` grid row, which is a real, animatable
 * track size for a height the browser cannot know in advance — and it holds
 * for the closing move as well.
 *
 * Same contract as `.poster-more` on purpose: the row's height is the only
 * thing that changes size, and the text inside lifts into place as it grows.
 *
 * NOT named `collapse`, and its root class is not `collapse` either: that is
 * a Tailwind utility for `visibility: collapse`, which silently made every
 * bar on the page invisible while leaving it fully laid out and readable to
 * the DOM. Only rename this if you check the utility does not exist.
 */
export default function Disclosure({
  summary,
  children,
  className = "",
  ...rest
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`disclosure ${className}${open ? " is-open" : ""}`} {...rest}>
      <button
        type="button"
        className="disclosure__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {summary}
      </button>

      {/* Kept mounted on purpose — see the note above. `inert` takes the
          closed panel's link out of the tab order without removing it from
          the render tree, so the closing move still plays. */}
      <div
        id={panelId}
        className="disclosure__panel"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="disclosure__panel-inner">{children}</div>
      </div>
    </div>
  );
}