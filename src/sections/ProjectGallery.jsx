import React from "react";
import { motion as Motion } from "framer-motion";

const projects = [
  {
    title: "SmartAssist",
    desc: "AI-native contact center with advanced routing.",
    img: "/images/smartAssist.svg",
  },
  {
    title: "Mswipe Mob 2.0",
    desc: "MPOS onboarding with Razorpay Enach integration.",
    img: "/images/mswipe.png",
  },
  {
    title: "Saffola Website",
    desc: "Healthy lifestyle e-com site built with React.",
    img: "/images/saffola.webp",
  },
  {
    title: "MCapital Loan",
    desc: "Automated KYC and loan flow with Razorpay & OCR.",
    img: "/images/image.png",
  },
  {
    title: "Niyogin",
    desc: "Microservice-based B2B loan platform.",
    img: "/images/niyogin.png",
  },
];

const ProjectGallery = () => {
  return (
    <section className="py-24 px-6 bg-[#0f172a] text-white relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
        Featured Work
      </h2>

      <div className="overflow-x-scroll no-scrollbar">
        <Motion.div
          className="flex gap-8 px-6"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => (
            <Motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-[300px] max-w-[300px] bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-md transition-all hover:shadow-cyan-400/40"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/70">{project.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery;
