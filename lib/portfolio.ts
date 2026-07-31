export const profile = {
  name: "Muhamad Habibi Azmi",
  shortName: "Azmi",
  role: "Full Stack Software Engineer",
  tagline:
    "A Full Stack Software Engineer based in Bandung, Indonesia. I craft scalable backends, modern web applications, and AI-enabled platforms used by 40,000+ people.",
  bio: "Full Stack Software Engineer with 7+ years delivering enterprise software, SaaS platforms, and AI-enabled solutions across telecom, healthcare, HR tech, and digital products.",
  location: "Bandung, West Java, Indonesia",
  email: "hello@habibiazmi.com",
  available: true,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/azmibanget/" },
    { label: "GitHub", href: "https://github.com/habibiazmi123" },
  ],
  stats: [
    { value: "7+", label: "Years experience" },
    { value: "40k+", label: "Users managed" },
    { value: "10+", label: "Projects shipped" },
    { value: "3", label: "Industries" },
  ],
} as const

export type ExperienceProject = {
  name: string
  period?: string
  href?: string
}

export type Experience = {
  id: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  tags: string[]
  projects?: ExperienceProject[]
}

export const experiences: Experience[] = [
  {
    id: "telkom",
    company: "Telkom Indonesia",
    role: "Software Engineer",
    period: "Jan 2022 — Present",
    location: "Bandung",
    summary:
      "Building identity, access management, and AI-powered document platforms for the Telkom Group.",
    highlights: [
      "Co-built TGKypas — IAM platform automating access governance, approval workflows, and audit trails across the Telkom Group.",
      "Architected TGSSO (Golang, OAuth 2.0, LDAP) — enterprise SSO securing access for 40,000+ users.",
      "Owned identity services for 30K employees + 10K partner accounts — auth, authz, and account lifecycle.",
      "Shipped RESTful APIs and docs that accelerated integration across internal and partner applications.",
      "Built AI OCR + LLM pipeline to auto-extract metadata from official memorandums and contracts.",
    ],
    tags: ["Golang", "OAuth 2.0", "LDAP", "IAM", "LLMs", "OCR"],
    projects: [
      { name: "TGKypas", period: "2022 — Present" },
      { name: "TGSSO", period: "2022 — Present" },
    ],
  },
  {
    id: "vox",
    company: "VOX Asia / PT Indo Online Mitra Usaha",
    role: "Senior Software Engineer",
    period: "Dec 2023 — May 2024",
    location: "Bandung",
    summary:
      "Delivered SaaS products for European clients across a distributed, DDD-oriented engineering org.",
    highlights: [
      "Delivered SaaS products end-to-end for European clients — analysis, design, dev, deploy, support.",
      "Shipped ELAO features — language assessment automation for universities, recruiters, and enterprises.",
      "Built Leapsy learning platform with personalization, progress tracking, and content management.",
      "Integrated MangoPay payments and AI text-to-speech to extend platform capabilities.",
      "Collaborated with distributed EU teams in a DDD, Agile environment — architecture and code quality.",
    ],
    tags: ["SaaS", "DDD", "MangoPay", "TTS", "APIs", "Agile"],
    projects: [
      {
        name: "Leapsy — Vox Asia (Europe)",
        period: "Jan 2024 — Jun 2024",
      },
      {
        name: "Pan European Game Information (PEGI) — Vox Asia (Europe)",
        period: "Jan 2024 — Jun 2024",
      },
    ],
  },
  {
    id: "cnt-fullstack",
    company: "PT Citra Niaga Teknologi",
    role: "Full-stack Developer",
    period: "Oct 2018 — Dec 2021",
    location: "Greater Bandung",
    summary:
      "Led a small team delivering an HRIS SaaS and built a React Native attendance app and a hospital platform.",
    highlights: [
      "Led 3 engineers to ship SaaS HRIS (RBAC, payroll, attendance, workflows) on Agile.",
      "Built reusable Vue.js component library + Vuex state management for HR and admin modules.",
      "Launched React Native attendance app with GPS check-ins and real-time notifications.",
      "Delivered Edelweiss Hospital patient registration and appointment platform.",
      "Prototyped AWS Chime SDK for real-time video consultations.",
    ],
    tags: ["Vue.js", "React Native", "HRIS", "RBAC", "AWS Chime", "Agile"],
  },
  {
    id: "cnt-freelance",
    company: "PT Citra Niaga Teknologi",
    role: "Freelance Software Engineer",
    period: "Aug 2014 — Sep 2018",
    location: "Bandung",
    summary:
      "Built zakat management systems for Indonesian LAZs (BAZNAS, DPUDT) using PHP and Laravel.",
    highlights: [
      "Built zakat management systems for Indonesian LAZs (BAZNAS, DPUDT) in Laravel.",
      "Redesigned UI/UX of the zakat platforms to improve usability.",
      "Added Zains module for zakat collection and distribution workflows.",
      "Built clustering module to visualize religion spread across Indonesia.",
      "Implemented real-time user presence tracking via WebSockets.",
    ],
    tags: ["Laravel", "PHP", "WebSockets", "BAZNAS", "DPUDT"],
  },
]

export type TechCategory = {
  title: string
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    title: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "Python", "PHP"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React", "Vue.js", "React Native", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Laravel", "FastAPI", "REST APIs"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    title: "DevOps & Cloud",
    items: ["AWS", "Docker", "CI/CD"],
  },
  {
    title: "AI & Tools",
    items: ["LLMs", "OCR", "Text-to-Speech", "Git"],
  },
]

