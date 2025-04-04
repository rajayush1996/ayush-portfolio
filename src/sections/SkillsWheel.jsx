import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import SkillCard3D from "./SkillsCard3D";

const skills = [
  {
    src: "/icons/react.svg",
    name: "React",
    summary: "A JavaScript library for building fast, modern, and interactive user interfaces.",
    link: "https://reactjs.org",
  },
  {
    src: "/icons/node.svg",
    name: "Node.js",
    summary: "A JavaScript runtime built on Chrome's V8 engine for scalable backend development.",
    link: "https://nodejs.org",
  },
  {
    src: "/icons/mongodb.svg",
    name: "MongoDB",
    summary: "A NoSQL document-oriented database designed for flexibility and scalability.",
    link: "https://www.mongodb.com",
  },
  {
    src: "/icons/aws.svg",
    name: "AWS",
    summary: "Amazon Web Services provides on-demand cloud computing platforms and APIs.",
    link: "https://aws.amazon.com",
  },
  {
    src: "/icons/docker.svg",
    name: "Docker",
    summary: "A platform for developing, shipping, and running applications in containers.",
    link: "https://www.docker.com",
  },
  {
    src: "/icons/git.svg",
    name: "Git",
    summary: "A distributed version control system for tracking changes in source code.",
    link: "https://git-scm.com",
  },
  {
    src: "/icons/typescript.svg",
    name: "TypeScript",
    summary: "A statically typed superset of JavaScript that improves code quality and scalability.",
    link: "https://www.typescriptlang.org",
  },
  {
    src: "/icons/gcp.svg",
    name: "GCP",
    summary: "Google Cloud Platform offers cloud computing services and APIs for building apps at scale.",
    link: "https://cloud.google.com",
  },
  {
    src: "/icons/javascript.svg",
    name: "JavaScript",
    summary: "A versatile programming language used to create dynamic and interactive web experiences.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: "/icons/html5.svg",
    name: "HTML",
    summary: "The standard markup language for creating structured content on the web.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    src: "/icons/python.svg",
    name: "Python",
    summary: "A high-level, readable programming language known for its versatility and ease of use.",
    link: "https://www.python.org",
  },
  {
    src: "/icons/sass.svg",
    name: "SCSS",
    summary: "A CSS preprocessor that adds power and elegance to traditional CSS syntax.",
    link: "https://sass-lang.com",
  },
  {
    src: "/icons/redis.svg",
    name: "Redis",
    summary: "An in-memory data store used as a database, cache, and message broker.",
    link: "https://redis.io",
  },
  {
    src: "/icons/rabbitmq.svg",
    name: "RabbitMQ",
    summary: "A robust message broker for distributed systems, enabling async communication.",
    link: "https://www.rabbitmq.com",
  },
  {
    src: "/icons/tailwind.svg",
    name: "Tailwind",
    summary: "A utility-first CSS framework for rapidly building custom designs.",
    link: "https://tailwindcss.com",
  }
];


const SkillsWheel = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const isMobile = window.innerWidth < 640; // adjust as needed
  const [radius, setRadius] = useState(220);
  const [iconSize, setIconSize] = useState("w-14 h-14");
  const [offset, setOffset] = useState("1.75rem");
  
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setRadius(isMobile ? 130 : 220); // 📏 smaller radius on mobile
      setIconSize(isMobile ? "w-10 h-10" : "w-14 h-14");
      setOffset(isMobile ? "1.25rem" : "1.75rem");
    };
  
    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-200 pointer-events-none">
        {/* 🌀 Animated glow ring */}
        <Motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 blur-2xl animate-pulse"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ✨ Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-20 blur-sm"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: 0.1 + Math.random() * 0.3,
            }}
            animate={{
              y: ["0%", "-20%", "0%"],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
        🧠 My Toolkit
      </h2>

      <Motion.div
        className="relative w-full flex justify-center items-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        <div className="w-[min(90vw,500px)] h-[min(90vw,500px)] rounded-full border border-white/10 flex items-center justify-center relative">
          {skills.map((skill, i) => {
            const angle = (360 / skills.length) * i;
            const rad = (angle * Math.PI) / 180;
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (
              <Motion.img
                key={i}
                src={skill.src}
                alt={skill.name}
                className={`absolute ${
                  isMobile ? "w-8 h-8" : "w-14 h-14"
                } hover:scale-125 transition-all invert`}
                style={{
                  left: `calc(50% + ${x}px - ${isMobile ? "1rem" : "1.75rem"})`,
                  top: `calc(50% + ${y}px - ${isMobile ? "1rem" : "1.75rem"})`,
                }}
                title={skill.name}
                whileHover={{ scale: 1.4 }}
                onClick={() => setActiveSkill(skill)}
              />
            );
          })}
        </div>
      </Motion.div>

      {activeSkill && (
        <SkillCard3D skill={activeSkill} onClose={() => setActiveSkill(null)} />
      )}
    </section>
  );
};

export default SkillsWheel;
