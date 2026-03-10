import React from "react";
import { motion as Motion } from "framer-motion";

const projects = [
  {
    title: "SmartAssist",
    desc: "AI-native contact center \u2014 50% better routing efficiency, 99.9% uptime.",
    img: "/images/smartAssist.svg",
    gradient: "from-purple-600/20 to-blue-600/20",
  },
  {
    title: "Roberto Beach Platform",
    desc: "Zero-downtime booking for 1000+ concurrent users with Redis & RabbitMQ.",
    img: "/images/placeholder.svg",
    gradient: "from-cyan-600/20 to-teal-600/20",
  },
  {
    title: "Change of Ownership",
    desc: "AWS Lambda microservices at ~1.5K TPS with p95 latency < 120ms.",
    img: "/images/image.png",
    gradient: "from-orange-600/20 to-red-600/20",
  },
  {
    title: "MCapital Loan",
    desc: "Automated KYC & loan processing with Razorpay & OCR integration.",
    img: "/images/niyogin.png",
    gradient: "from-pink-600/20 to-rose-600/20",
  },
  {
    title: "Saffola Platform",
    desc: "End-to-end e-commerce platform for Saffola with seamless payment integration and optimized performance.",
    img: "/images/saffola.webp",
    gradient: "from-green-600/20 to-emerald-600/20",
  },
];

const ProjectGallery = () => {
  const containerRef = React.useRef(null);
  const [dragLeft, setDragLeft] = React.useState(-800);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const calc = () => {
      const overflow = el.scrollWidth - el.parentElement.clientWidth;
      setDragLeft(overflow > 0 ? -overflow - 24 : 0);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section className="py-28 px-6 bg-[#0f172a] text-white relative overflow-hidden">
      <Motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Featured Work
      </Motion.h2>
      <Motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-white/40 mb-14"
      >
        Drag to explore &rarr;
      </Motion.p>

      <div className="overflow-x-scroll no-scrollbar">
        <Motion.div
          ref={containerRef}
          className="flex gap-6 px-6"
          drag="x"
          dragConstraints={{ left: dragLeft, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              className={`min-w-[320px] max-w-[320px] bg-gradient-to-br ${project.gradient} backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/5 hover:border-white/15 transition-all duration-500 group`}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{project.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ProjectGallery;
