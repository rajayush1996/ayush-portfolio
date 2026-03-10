import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

const allSkills = [
  { name: "React", icon: "/icons/react.svg", level: 95, category: "Frontend", color: "#61dafb", desc: "Component architecture, hooks, context, performance optimization, SSR" },
  { name: "TypeScript", icon: "/icons/typescript.svg", level: 90, category: "Frontend", color: "#3178c6", desc: "Type-safe development, generics, utility types, strict mode" },
  { name: "JavaScript", icon: "/icons/javascript.svg", level: 95, category: "Frontend", color: "#f7df1e", desc: "ES2024+, async patterns, closures, prototypal inheritance" },
  { name: "HTML5", icon: "/icons/html5.svg", level: 95, category: "Frontend", color: "#e34f26", desc: "Semantic markup, accessibility, Web APIs, Canvas" },
  { name: "Tailwind", icon: "/icons/tailwind.svg", level: 90, category: "Frontend", color: "#06b6d4", desc: "Utility-first CSS, responsive design, custom themes" },
  { name: "SCSS", icon: "/icons/sass.svg", level: 85, category: "Frontend", color: "#cf649a", desc: "Mixins, variables, nesting, modular stylesheets" },
  { name: "Node.js", icon: "/icons/node.svg", level: 95, category: "Backend", color: "#68a063", desc: "Express, Fastify, streaming, cluster mode, microservices" },
  { name: "Python", icon: "/icons/python.svg", level: 85, category: "Backend", color: "#ffcf40", desc: "FastAPI, automation scripts, data processing pipelines" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", level: 92, category: "Database", color: "#00ed64", desc: "Aggregation pipelines, indexing, sharding, Atlas" },
  { name: "Redis", icon: "/icons/redis.svg", level: 88, category: "Database", color: "#dc382d", desc: "Caching strategies, pub/sub, Lua scripting, clustering" },
  { name: "AWS", icon: "/icons/aws.svg", level: 92, category: "Cloud", color: "#ff9900", desc: "Lambda, EC2, S3, SQS, CloudFormation, API Gateway" },
  { name: "Docker", icon: "/icons/docker.svg", level: 88, category: "Cloud", color: "#2496ed", desc: "Containerization, multi-stage builds, Docker Compose, K8s" },
  { name: "GCP", icon: "/icons/gcp.svg", level: 80, category: "Cloud", color: "#ea4335", desc: "Cloud Functions, Firestore, Cloud Run, BigQuery" },
  { name: "Git", icon: "/icons/git.svg", level: 93, category: "Cloud", color: "#f05032", desc: "Branching strategies, rebasing, CI/CD workflows, monorepos" },
  { name: "RabbitMQ", icon: "/icons/rabbitmq.svg", level: 85, category: "Cloud", color: "#ff6600", desc: "Message queuing, async pipelines, dead-letter exchanges" },
];

/* ---- 3D Glass Detail Card ---- */
const GlassCard = ({ skill, onClose }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const levelLabel = skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Proficient";
  const levelStars = skill.level >= 90 ? 5 : skill.level >= 85 ? 4 : 3;

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose} style={{ perspective: "1200px" }}>
      <Motion.div ref={cardRef}
        initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.7, rotateY: 30 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative w-[380px] max-w-[90vw] cursor-default"
        style={{ transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: "transform 0.15s ease-out" }}>
        <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/[0.15] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(${135 + tilt.x * 2}deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)` }} />
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Motion.div className="w-20 h-20 rounded-2xl flex items-center justify-center border"
                style={{ background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`, borderColor: `${skill.color}40`, boxShadow: `0 8px 30px -8px ${skill.color}40` }}
                animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<span style="font-size:2rem;font-weight:900;color:${skill.color}">${skill.name[0]}</span>`; }} />
              </Motion.div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all text-sm">{"\u2715"}</button>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">{skill.name}</h3>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: `${skill.color}25`, color: skill.color }}>{skill.category}</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-white/50 font-medium">{levelLabel}</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-6">{skill.desc}</p>
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Proficiency</span>
                <span className="text-sm font-black" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                <Motion.div className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                  initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Motion.div key={s} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + s * 0.08, type: "spring" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={s <= levelStars ? skill.color : "rgba(255,255,255,0.08)"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </Motion.div>
              ))}
              <span className="text-[11px] text-white/30 ml-2 font-medium">{levelLabel}</span>
            </div>
          </div>
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}50, transparent)` }} />
        </div>
      </Motion.div>
    </Motion.div>
  );
};