export const techColors: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  PHP: "#777BB4",
  "Next.js": "#FFFFFF",
  React: "#61DAFB",
  "Vue.js": "#42B883",
  "React Native": "#61DAFB",
  "Tailwind CSS": "#38BDF8",
  "Node.js": "#5FA04E",
  Laravel: "#FF2D20",
  FastAPI: "#05998B",
  "REST APIs": "#FF6F00",
  PostgreSQL: "#4169E1",
  MySQL: "#00758F",
  AWS: "#FF9900",
  Docker: "#2496ED",
  "CI/CD": "#FF6F00",
  LLMs: "#A855F7",
  OCR: "#A855F7",
  "Text-to-Speech": "#A855F7",
  Git: "#F05032",
}

export const allTech = techStack.flatMap((g) => g.items)

export type Project = {
  name: string
  description: string
  tags: string[]
  href?: string
  period?: string
  accent: string
  image?: string
}

export const projects: Project[] = [
  {
    name: "TGKypas",
    description:
      "Identity and Access Management platform automating access governance, approval workflows, compliance reviews, and audit trails across the Telkom Group.",
    tags: ["IAM", "Security", "Governance"],
    period: "2022 — Present",
    accent: "#0e7490",
    image: "/kypas.png",
  },
  {
    name: "TGSSO",
    description:
      "Enterprise Single Sign-On platform in Golang implementing OAuth 2.0 and LDAP for secure, centralized authentication across internal and partner applications.",
    tags: ["Golang", "OAuth 2.0", "LDAP", "SSO"],
    period: "2022 — Present",
    accent: "#1e3a8a",
  },
  {
    name: "ELAO",
    description:
      "Language assessment SaaS for universities, recruiters, and enterprises to automate proficiency testing, candidate evaluation, and reporting.",
    tags: ["SaaS", "Evaluation", "Reporting"],
    period: "2024",
    accent: "#4c1d95",
    image: "/dili.png",
  },
  {
    name: "Leapsy",
    description:
      "Digital language-learning platform with personalized learning, progress tracking, and content management for learners and educators.",
    tags: ["EdTech", "Learning", "Content"],
    period: "2024",
    accent: "#0e7490",
    image: "/leapsy.png",
  },
  {
    name: "HRIS SaaS",
    description:
      "SaaS Human Resource Information System with RBAC, payroll automation, attendance, and employee administration workflows.",
    tags: ["HRIS", "RBAC", "Payroll", "Vue.js"],
    period: "2018 — 2021",
    accent: "#1e3a8a",
    image: "/digispace.png",
  },
  {
    name: "Food Sharing",
    description:
      "Crowdfunding platform supporting food-sharing initiatives and empowering small and medium-sized businesses (UMKM). Connects donors with community projects to provide meals for those in need while promoting local entrepreneurs.",
    tags: ["Crowdfunding", "UMKM", "Fullstack"],
    period: "2020",
    accent: "#0e7490",
    href: "https://smartfood.badami.id",
    image: "/badami.webp",
  },
  {
    name: "Edelweiss Hospital",
    description:
      "Online patient registration and appointment management platform streamlining patient onboarding and experience.",
    tags: ["Healthcare", "Appointments"],
    period: "2018 — 2021",
    accent: "#4c1d95",
    image: "/edelweiss.png",
  },
  {
    name: "BAZNAS Crowdfunding",
    description:
      "Online crowdfunding platform from scratch in Laravel supporting BAZNAS programs across West Java, with Midtrans (GoPay/QRIS) and bank mutation payments.",
    href: "https://baznasjabar.org",
    tags: ["Laravel", "Payments", "Fullstack"],
    period: "2019",
    accent: "#0e7490",
    image: "/baznas.png",
  },
  {
    name: "Bandung Smartcity",
    description:
      "Redesigned the Forum Bandung Smartcity UI with Nuxt 2, plus API integration and bug fixing on a CodeIgniter backend.",
    href: "https://smartcity.bandung.go.id",
    tags: ["Nuxt", "CodeIgniter", "Civic"],
    period: "2020",
    accent: "#1e3a8a",
  },
]

export type Certification = {
  name: string
  issuer: string
  year?: string
  href?: string
}

export const certifications: Certification[] = [
  {
    name: "Pemrograman Go-Lang: Pemula sampai Mahir",
    issuer: "Udemy",
    year: "2023",
    href: "https://www.udemy.com/certificate/UC-dfc61e47-be03-43b6-97f9-9c3184f3fe25/",
  },
  {
    name: "NodeJS — The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
    issuer: "Udemy",
    year: "2022",
    href: "https://www.udemy.com/certificate/UC-b1b0e9fc-6339-4655-ad55-0021fbd0d002/",
  },
  {
    name: "React — The Complete Guide (Hooks, Router, Redux)",
    issuer: "Udemy",
    year: "2022",
    href: "https://www.udemy.com/certificate/UC-43e4558b-4577-4120-8663-e027b6ee30b6/",
  },
  {
    name: "Understanding TypeScript",
    issuer: "Udemy",
    href: "https://www.udemy.com/certificate/UC-6a509ee3-7044-4a62-9d35-eec1cc4c6d79/",
  },
  {
    name: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    year: "2022",
    href: "https://www.dicoding.com/certificates/NVP7KN84VZR0",
  },
  {
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    href: "https://www.hackerrank.com/certificates/a924373c001a",
  },
]

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const
