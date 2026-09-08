import type { TechKey } from "@/components/ui/TechIcon";

export const resumeLink =
  "https://drive.google.com/file/d/1ou6NXZDzJ6t5BYFN_I5dtAhmg9oaRnfb/view?usp=drivesdk";

export const contactEmail = "dhruvnegiclub03@gmail.com";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experiences", link: "#experiences" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title:
      "I build the parts you never see - REST APIs, queues, auth layers and the architecture holding them together.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Gurugram, India - shipping with teams anywhere.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Backend engineer by day, pianist the rest of the time.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title:
      "Currently building CodeScope - AI code review that reads the whole repo",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Want to build something together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "RateFlow",
    des: "A distributed token-bucket rate limiter on Redis, with configurable middleware policies and a live dashboard for throughput and blocked requests.",
    // no screenshot yet: the card falls back to a designed placeholder
    img: "",
    iconLists: ["redis", "node", "next", "docker"] as TechKey[],
    link: "https://github.com/theeatch/rated",
  },
  {
    id: 2,
    title: "AI Playground",
    des: "A handful of AI-powered things I built for myself and for the fun of it — recipe generation, travel planning, and whatever else I wanted to try next.",
    img: "/p9.svg",
    iconLists: ["gemini", "next", "ts", "tailwind"] as TechKey[],
    link: "https://genaistuf.vercel.app/",
  },
  {
    id: 3,
    title: "DataSphere",
    des: "A full-stack Next.js and MongoDB application showcasing products, services and research with complete CRUD operations.",
    img: "/p6.svg",
    iconLists: ["next", "tailwind", "js", "mongodb"] as TechKey[],
    link: "https://datasphere-ten.vercel.app/",
  },
  {
    id: 4,
    title: "Chatty: A Chat Application",
    des: "A Next.js app with a Convex database and Clerk authentication for adding friends, direct messaging and group chats.",
    img: "/p1.svg",
    iconLists: ["next", "tailwind", "ts", "convex", "clerk"] as TechKey[],
    link: "https://chatty-theeatchs-projects.vercel.app/",
  },
];

export const workExperience = [
  {
    id: 1,
    kind: "work" as const,
    title: "Software Developer Engineer",
    org: "GoSamplify",
    period: "Aug 2025 — Present",
    desc: "Built the backend for a new SaaS platform: 40+ REST APIs across customer, partner, contract, location and order modules, migrating a split Node.js/PHP setup to one Node.js architecture in 12 days. Set up the shared auth, audit-logging and data-access layers, plus SQS-backed document generation for 1K+ documents a month.",
    thumbnail: "/exp2.svg",
  },
  {
    id: 2,
    kind: "work" as const,
    title: "Software Developer Intern",
    org: "GoSamplify",
    period: "Feb 2025 — Aug 2025",
    desc: "Built a real-time rider tracking platform with Socket.IO, Azure Web PubSub and Angular, showing 500+ riders live on one dashboard. Integrated WhatsApp messaging into order workflows and cut response times 35%+ by restructuring MySQL queries.",
    thumbnail: "/exp4.svg",
  },
  {
    id: 3,
    kind: "education" as const,
    title: "B.Tech, Information Technology",
    org: "Manipal Institute of Technology",
    period: "Oct 2021 — Aug 2025",
    desc: "Four years on the fundamentals underneath the job: data structures, networks, databases and distributed systems - the parts that keep showing up in production.",
    thumbnail: "/exp3.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    img: "/git.svg",
    url: "https://github.com/theeatch",
  },
  {
    id: 2,
    name: "LinkedIn",
    img: "/link.svg",
    url: "https://www.linkedin.com/in/dhruv-negi",
  },
];
