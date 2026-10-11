export type Tag = { label: string }

export type ClientProject = {
  slug: string
  title: string
  subtitle: string
  role: string
  timeline: string
  client?: string
  company?: string
  note?: string
  video?: string
  url?: string
}

export type BuildProject = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  video?: string
  url?: string
}

export type ModuleProject = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  url: string
}

export const clientProjects: ClientProject[] = [
  {
    slug: "u-cademy-lms",
    title: "U-Cademy LMS",
    subtitle: "LMS for UIKA — class management, CBT, discussion forums, and automatic certification",
    role: "UI/UX Design (Web)",
    timeline: "Feb — Jul 2026",
    client: "UIKA",
    company: "PT Unosoft",
    note: "Designed the UI/UX for a hybrid-learning LMS (web + Android). Wireframes through to interactive prototypes.",
  },
  {
    slug: "restaurant-monalisa",
    title: "Restaurant Monalisa",
    subtitle: "Company profile + admin panel for a restaurant",
    role: "Frontend & UI/UX",
    timeline: "Apr — Jun 2026",
    client: "Restaurant Monalisa",
    video: "/videos/Monalisa.mp4",
    url: "https://monalisaresto.site.je/",
  },
]

export const buildProjects: BuildProject[] = [
  {
    slug: "instainsight",
    title: "InstaInsight",
    subtitle: "Instagram unfollower tracker. Runs entirely client-side; no password required.",
    tags: ["React", "TypeScript", "Tailwind"],
    video: "/videos/InstaInsight.mp4",
    url: "https://instainsight-web.vercel.app/",
  },
  {
    slug: "noblur",
    title: "NoBlur",
    subtitle: "Removes compression blur from TikTok videos by patching MP4/MOV headers in the browser.",
    tags: ["JavaScript", "HTML5", "CSS"],
    video: "/videos/NoBlur.mp4",
    url: "https://noblurapp.vercel.app/",
  },
  {
    slug: "playshop",
    title: "PlayShop.ID",
    subtitle: "Game top-up store with payments and stock management.",
    tags: ["PHP", "MySQL", "JavaScript"],
    video: "/videos/PlayShop.mp4",
    url: "https://playshop-id.vercel.app/",
  },
]

export const moduleProjects: ModuleProject[] = [
  {
    slug: "rygent",
    title: "Rygent",
    subtitle: "Real-time Linux server monitor for Android. CPU, RAM, disk, and network.",
    tags: ["Kotlin", "Java", "Android"],
    url: "https://github.com/irgifebry/rygent",
  },
  {
    slug: "wakesanse",
    title: "WakeSanse",
    subtitle: "Workaround for broken phone power buttons, using sensor gestures.",
    tags: ["Java", "Kotlin", "Android"],
    url: "https://github.com/irgifebry/wakesanse",
  },
  {
    slug: "hilal-checker",
    title: "Hilal Checker",
    subtitle: "Moon crescent visibility prediction using Random Forest and astronomy data.",
    tags: ["Python", "NumPy", "Scikit-Learn"],
    url: "https://github.com/irgifebry/stellarium-hilal-checker",
  },
]

export const socials = [
  { label: "GitHub", handle: "/irgifebry", url: "https://github.com/irgifebry" },
  { label: "Instagram", handle: "/irgi.syh", url: "https://www.instagram.com/irgi.syh/" },
  { label: "TikTok", handle: "/@wymidk0", url: "https://www.tiktok.com/@wymidk0" },
  { label: "Email", handle: "direct", url: "mailto:irgifebry2006@gmail.com" },
]

export const designStack = [
  "Figma", "HTML / CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "React Native", "Android", "Laravel", "MySQL", "Supabase",
  "Python", "Scikit-Learn", "Git",
]

export const infraStack = [
  "Network Admin", "Hardware", "System Maintenance", "Linux",
  "Vercel", "Cloudflare",
]

export const fieldLog = {
  title: "The Sahira Hotel",
  role: "IT & Engineering Intern",
  period: "Dec 2021 — Mar 2022",
  items: [
    "Fixed network & hardware issues around the hotel",
    "Helped the team with daily ops and maintenance",
    "Tracked F&B inventory so nothing ran out",
  ],
}

/* ------------------------------------------------------------------
   Agency-flavoured content, derived from the same facts above.
   ------------------------------------------------------------------ */

export const services: {
  num: string
  title: string
  blurb: string
  stack: string[]
  accent: "signal" | "pop" | "grape" | "aqua"
}[] = [
  {
    num: "01",
    title: "Product & UI Design",
    blurb:
      "Wireframes, interactive prototypes, and design systems in Figma. Implementation in HTML and CSS.",
    stack: ["Figma", "Design Systems", "Prototyping", "HTML / CSS"],
    accent: "signal",
  },
  {
    num: "02",
    title: "Web Engineering",
    blurb:
      "Front-ends in React and TypeScript, plus the backend, database schema, and payment integration behind them.",
    stack: ["React", "TypeScript", "Laravel", "MySQL"],
    accent: "pop",
  },
  {
    num: "03",
    title: "Mobile Apps",
    blurb:
      "Android and cross-platform apps built end to end. Native Kotlin and Java, or React Native when it fits the project.",
    stack: ["Kotlin", "Java", "React Native", "Android"],
    accent: "grape",
  },
  {
    num: "04",
    title: "Infra & Ops",
    blurb:
      "Linux servers, networking, hardware, and ongoing system maintenance to keep deployments available.",
    stack: ["Linux", "Network Admin", "Hardware", "System Maintenance"],
    accent: "aqua",
  },
]

export const processSteps: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Talk",
    body: "You describe the problem. I ask questions until the requirements are clear.",
  },
  {
    num: "02",
    title: "Draft",
    body: "Sketches, wireframes, and an agreed direction before any production code is written.",
  },
  {
    num: "03",
    title: "Build",
    body: "The design is implemented as real code. One person owns both, so there is no gap between mockup and shipped product.",
  },
  {
    num: "04",
    title: "Ship & Tune",
    body: "Deploy, monitor real usage, and fix what comes up in production.",
  },
]

export const marqueeWords = [
  "UI/UX DESIGN",
  "REACT",
  "TYPESCRIPT",
  "REACT NATIVE",
  "ANDROID",
  "KOTLIN",
  "FIGMA",
  "LARAVEL",
  "MYSQL",
  "LINUX",
  "PYTHON",
  "FRONT-END",
  "BACK-END",
]

export const accentClass = {
  signal: "text-signal",
  pop: "text-pop",
  grape: "text-grape",
  aqua: "text-aqua",
} as const

export const accentBgClass = {
  signal: "bg-signal",
  pop: "bg-pop",
  grape: "bg-grape",
  aqua: "bg-aqua",
} as const
