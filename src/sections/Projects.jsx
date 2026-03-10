import React from "react";
import { motion as Motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "Roberto Beach Platform",
    description: "Microservices-based booking system handling 1000+ concurrent users with zero downtime. Redis caching + RabbitMQ async processing reduced latency by 40%.",
    tech: ["Spring Boot", "Redis", "RabbitMQ", "AWS", "Docker"],
    color: "from-cyan-500 to-blue-600",
    icon: "\u{1F3D6}\uFE0F",
  },
  {
    title: "SmartAssist AI Contact Center",
    description: "Enhanced intelligent routing and disposition capture logic improving resolution rate by 50%. Optimized backend services to maintain 99.9% system uptime.",
    tech: ["Node.js", "React", "Spring Boot", "MongoDB", "AWS"],
    color: "from-purple-500 to-pink-600",
    icon: "\u{1F916}",
  },
  {
    title: "Change of Ownership",
    description: "Event-driven serverless microservices using AWS Lambda handling ~1.5K TPS with p95 latency under 120ms. Standardized CI/CD pipeline reducing deployment failures by 40%.",
    tech: ["AWS Lambda", "MongoDB", "Kubernetes", "CI/CD", "Spring Boot"],
    color: "from-orange-500 to-red-600",
    icon: "\u26A1",
  },
  {
    title: "Saffola Platform",
    description: "End-to-end e-commerce platform for Saffola with seamless payment integration, optimized performance, and scalable architecture.",
    tech: ["Node.js", "Angular", "MongoDB", "Razorpay", "JWT"],
    color: "from-green-500 to-emerald-600",
    icon: "\u{1F6D2}",
  },
  {
    title: "MCapital Loan App",
    description: "Automated KYC and loan flow with Razorpay Enach, OCR processing, and secure payment integrations.",
    tech: ["Angular", "Node.js", "Karza OCR", "Razorpay"],
    color: "from-yellow-500 to-amber-600",
    icon: "\u{1F3E6}",
  },
  {
    title: "High-Availability Booking Engine",
    description: "Designed booking microservices at Xwola handling 1000+ concurrent users. Integrated Redis caching and RabbitMQ, built CI/CD pipelines reducing manual deployment by 60%.",
    tech: ["Spring Boot", "Redis", "RabbitMQ", "Docker", "Jenkins"],
    color: "from-pink-500 to-rose-600",
    icon: "\u{1F3AF}",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-28 px-6 bg-[#0f172a] text-white overflow-hidden">
      <Motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent"
      >
        Projects
      </Motion.h2>
      <Motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-white/50 mb-14 max-w-lg mx-auto"
      >
        Systems built at scale &mdash; from real-time booking engines to AI-powered platforms
      </Motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <Tilt key={index} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.02} transitionSpeed={800}>
            <Motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full bg-white/5 backdrop-blur rounded-2xl p-6 shadow-md border border-white/5 hover:border-white/15 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {project.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.tech.map((t) => (
                  <span key={t} className="bg-white/10 text-white/70 px-2.5 py-1 rounded-full border border-white/5">
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
