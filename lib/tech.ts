import {
  SiAngular,
  SiClerk,
  SiConvex,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGooglegemini,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPhp,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

/**
 * One registry for every technology badge on the site.
 *
 * The repo's /public SVGs only cover part of the current stack (no Redis, Node,
 * FastAPI or Gemini) and several files are ambiguously named, so badges resolve
 * from here instead. Each entry carries a label, which also gives the badges the
 * accessible names the old `alt=""` images never had.
 */
export const TECH = {
  angular: { label: "Angular", Icon: SiAngular },
  aws: { label: "AWS", Icon: FaAws },
  clerk: { label: "Clerk", Icon: SiClerk },
  convex: { label: "Convex", Icon: SiConvex },
  docker: { label: "Docker", Icon: SiDocker },
  express: { label: "Express", Icon: SiExpress },
  fastapi: { label: "FastAPI", Icon: SiFastapi },
  gemini: { label: "Gemini API", Icon: SiGooglegemini },
  git: { label: "Git", Icon: SiGit },
  js: { label: "JavaScript", Icon: SiJavascript },
  mongodb: { label: "MongoDB", Icon: SiMongodb },
  mysql: { label: "MySQL", Icon: SiMysql },
  next: { label: "Next.js", Icon: SiNextdotjs },
  node: { label: "Node.js", Icon: SiNodedotjs },
  pandas: { label: "pandas", Icon: SiPandas },
  php: { label: "PHP", Icon: SiPhp },
  python: { label: "Python", Icon: SiPython },
  react: { label: "React", Icon: SiReact },
  redis: { label: "Redis", Icon: SiRedis },
  sklearn: { label: "scikit-learn", Icon: SiScikitlearn },
  socketio: { label: "Socket.IO", Icon: SiSocketdotio },
  tailwind: { label: "TailwindCSS", Icon: SiTailwindcss },
  ts: { label: "TypeScript", Icon: SiTypescript },
} as const;

export type TechKey = keyof typeof TECH;
