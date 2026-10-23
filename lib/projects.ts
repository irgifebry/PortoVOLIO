/* =================================================================
   CONTENT
   -----------------------------------------------------------------
   Every word on the page lives here. The page in app/page.tsx holds
   layout only.
   ================================================================= */

/* ------------------------------------------------------------------
   THE PINNED RUN — four projects that have real footage of themselves.
   Order alternates dark and light captures so each panel reads as a
   new cover rather than another variation of the last one.
   ------------------------------------------------------------------ */

export type Panel = {
  slug: string
  title: string
  /** One line, no punctuation flourish. Sits under the name in the bar. */
  kicker: string
  video: string
  poster: string
  url?: string
  /** Left and right ends of the fixed caption row. */
  role: string
  year: string
  alt: string
}

export const panels: Panel[] = [
  {
    slug: "noblur",
    title: "NoBlur",
    kicker: "Restores the detail a re-encode throws away",
    video: "/videos/NoBlur.mp4",
    poster: "/posters/NoBlur.jpg",
    url: "https://noblurapp.vercel.app/",
    role: "JavaScript, HTML5, CSS",
    year: "2026",
    alt: "The NoBlur interface: a dark workbench with a yellow heading, a settings panel on the left, a drop zone in the centre and a system log on the right.",
  },
  {
    slug: "restaurant-monalisa",
    title: "Monalisa Resto",
    kicker: "Company profile and admin panel for a restaurant",
    video: "/videos/Monalisa.mp4",
    poster: "/posters/Monalisa.jpg",
    url: "https://monalisaresto.site.je/",
    role: "Frontend, UI/UX",
    year: "2026",
    alt: "The Monalisa Resto website: a cream page headed Harmonirasa dan Estetika beside an ornate gold-framed portrait of the Mona Lisa.",
  },
  {
    slug: "instainsight",
    title: "InstaInsight",
    kicker: "Finds who left, entirely on your own machine",
    video: "/videos/InstaInsight.mp4",
    poster: "/posters/InstaInsight.jpg",
    url: "https://instainsight-web.vercel.app/",
    role: "React, TypeScript, Tailwind",
    year: "2026",
    alt: "The InstaInsight interface: a dark navy page headed In Your Circle, with a yellow Desktop tab selected and three numbered steps for scanning Instagram followers.",
  },
  {
    slug: "playshop",
    title: "PlayShop.ID",
    kicker: "Game top-up store with payments and stock",
    video: "/videos/PlayShop.mp4",
    poster: "/posters/PlayShop.jpg",
    url: "https://playshop-id.vercel.app/",
    role: "PHP, MySQL, JavaScript",
    year: "2026",
    alt: "The PlayShop.ID storefront: a row of game cards for Call of Duty Mobile, Free Fire, Genshin Impact, Mobile Legends and PUBG Mobile, each with a green price.",
  },
  {
    slug: "needledrop",
    title: "NeedleDrop",
    kicker: "Drop the needle on one track. Get the whole session.",
    video: "/videos/NeedleDrop.mp4",
    poster: "/posters/NeedleDrop.jpg",
    url: "https://needdrop.vercel.app/",
    role: "Next.js, TypeScript, Tailwind",
    year: "2026",
    alt: "The needledrop interface: a dark page headed DROP THE NEEDLE. GET THE SESSION., with a seed search box and a generated playlist of twenty tracks below.",
  },
]

/* ------------------------------------------------------------------
   THE REST OF THE WORK — no footage, so it gets a different device:
   a typographic index instead of a panel.
   ------------------------------------------------------------------ */

export type IndexProject = {
  slug: string
  title: string
  subtitle: string
  /** Right-hand end of the row. */
  meta: string
  url?: string
}

export const indexProjects: IndexProject[] = [
  {
    slug: "u-cademy-lms",
    title: "U-Cademy LMS",
    subtitle:
      "A hybrid-learning LMS for UIKA: class management, computer-based tests, discussion forums, and certification that issues itself. Wireframes through to interactive prototype, web and Android.",
    meta: "UIKA · 2026",
  },
  {
    slug: "rygent",
    title: "Rygent",
    subtitle:
      "A real-time Linux server monitor for Android. CPU, RAM, disk and network read straight off a box you point it at.",
    meta: "Kotlin, Java",
    url: "https://github.com/irgifebry/rygent",
  },
  {
    slug: "wakesanse",
    title: "WakeSanse",
    subtitle:
      "For a phone whose power button has stopped trusting you. Wake it with a gesture at the sensor instead.",
    meta: "Java, Kotlin",
    url: "https://github.com/irgifebry/wakesanse",
  },
  {
    slug: "hilal-checker",
    title: "Hilal Checker",
    subtitle:
      "Predicts whether the new moon is visible, from astronomy data and a Random Forest model trained on past sightings.",
    meta: "Python, Scikit-Learn",
    url: "https://github.com/irgifebry/stellarium-hilal-checker",
  },
]

