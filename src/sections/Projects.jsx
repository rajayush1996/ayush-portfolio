import React from "react";
import { motion as Motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "SmartAssist",
    description: "AI-native contact center with enhanced routing and real-time AI support.",
    tech: ["Node.js", "React", "MongoDB"],
  },
  {
    title: "Mswipe Mob 2.0",
    description: "KYC + Razorpay Enach + API gateway for scalable POS onboarding.",
    tech: ["React", "Razorpay", "Node.js"],
  },
  {
    title: "Saffola Site",
    description: "Optimized performance & brand-aligned UX for a healthy lifestyle portal.",
    tech: ["React", "MongoDB", "Express"],
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0f172a] text-white">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
        Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <Tilt
            key={index}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            scale={1.05}
            transitionSpeed={1000}
            className="bg-white/5 backdrop-blur rounded-xl p-6 shadow-md hover:shadow-cyan-400/40 transition-all duration-300"
          >
            <Motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/70 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-cyan-300">
                {project.tech.map((t) => (
                  <span key={t} className="bg-cyan-900 px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </Motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Projects;
