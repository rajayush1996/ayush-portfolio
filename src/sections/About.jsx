import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, useInView } from "framer-motion";

const stats = [
  { label: "Years Exp", value: "5+", num: 5, suffix: "+" },
  { label: "Services Built", value: "25+", num: 25, suffix: "+" },
  { label: "TPS Handled", value: "1.5K", num: 1.5, suffix: "K" },
  { label: "Uptime", value: "99.9%", num: 99.9, suffix: "%" },
];

/* Animated counter hook */
const useCounter = (end, suffix, inView) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); return; }
      setVal(Math.round(start * 10) / 10);
    }, 16);
    return () => clearInterval(id);
  }, [inView, end]);
  const display = Number.isInteger(val) ? val : val.toFixed(1);
  return `${display}${suffix}`;
};

const AnimatedStat = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const display = useCounter(stat.num, stat.suffix, inView);
  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, borderColor: "rgba(6,182,212,0.4)" }}
      className="text-center p-3 rounded-xl bg-white/5 border border-white/10 cursor-default"
    >
      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
        {display}
      </div>
      <div className="text-xs text-white/50 mt-1">{stat.label}</div>
    </Motion.div>
  );
};

/* Word-by-word text reveal */
const RevealText = ({ children, className, delay = 0 }) => {
  const words = children.split(" ");
  return (
    <Motion.p className={className}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Motion.span key={i} className="inline-block mr-[0.3em]"
          variants={{ hidden: { opacity: 0, y: 12, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35 } } }}
        >{word}</Motion.span>
      ))}
    </Motion.p>
  );
};

const About = () => {
  return (
    <section id="about" className="py-28 px-6 bg-gradient-to-b from-[#0f172a] to-black text-white overflow-hidden">
      <Motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 via-yellow-400 to-fuchsia-500 text-transparent bg-clip-text"
      >
        About Me
      </Motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Blob Background + Avatar */}
        <Motion.div
          className="relative w-full flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Motion.div
            className="absolute w-80 h-80 bg-gradient-to-tr from-pink-500 via-yellow-300 to-blue-500 rounded-full blur-3xl opacity-30 z-0"
            animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <Motion.img
            src="/images/ayush.png"
            alt="Ayush Raj"
            className="relative z-10 w-64 h-64 rounded-full shadow-2xl border-4 border-white/10 object-cover"
            whileHover={{ scale: 1.05, borderColor: "rgba(236,72,153,0.5)" }}
            transition={{ duration: 0.3 }}
          />
        </Motion.div>

        {/* Bio Content */}
        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <RevealText className="text-white/80 text-lg leading-relaxed mb-4" delay={0}>
            I'm Ayush Raj, a Senior Software Engineer with 5+ years of experience building scalable backend and distributed systems using Java, Spring Boot, Node.js, and AWS.
          </RevealText>
          <RevealText className="text-white/80 text-lg leading-relaxed mb-4" delay={0.3}>
            Currently at Ernst & Young (EY) as Senior Technical Lead, I architect event-driven serverless microservices handling ~1.5K TPS with p95 latency under 120ms.
          </RevealText>
          <RevealText className="text-white/70 text-base leading-relaxed mb-8" delay={0.6}>
            Strong foundation in System Design, Microservices architecture, and cloud-native development. Proven track record of reducing latency, improving reliability, and leading scalable deployments.
          </RevealText>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <AnimatedStat key={i} stat={s} index={i} />
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