/* ---- 3D Ellipse Orbit Ring ---- */
const OrbitRing = ({ skills, radius, speed, reverse, ringColor, onSelect, tiltDeg }) => {
  const containerRef = useRef(null);
  const isPaused = useRef(false);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  /* 3D ellipse: rx = wide, ry = compressed for depth */
  const RX = radius;
  const RY = radius * 0.38;

  useEffect(() => {
    const tick = () => {
      if (!isPaused.current) {
        angleRef.current += (reverse ? -speed : speed);
      }
      const container = containerRef.current;
      if (container) {
        const nodes = container.querySelectorAll("[data-skill-node]");
        const total = nodes.length;
        nodes.forEach((node, i) => {
          const theta = (angleRef.current + (i / total) * 360) * (Math.PI / 180);
          const x = Math.cos(theta) * RX;
          const y = Math.sin(theta) * RY;
          /* depth: sin gives -1 (back) to 1 (front) */
          const depth = (Math.sin(theta) + 1) / 2; /* 0=back, 1=front */
          const scale = 0.65 + 0.45 * depth;
          const opacity = 0.35 + 0.65 * depth;
          node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
          node.style.zIndex = Math.round(depth * 100);
          node.style.opacity = opacity;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reverse, speed, RX, RY]);

  return (
    <>
      {/* 3D Ellipse orbit track */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: `${RX * 2}px`, height: `${RY * 2}px`,
          marginLeft: `-${RX}px`, marginTop: `-${RY}px`,
          borderRadius: "50%",
          border: `1.5px solid ${ringColor}40`,
          boxShadow: `0 0 60px -8px ${ringColor}30, inset 0 0 60px -8px ${ringColor}12`,
        }}
      />
      {/* Outer glow ring */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: `${RX * 2 + 8}px`, height: `${RY * 2 + 8}px`,
          marginLeft: `-${RX + 4}px`, marginTop: `-${RY + 4}px`,
          borderRadius: "50%",
          border: `1px solid ${ringColor}20`,
        }}
      />

      {/* Skill icons container */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            data-skill-node
            className="absolute left-1/2 top-1/2 will-change-transform pointer-events-auto"
            style={{ transform: "translate(-50%, -50%) scale(0.5)", opacity: 0 }}
            onMouseEnter={() => { isPaused.current = true; }}
            onMouseLeave={() => { isPaused.current = false; }}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 group relative transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${skill.color}45, ${skill.color}18)`,
                borderColor: `${skill.color}70`,
                boxShadow: `0 6px 30px -4px ${skill.color}50, inset 0 1px 0 ${skill.color}30`,
              }}
            >
              <img src={skill.icon} alt={skill.name}
                className="w-10 h-10 object-contain drop-shadow-md pointer-events-none"
                style={{ filter: "brightness(0) invert(1)" }}
                onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML += `<span style="font-size:1.5rem;font-weight:900;color:${skill.color}">${skill.name[0]}</span>`; }}
              />
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `0 0 40px ${skill.color}60, inset 0 0 25px ${skill.color}30` }} />
              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-30">
                <span className="text-xs px-3 py-1.5 rounded-lg font-bold text-white bg-black/90 backdrop-blur-sm border border-white/10 shadow-lg">{skill.name}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

/* ---- Center Core ---- */
const CenterCore = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
    <Motion.div className="absolute inset-0 -m-10 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)" }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    <Motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="w-28 h-28 rounded-full border border-dashed border-purple-500/20 flex items-center justify-center">
      <Motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/25 via-cyan-500/20 to-pink-500/25 border border-white/[0.12] flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_-8px_rgba(139,92,246,0.3)]">
        <span className="text-3xl select-none">{"\u{1F4BB}"}</span>
      </Motion.div>
    </Motion.div>
  </div>
);

/* ---- Stats ---- */
const StatsRow = () => {
  const stats = [
    { label: "Technologies", value: allSkills.length, icon: "\u{1F9E9}" },
    { label: "Expert Level", value: allSkills.filter(s => s.level >= 90).length, icon: "\u{1F31F}" },
    { label: "Categories", value: 4, icon: "\u{1F4DA}" },
  ];
  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <span className="text-xl">{s.icon}</span>
          <div>
            <span className="text-xl font-black text-white block leading-none">{s.value}</span>
            <span className="text-[10px] text-white/35 font-medium uppercase tracking-wider">{s.label}</span>
          </div>
        </div>
      ))}
    </Motion.div>
  );
};

/* ---- Category Legend ---- */
const CategoryLegend = () => {
  const cats = [
    { name: "Frontend", color: "#38bdf8" },
    { name: "Backend", color: "#4ade80" },
    { name: "Database", color: "#c084fc" },
    { name: "Cloud & DevOps", color: "#fb923c" },
  ];
  return (
    <Motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-3 mt-8">
      {cats.map((c) => (
        <div key={c.name} className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}50` }} />
          <span className="text-[11px] text-white/50 font-medium">{c.name}</span>
        </div>
      ))}
    </Motion.div>
  );
};

