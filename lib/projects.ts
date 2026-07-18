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
    role: "UI/UX Web Designer",
    timeline: "Feb — Jul 2026",
    client: "UIKA",
    company: "PT Unosoft",
    note: "UI/UX for web and Android LMS — hybrid learning. From wireframes to prototypes, aligned with the Islamic campus identity.",
  },
  {
    slug: "restaurant-monalisa",
    title: "Restaurant Monalisa",
    subtitle: "Company profile and admin panel for a restaurant",
    role: "Frontend and UI/UX",
    timeline: "Apr — Jun 2026",
    client: "Restaurant Monalisa",
    url: "https://monalisaresto.site.je/",
  },
]

export const buildProjects: BuildProject[] = [
  {
    slug: "instainsight",
    title: "InstaInsight",
    subtitle: "Check who unfollowed you on IG — no password needed, just data.",
    tags: ["React", "TypeScript", "Tailwind"],
    video: "/videos/InstaInsight.mp4",
    url: "https://instainsight-web.vercel.app/",
  },
  {
    slug: "noblur",
    title: "NoBlur",
    subtitle: "Fix TikTok compression blur — patches MP4/MOV headers locally, in-browser.",
    tags: ["JavaScript", "HTML5", "CSS"],
    video: "/videos/NoBlur.mp4",
    url: "https://noblurapp.vercel.app/",
  },
  {
    slug: "playshop",
    title: "PlayShop.ID",
    subtitle: "Game top-up store — payments, stock management, the works.",
    tags: ["PHP", "MySQL", "JavaScript"],
    video: "/videos/PlayShop.mp4",
    url: "https://playshop-id.vercel.app/",
  },
]

export const moduleProjects: ModuleProject[] = [
  {
    slug: "rygent",
    title: "Rygent",
    subtitle: "Real-time Linux server monitor from your phone — CPU, RAM, disk, network.",
    tags: ["Kotlin", "Java", "Android"],
    url: "https://github.com/irgifebry/rygent",
  },
  {
    slug: "wakesanse",
    title: "WakeSanse",
    subtitle: "Workaround for broken buttons — uses sensor gestures instead.",
    tags: ["Java", "Kotlin", "Android"],
    url: "https://github.com/irgifebry/wakesanse",
  },
  {
    slug: "hilal-checker",
    title: "Hilal Checker",
    subtitle: "Predicts moon crescent visibility — ML (Random Forest) + astronomy data.",
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
  role: "Engineering and IT Intern",
  period: "Dec 2021 — Mar 2022",
  items: [
    "Diagnosed and repaired network and hardware issues",
    "Supported team operations and maintenance",
    "Managed F&B department inventory tracking",
  ],
}
