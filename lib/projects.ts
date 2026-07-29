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
    subtitle: "LMS for UIKA — class management, CBT, discussion forums, auto certification",
    role: "UI/UX Design (Web)",
    timeline: "Feb — Jul 2026",
    client: "UIKA",
    company: "PT Unosoft",
    note: "Designed the UI/UX for a hybrid-learning LMS (web + Android). Wireframes to prototypes, keeping the Islamic campus vibe.",
  },
  {
    slug: "restaurant-monalisa",
    title: "Restaurant Monalisa",
    subtitle: "Company profile + admin panel for a restaurant",
    role: "Frontend & UI/UX",
    timeline: "Apr — Jun 2026",
    client: "Restaurant Monalisa",
    url: "https://monalisaresto.site.je/",
  },
]

export const buildProjects: BuildProject[] = [
  {
    slug: "instainsight",
    title: "InstaInsight",
    subtitle: "See who unfollowed you on IG. No password, just your data.",
    tags: ["React", "TypeScript", "Tailwind"],
    video: "/videos/InstaInsight.mp4",
    url: "https://instainsight-web.vercel.app/",
  },
  {
    slug: "noblur",
    title: "NoBlur",
    subtitle: "Fixes TikTok's compression blur. Patches MP4/MOV headers in your browser.",
    tags: ["JavaScript", "HTML5", "CSS"],
    video: "/videos/NoBlur.mp4",
    url: "https://noblurapp.vercel.app/",
  },
  {
    slug: "playshop",
    title: "PlayShop.ID",
    subtitle: "Game top-up store. Payments, stock, the whole deal.",
    tags: ["PHP", "MySQL", "JavaScript"],
    video: "/videos/PlayShop.mp4",
    url: "https://playshop-id.vercel.app/",
  },
]

export const moduleProjects: ModuleProject[] = [
  {
    slug: "rygent",
    title: "Rygent",
    subtitle: "Real-time Linux server monitor on your phone. CPU, RAM, disk, network.",
    tags: ["Kotlin", "Java", "Android"],
    url: "https://github.com/irgifebry/rygent",
  },
  {
    slug: "wakesanse",
    title: "WakeSanse",
    subtitle: "Workaround for broken phone buttons — uses sensor gestures.",
    tags: ["Java", "Kotlin", "Android"],
    url: "https://github.com/irgifebry/wakesanse",
  },
  {
    slug: "hilal-checker",
    title: "Hilal Checker",
    subtitle: "Predicts moon crescent visibility using ML (Random Forest) + astronomy data.",
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
  "Figma", "HTML / CSS", "JavaScript", "React", "React Native", "Android",
  "Laravel", "MySQL", "Python", "Scikit-Learn", "Git",
]

export const infraStack = [
  "Network Admin", "Hardware", "System Maintenance", "Linux",
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