/* ---- Mobile Grid ---- */
const categories = [
  { name: "Frontend", color: "#38bdf8", skills: allSkills.filter(s => s.category === "Frontend") },
  { name: "Backend", color: "#4ade80", skills: allSkills.filter(s => s.category === "Backend") },
  { name: "Database", color: "#c084fc", skills: allSkills.filter(s => s.category === "Database") },
  { name: "Cloud & DevOps", color: "#fb923c", skills: allSkills.filter(s => s.category === "Cloud") },
];

const MobileSkillsGrid = ({ onSelect }) => (
  <div className="space-y-6">
    {categories.map((cat, ci) => (
      <Motion.div key={cat.name}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: ci * 0.1, type: "spring", stiffness: 200, damping: 24 }}
        className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4"
      >
        {/* Category header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}60` }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>{cat.name}</span>
          <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${cat.color}30, transparent)` }} />
        </div>
        {/* Skill icons grid */}
        <div className="grid grid-cols-3 gap-3">
          {cat.skills.map((skill, si) => (
            <Motion.button key={skill.name} type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 + si * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(skill)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-white/[0.04] border border-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center border"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}35, ${skill.color}12)`,
                  borderColor: `${skill.color}50`,
                  boxShadow: `0 4px 16px -4px ${skill.color}40`,
                }}>
                <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain pointer-events-none"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<span style="font-size:1rem;font-weight:900;color:${skill.color}">${skill.name[0]}</span>`; }} />
              </div>
              <span className="text-[10px] text-white/50 font-medium leading-tight text-center">{skill.name}</span>
              {/* Tiny proficiency bar */}
              <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: skill.color }} />
              </div>
            </Motion.button>
          ))}
        </div>
      </Motion.div>
    ))}
  </div>
);

/* ============ MAIN ============ */
const SkillsWheel = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const ring1 = allSkills.filter(s => s.category === "Frontend");
  const ring2 = allSkills.filter(s => s.category === "Backend" || s.category === "Database");
  const ring3 = allSkills.filter(s => s.category === "Cloud");

  return (
    <section id="skills" className="relative py-12 md:py-20 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Motion.div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity }} />
        <Motion.div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-purple-500/[0.06] rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity }} />
        <Motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-500/[0.04] rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-4">
            <span className="text-xs px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 font-medium tracking-wider uppercase">Tech Arsenal</span>
          </Motion.div>
          <Motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Dev Toolkit</span>
          </Motion.h2>
          <Motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-lg mx-auto">
            Tap any skill to explore details
          </Motion.p>
        </div>

        <StatsRow />

        {isMobile ? (
          <MobileSkillsGrid onSelect={setSelectedSkill} />
        ) : (
          /* 3D Solar System Container — desktop only */
          <Motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mx-auto"
            style={{ height: "560px" }}
          >
            <CenterCore />
            <OrbitRing skills={ring1} radius={190} speed={0.06} reverse={false} ringColor="#38bdf8" onSelect={setSelectedSkill} />
            <OrbitRing skills={ring2} radius={310} speed={0.035} reverse={true} ringColor="#4ade80" onSelect={setSelectedSkill} />
            <OrbitRing skills={ring3} radius={430} speed={0.02} reverse={false} ringColor="#fb923c" onSelect={setSelectedSkill} />
          </Motion.div>
        )}

        <CategoryLegend />

        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/35 text-sm">
            <Motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>{"\u2699\uFE0F"}</Motion.span>
            Always learning, always evolving
          </div>
        </Motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedSkill && <GlassCard skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default SkillsWheel;