/* ------------------------------------------------------------------
   SERVICES — each one carries a project that proves it, rather than
   a row of interchangeable icons.

   The bullet lists are split into the two halves on purpose: `design`
   is what gets decided in Figma, `build` is what gets written to make
   it real. Both are real work, and the page's whole claim is that the
   same pair of hands does both. The lens toggle switches between them,
   so it is showing two true things rather than reshuffling one.
   ------------------------------------------------------------------ */

export type Service = {
  title: string
  blurb: string
  design: string[]
  build: string[]
  proof: { label: string; url?: string }
}

export const services: Service[] = [
  {
    title: "Product & UI Design",
    blurb:
      "Wireframes, interactive prototypes and design systems in Figma, then the implementation. The person who drew it also writes it.",
    design: [
      "Wireframes and user flows",
      "Interactive prototypes",
      "Design systems in Figma",
      "Accessibility and contrast passes",
    ],
    build: [
      "Interface written in HTML and CSS",
      "The design file and the CSS stay in step",
      "Component states built, not implied",
    ],
    proof: { label: "U-Cademy LMS", url: undefined },
  },
  {
    title: "Web Engineering",
    blurb:
      "Front-ends in React and TypeScript, plus the backend, the schema and the payment integration sitting behind them.",
    design: [
      "Page layouts and component specs",
      "Empty, loading, error and full states",
    ],
    build: [
      "React and TypeScript front-ends",
      "Laravel and PHP back-ends",
      "Database schema and migrations",
      "Payment integration",
    ],
    proof: { label: "PlayShop.ID", url: "https://playshop-id.vercel.app/" },
  },
  {
    title: "Mobile Apps",
    blurb:
      "Android and cross-platform apps built end to end. Native Kotlin and Java, or React Native when that suits the job better.",
    design: [
      "Mobile flows and navigation graphs",
      "Touch targets sized for a thumb",
    ],
    build: [
      "Native Android in Kotlin and Java",
      "React Native where it fits",
      "Background services and sensors",
      "Store-ready builds",
    ],
    proof: { label: "Rygent", url: "https://github.com/irgifebry/rygent" },
  },
  {
    title: "Infrastructure & Ops",
    blurb:
      "Linux servers, networking and hardware. The unglamorous half that decides whether any of the above stays up.",
    design: [
      "Monitoring views and log readers",
      "Alert thresholds and what they should say",
    ],
    build: [
      "Linux server administration",
      "Network and routing",
      "Hardware repair and maintenance",
      "Deploys to Vercel and Cloudflare",
    ],
    proof: { label: "The Sahira Hotel", url: undefined },
  },
]

/* ------------------------------------------------------------------
   THE PAGE'S ARGUMENT, as copy
   ------------------------------------------------------------------ */

export const statement =
  "I design the interface and then I build it, deploy it and keep it running. One person, so nothing is lost between the mockup and the thing that ships."

/* The hero is a headline, so it obeys headline rules: two lines or fewer at
   every width. It is the one place the page says what it is, so it is cut
   hard rather than written long. The lines are authored separately because
   the masked reveal needs to know where they break. */
export const headline = ["Design it.", "Then ship it."]

export const aboutParagraph =
  "Most people hand off a design and hope the person building it reads it the same way. Here there is no handoff. The same person draws the screens, writes the React, writes the Android, and sets up the server it runs on. So an interface decision is always one the code can actually support."

export const contactLead =
  "Available for freelance projects and collaboration. Design, front-end, mobile and infrastructure. Replies usually land within a business day."

export const stacks = {
  design: [
    "Figma",
    "Design Systems",
    "Prototyping",
    "HTML / CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
  ],
  infra: [
    "React Native",
    "Android",
    "Kotlin",
    "Java",
    "Laravel",
    "PHP",
    "MySQL",
    "Supabase",
    "Linux",
    "Network Admin",
    "Vercel",
    "Cloudflare",
    "Python",
    "Scikit-Learn",
  ],
}

/* ------------------------------------------------------------------
   THE NUMBERS — every one of these is countable from the content
   above. Nothing here is an estimate or a claim about skill.
   ------------------------------------------------------------------ */

export const figures = {
  shipped: {
    value: panels.length + indexProjects.length,
    label: "projects shipped",
    note: "Five client and personal builds with footage, plus four open-source and client projects listed under Also built.",
  },
  areas: {
    value: services.length,
    label: "service areas",
    note: "Design, web, mobile and infrastructure. All four are shipped by the same person.",
  },
}

/* ------------------------------------------------------------------
   EXPERIENCE
   ------------------------------------------------------------------ */

export const fieldLog = {
  title: "The Sahira Hotel",
  role: "IT & Engineering Intern",
  period: "Dec 2021 — Mar 2022",
  items: [
    "Fixed network and hardware faults around the hotel",
    "Carried the daily operations and maintenance work",
    "Tracked F&B inventory so nothing ran out mid-shift",
  ],
}

/* ------------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------------ */

export const socials = [
  { label: "GitHub", handle: "irgifebry", url: "https://github.com/irgifebry" },
  { label: "Instagram", handle: "irgi.syh", url: "https://www.instagram.com/irgi.syh/" },
  { label: "TikTok", handle: "wymidk0", url: "https://www.tiktok.com/@wymidk0" },
]

export const email = "irgifebry2006@gmail.com"