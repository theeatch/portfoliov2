import { url } from "inspector";

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
      "I value teamwork and clear communication, delivering clean, maintainable code aligned with project goals.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Adaptable Developer Ensuring Seamless Global Collaboration",
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
    title: "Tech enthusiast with a passion for Music!.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a full-stack music sheets site",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
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
    title: "Chatty: A Chat Application",
    des: "A Next.js app with Convex database and Clerk authentication for adding friends, chatting, and group chats.",
    img: "/p1.svg",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/convex.svg",
      "/clerk.svg",
    ],
    link: "https://chatty-theeatchs-projects.vercel.app/",
  },
  {
    id: 2,
    title: "Diamon Estate",
    des: "A ReactJS website for Manipal Estate with Firebase Authentication and Firestore, allowing user login, profile management, and property exploration.",
    img: "/p2.svg",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/js.svg",
      "/react.svg",
      "/firebase.svg",
    ],
    link: "https://diamond-estate.vercel.app/",
  },
  {
    id: 3,
    title: "Net-Guardian",
    des: "Developed and tested ML models using Python, scikit-learn, and pandas for the Net Guardian project.",
    img: "/p3.svg",
    iconLists: ["/python.svg", "/ml2.svg", "/ml3.svg"],
    link: "/https://github.com/theeatch/NET-GUARDIAN",
  },
  {
    id: 4,
    title: "Portfolio Website",
    des: "Modernised a responsive portfolio website using Next.js, React, and Tailwind CSS, showcasing personal projects and skills.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/react.svg", "/js.svg"],
    link: "https://dhportfoliov2.vercel.app/",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Created responsive, modern UI with Next.js, TailwindCSS, and TypeScript, boosting user retention by 60%.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "BackEnd Engineer Intern",
    desc: "Integrated FastAPI for efficient API handling and built secure authentication with Node.js, Express, Passport, and MongoDB.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Core Developement Team",
    desc: "Provided engineering students with comprehensive study materials, guidance, and support, enhancing their academic experience and team performance.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "ERPNext Developer",
    desc: " Made an ERP solution using the Frappe framework and ERPNext, streamlining business operations and reducing overhead by 25%",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    url: "https://github.com/theeatch",
  },
  {
    id: 3,
    img: "/link.svg",
    url: "https://www.linkedin.com/in/dhruv-negi-387a3a233/",
  },
];
