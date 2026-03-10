import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const milestones = [
  { id: 0, type: "school", title: "Saraswati Sisu Vidya Mandir", year: "Foundation", icon: "\u{1F3EB}", color: "#38bdf8", description: "Where the journey began \u2014 first spark of curiosity.", achievements: ["Built strong fundamentals", "Discovered love for problem-solving"] },
  { id: 1, type: "school", title: "Central Academy (Till 7th)", year: "Early Days", icon: "\u{1F3EB}", color: "#818cf8", description: "Exploring academics and extra-curriculars.", achievements: ["Top performer in mathematics", "Inter-school competitions"] },
  { id: 2, type: "school", title: "PND Jain High School", year: "2012", icon: "\u{1F393}", color: "#c084fc", description: "Building discipline and academic excellence.", achievements: ["Board exam distinction", "Science olympiad participant"] },
  { id: 3, type: "school", title: "Kendriya Vidyalaya (12th)", year: "2014", icon: "\u{1F393}", color: "#f472b6", description: "Senior secondary \u2014 first encounter with programming.", achievements: ["Completed 12th with Science stream", "First lines of code written"] },
  { id: 4, type: "college", title: "B.Tech \u2013 ACE, Kurukshetra University", year: "2016\u20132020", icon: "\u{1F393}", color: "#fb923c", description: "Bachelor of Technology in Computer Science.", achievements: ["Google Code Jam Qualifier 2018 & 2019", "NPTEL Database Systems (IIT Kharagpur)", "HackerRank 5-Star Gold Badge (Python)", "TechGig Code Gladiators Semi-Finalist"], tech: ["Java", "Python", "C++", "Data Structures"] },
  { id: 5, type: "work", title: "Psych x86 Technologies", subtitle: "Application Developer", year: "Mar 2021 \u2013 Mar 2022", location: "Hyderabad", icon: "\u{1F4BC}", color: "#4ade80", description: "First professional role \u2014 POS loan microservices & payment integrations.", achievements: ["POS loan microservices \u2014 90% efficiency boost", "JWT auth & Razorpay integrations", "Reduced API failure rate by 30%"], tech: ["Node.js", "Angular", "MongoDB", "Razorpay"] },
  { id: 6, type: "work", title: "Kore.ai", subtitle: "Software Engineer", year: "Mar 2022 \u2013 Mar 2024", location: "Hyderabad", icon: "\u{1F916}", color: "#22d3ee", description: "Built 25+ backend services for SmartAssist AI contact center.", achievements: ["25+ backend services (Spring Boot & Node.js)", "SmartAssist routing \u2014 50% resolution efficiency", "99.9% uptime", "Jenkins CI/CD automation"], tech: ["Spring Boot", "Node.js", "React", "MongoDB", "AWS"] },
  { id: 7, type: "work", title: "XWOLA Pvt Ltd", subtitle: "Senior Software Engineer", year: "Mar 2024 \u2013 Nov 2025", location: "Hyderabad", icon: "\u{1F680}", color: "#facc15", description: "High-availability booking platforms for 1000+ concurrent users.", achievements: ["Roberto Beach Platform \u2014 zero downtime", "40% latency reduction (Redis)", "RabbitMQ async pipeline", "Resolved 350+ production issues"], tech: ["Spring Boot", "Redis", "RabbitMQ", "AWS", "Docker"] },
  { id: 8, type: "work", title: "Ernst & Young (EY)", subtitle: "Senior Technical Lead", year: "Nov 2025 \u2013 Present", location: "Hyderabad", icon: "\u26A1", color: "#f97316", description: "Leading event-driven serverless architecture at the Big Four.", achievements: ["AWS Lambda \u2014 ~1.5K TPS, p95 < 120ms", "CI/CD \u2014 40% fewer deployment failures", "Optimized MongoDB queries at scale", "Monitoring & observability systems"], tech: ["AWS Lambda", "Spring Boot", "MongoDB", "Kubernetes", "CI/CD"] },
];

/* ---- Starfield ---- */
const Starfield = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let id; let stars = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    const init = () => { stars = Array.from({ length: 180 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.4 + 0.4, sp: Math.random() * 0.4 + 0.08, o: Math.random(), ts: Math.random() * 0.015 + 0.004 })); };
    const draw = () => { ctx.clearRect(0, 0, c.width, c.height); stars.forEach(s => { s.o += s.ts; if (s.o > 1 || s.o < 0.15) s.ts *= -1; s.y += s.sp; if (s.y > c.height) { s.y = 0; s.x = Math.random() * c.width; } ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${s.o})`; ctx.fill(); }); id = requestAnimationFrame(draw); };
    resize(); init(); draw();
    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
};

/* ---- Detail Card Modal ---- */
const MilestoneCard = ({ milestone: m, onClose }) => (
  <Motion.div initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85, y: 20 }}
    transition={{ type: "spring", damping: 22, stiffness: 280 }}
    className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_60px_-15px_rgba(56,189,248,0.3)] max-w-lg w-full mx-4"
    onClick={e => e.stopPropagation()}>
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-4">
        <Motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
          style={{ background: `${m.color}20`, border: `2px solid ${m.color}40` }}>{m.icon}</Motion.div>
        <div>
          <h3 className="text-2xl font-black text-white">{m.title}</h3>
          {m.subtitle && <p className="text-sm text-white/50 font-medium">{m.subtitle}</p>}
        </div>
      </div>
      <button onClick={onClose} className="text-white/30 hover:text-white text-2xl transition-colors mt-1">{"\u2715"}</button>
    </div>
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${m.color}20`, color: m.color }}>{m.year}</span>
      {m.location && <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/50">{"\u{1F4CD}"} {m.location}</span>}
    </div>
    <p className="text-white/70 text-sm mb-5 leading-relaxed">{m.description}</p>
    {m.achievements && (
      <div className="mb-5 bg-white/[0.03] rounded-2xl p-4 border border-white/5">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Key Achievements</h4>
        <ul className="space-y-2">
          {m.achievements.map((a, i) => (
            <Motion.li key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
              className="text-sm text-white/65 flex items-start gap-2.5">
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} /> {a}
            </Motion.li>
          ))}
        </ul>
      </div>
    )}
    {m.tech && (
      <div className="flex flex-wrap gap-2">
        {m.tech.map((t, i) => (
          <Motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
            className="text-xs px-3 py-1.5 rounded-full font-medium border" style={{ background: `${m.color}10`, borderColor: `${m.color}25`, color: m.color }}>{t}</Motion.span>
        ))}
      </div>
    )}
  </Motion.div>
);

/* ---- Progress Bar ---- */
const ProgressBar = ({ current, total }) => {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-xs text-white/40 mb-2 font-medium">
        <span>Level {current + 1} / {total}</span><span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <Motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400"
          animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </div>
    </div>
  );
};

/* ---- Exhaust Particles (aligned to bottom-left tail of 🚀) ---- */
const ExhaustParticles = () => (
  <div className="absolute pointer-events-none" style={{ left: -2, bottom: -2, transform: "rotate(-45deg)", transformOrigin: "top center" }}>
    {[...Array(8)].map((_, i) => (
      <Motion.div key={i} className="absolute rounded-full"
        style={{ width: 4 + Math.random() * 6, height: 4 + Math.random() * 6, left: -6 + Math.random() * 12, background: i < 3 ? "#f97316" : i < 5 ? "#facc15" : "#fb923c" }}
        animate={{ y: [0, 28 + Math.random() * 36], opacity: [0.9, 0], scale: [1, 0.2], x: [-4 + Math.random() * 8, -8 + Math.random() * 16] }}
        transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.06, ease: "easeOut" }} />
    ))}
    {/* Core flame */}
    <Motion.div className="absolute left-1/2 -translate-x-1/2 w-3 rounded-full bg-gradient-to-b from-white via-yellow-300 to-orange-500"
      animate={{ height: [10, 18, 10], opacity: [1, 0.8, 1] }}
      transition={{ duration: 0.15, repeat: Infinity }} />
    {/* Smoke */}
    {[...Array(4)].map((_, i) => (
      <Motion.div key={`s${i}`} className="absolute rounded-full bg-white/10"
        style={{ width: 6, height: 6, left: -4 + Math.random() * 8 }}
        animate={{ y: [18, 50 + Math.random() * 20], opacity: [0.3, 0], scale: [0.8, 2] }}
        transition={{ duration: 0.7 + Math.random() * 0.3, repeat: Infinity, delay: 0.2 + i * 0.1 }} />
    ))}
  </div>
);

/* ---- Rocket SFX (synthesized via Web Audio — no files needed) ---- */
/* Shared AudioContext — reused across all sound effects */
let _audioCtx = null;
const getAudioCtx = () => {
  if (!_audioCtx || _audioCtx.state === "closed") {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
};

/* Continuous thruster rumble — returns a stop() function */
const playThruster = () => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    /* Low rumble (noise-like via detuned oscillators) */
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(55, t);
    osc1.frequency.linearRampToValueAtTime(70, t + 0.3);
    const osc2 = ctx.createOscillator();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(110, t);
    /* Tremolo for "chug" effect */
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(18, t);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.06, t);
    lfo.connect(lfoGain);
    /* Master gain */
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, t);
    master.gain.linearRampToValueAtTime(0.12, t + 0.15); /* fade in */
    lfoGain.connect(master.gain);
    /* High hiss layer */
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, t);
    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.setValueAtTime(3000, t);
    noise.connect(hpf).connect(noiseGain).connect(master);
    osc1.connect(master);
    osc2.connect(master);
    master.connect(ctx.destination);
    osc1.start(t); osc2.start(t); lfo.start(t); noise.start(t);
    return () => {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.15);
      setTimeout(() => { osc1.stop(); osc2.stop(); lfo.stop(); noise.stop(); }, 200);
    };
  } catch (_) { return () => {}; }
};

/* Landing thud + whoosh */
const playRocketLand = () => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    /* Whoosh sweep down */
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.25);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.3);
    /* Impact thud */
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(80, t + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(30, t + 0.45);
    gain2.gain.setValueAtTime(0.2, t + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(t + 0.15); osc2.stop(t + 0.45);
  } catch (_) { /* silently skip */ }
};

/* ---- Countdown Launch Screen ---- */
const COUNTDOWN_FROM = 10;
const voiceLines = [
  { at: 10, text: "Prepare for launch." },
  { at: 6, text: "Are you ready?" },
  { at: 3, text: "Welcome aboard!" },
];

/* Indian female voice preference */
const pickFemaleVoice = () => {
  const voices = window.speechSynthesis?.getVoices() || [];
  /* 1. Indian English female by name */
  return voices.find(v => /neerja|aditi|raveena|priya|kajal|lekha/i.test(v.name))
    /* 2. Any female en-IN voice */
    || voices.find(v => /female/i.test(v.name) && /en[-_]IN/i.test(v.lang))
    /* 3. Google en-IN voice (Chrome) */
    || voices.find(v => /google.*india|google.*hindi/i.test(v.name))
    /* 4. Any en-IN voice */
    || voices.find(v => /en[-_]IN/i.test(v.lang))
    /* 5. Hindi voice */
    || voices.find(v => /hi[-_]IN/i.test(v.lang))
    /* 6. Fallback: any female English voice */
    || voices.find(v => /samantha|zira|susan|hazel|jenny|aria|emma|amy/i.test(v.name) && v.lang.startsWith("en"))
    || voices.find(v => v.lang.startsWith("en"));
};

const speak = (text, onDone) => {
  try {
    if (!window.speechSynthesis) { onDone?.(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.15;
    u.volume = 0.95;
    const voice = pickFemaleVoice();
    if (voice) u.voice = voice;
    if (onDone) {
      let fired = false;
      const done = () => { if (!fired) { fired = true; clearTimeout(sf); onDone(); } };
      const sf = setTimeout(done, 6000);
      u.onend = done;
      u.onerror = done;
    }
    window.speechSynthesis.speak(u);
  } catch (_) { onDone?.(); }
};

/* Synthesized countdown beep */
const playCountBeep = (final) => {
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = final ? "square" : "sine";
    osc.frequency.setValueAtTime(final ? 880 : 440, t);
    gain.gain.setValueAtTime(final ? 0.18 : 0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (final ? 0.5 : 0.15));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + (final ? 0.5 : 0.15));
  } catch (_) {}
};

const CountdownLaunch = ({ onComplete }) => {
  const [count, setCount] = useState(COUNTDOWN_FROM);
  const [phase, setPhase] = useState("loading"); /* loading | counting | go | done */
  const [spokenText, setSpokenText] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);
  const spokenRef = useRef(new Set());
  const gestureRef = useRef(false);
  const readyRef = useRef({ voices: false, audio: false, gesture: false });

  /* Loading phase: preload everything, then auto-start countdown */
  useEffect(() => {
    if (phase !== "loading") return;
    let started = false;
    const tryStart = () => {
      const r = readyRef.current;
      if (!started && r.voices && r.audio && r.gesture) {
        started = true;
        setLoadProgress(100);
        /* Brief pause to show 100%, then go */
        setTimeout(() => setPhase("counting"), 400);
      }
    };

    /* 1. Load voices */
    const loadVoices = () => {
      if (!window.speechSynthesis) { readyRef.current.voices = true; setLoadProgress(p => Math.max(p, 33)); tryStart(); return; }
      const check = () => {
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0) {
          readyRef.current.voices = true;
          setLoadProgress(p => Math.max(p, 33));
          tryStart();
          return true;
        }
        return false;
      };
      if (!check()) {
        const onV = () => { window.speechSynthesis.removeEventListener("voiceschanged", onV); check(); };
        window.speechSynthesis.addEventListener("voiceschanged", onV);
        setTimeout(() => { readyRef.current.voices = true; setLoadProgress(p => Math.max(p, 33)); tryStart(); }, 3000);
      }
    };

    /* 2. Warm up AudioContext */
    const loadAudio = () => {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        g.gain.value = 0;
        osc.connect(g).connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.01);
        setTimeout(() => { readyRef.current.audio = true; setLoadProgress(p => Math.max(p, 66)); tryStart(); }, 200);
      } catch (_) { readyRef.current.audio = true; setLoadProgress(p => Math.max(p, 66)); tryStart(); }
    };

    loadVoices();
    loadAudio();

    /* Gesture fallback: if user hasn't clicked after 4s, mark gesture as done anyway
       (speech may not work on strict browsers, but countdown will still run) */
    const gFallback = setTimeout(() => {
      if (!readyRef.current.gesture) { readyRef.current.gesture = true; setLoadProgress(p => Math.max(p, 90)); tryStart(); }
    }, 4000);

    return () => clearTimeout(gFallback);
  }, [phase]);

  /* Capture any click/tap during loading as user gesture → unlock speech */
  const handleGesture = useCallback(() => {
    if (gestureRef.current) return;
    gestureRef.current = true;
    readyRef.current.gesture = true;
    /* Warm up speech engine with silent utterance inside user gesture */
    if (window.speechSynthesis) {
      try {
        const s = new SpeechSynthesisUtterance("");
        s.volume = 0;
        const v = pickFemaleVoice();
        if (v) s.voice = v;
        window.speechSynthesis.speak(s);
      } catch (_) {}
    }
    setLoadProgress(p => Math.max(p, 90));
  }, []);

  useEffect(() => {
    if (phase !== "counting") return;
    voiceLines.forEach(vl => {
      if (count === vl.at && !spokenRef.current.has(vl.at)) {
        spokenRef.current.add(vl.at);
        speak(vl.text, () => setSpokenText(vl.text));
      }
    });
    playCountBeep(count === 1);

    if (count <= 0) {
      setPhase("go");
      setTimeout(() => { setPhase("done"); onComplete(); }, 1200);
      return;
    }
    const timer = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, phase, onComplete]);

  if (phase === "done") return null;

  return (
    <Motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#060a14] cursor-pointer"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      onClick={phase === "loading" ? handleGesture : undefined}
    >
      <Starfield />

      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(r => (
          <Motion.div key={r}
            className="absolute rounded-full border border-white/[0.06]"
            style={{ width: r * 180, height: r * 180 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.08, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: r * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Central glow */}
      <Motion.div
        className="absolute rounded-full"
        style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 text-center" onClick={handleGesture}>
        <Motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 font-bold mb-6">
          {phase === "go" ? "Engines Ignited" : phase === "loading" ? "Preparing Systems" : "Launch Sequence Initiated"}
        </Motion.p>

        {/* Loading phase */}
        {phase === "loading" && (
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
            {/* Spinning loader */}
            <Motion.div
              className="w-16 h-16 rounded-full border-2 border-white/10 border-t-violet-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {/* Progress bar */}
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
              <Motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-white/25 text-xs">Loading voices & audio...</p>
            {!gestureRef.current && (
              <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="text-white/40 text-sm mt-2 cursor-pointer">
                Tap anywhere to enable voice
              </Motion.p>
            )}
          </Motion.div>
        )}

        {/* Countdown number */}
        <AnimatePresence mode="wait">
          {phase === "counting" && count > 0 ? (
            <Motion.div key={count}
              initial={{ scale: 0.3, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 2, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="text-[clamp(6rem,20vw,12rem)] font-black bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent leading-none select-none">
                {count}
              </span>
              {/* Ring burst on each number */}
              <Motion.div
                className="absolute inset-0 m-auto rounded-full border-2"
                style={{ width: 200, height: 200, borderColor: milestones[count % milestones.length]?.color || "#fff" }}
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </Motion.div>
          ) : phase === "go" ? (
            <Motion.div key="go"
              initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="relative"
            >
              <span className="text-[clamp(3rem,12vw,7rem)] font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent leading-none select-none">
                LIFTOFF!
              </span>
              <Motion.div className="text-6xl mt-4"
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >{"\u{1F680}"}</Motion.div>
            </Motion.div>
          ) : null}
        </AnimatePresence>

        {/* Progress dots */}
        {phase === "counting" && (
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: COUNTDOWN_FROM }, (_, i) => (
              <Motion.div key={i}
                className="w-1.5 h-1.5 rounded-full"
                animate={{ background: i < COUNTDOWN_FROM - count ? "#ec4899" : "rgba(255,255,255,0.15)", scale: i === COUNTDOWN_FROM - count - 1 ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        )}

        {/* Voice line text — shown only after speech finishes */}
        <AnimatePresence mode="wait">
          {phase === "counting" && spokenText && (
            <Motion.p key={spokenText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/30 text-sm md:text-base mt-6 max-w-md mx-auto italic"
            >"{spokenText}"</Motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <Motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          window.speechSynthesis?.cancel();
          setPhase("done");
          onComplete();
        }}
        className="absolute bottom-8 right-8 z-20 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/30 text-xs font-medium hover:text-white/60 hover:bg-white/10 transition-all"
      >
        Skip &rarr;
      </Motion.button>
    </Motion.div>
  );
};

/* ============ MAIN ============ */
const GameJourney = () => {
  const [launched, setLaunched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isFlying, setIsFlying] = useState(false);
  const [unlockedIndices, setUnlockedIndices] = useState([0]);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [rocketPos, setRocketPos] = useState(null);
  const [lineProgress, setLineProgress] = useState({});
  const [exhaustActive, setExhaustActive] = useState(false);
  const scrollRef = useRef(null);
  const animFrameRef = useRef(null);
  const thrusterStopRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 768 || (w < 1024 && h < 500));
      setIsPortrait(w < 768 && h > w);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", () => setTimeout(check, 150));
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  /* --- Layout constants (smaller for mobile landscape) --- */
  const mLandscape = isMobile && !isPortrait;
  const CIRCLE_SIZE = mLandscape ? 72 : 112; /* w-28 = 7rem = 112px, mobile: 72px */
  const CIRCLE_R = CIRCLE_SIZE / 2;
  const SPACING = mLandscape ? 180 : 300;
  const LEFT_PAD = mLandscape ? 80 : 120;

  /* Node center position - SINGLE SOURCE OF TRUTH for both SVG and DOM */
  const getCenter = useCallback((i) => ({
    x: LEFT_PAD + i * SPACING,
    y: (mLandscape ? 140 : 260) + (i % 2 === 0 ? 0 : (mLandscape ? 60 : 120)),
  }), [LEFT_PAD, SPACING, mLandscape]);

  /* Get line path from circle EDGE to circle EDGE */
  const getEdgePath = useCallback((i) => {
    const c1 = getCenter(i);
    const c2 = getCenter(i + 1);
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;
    /* Start/end at circle edge, not center */
    const sx = c1.x + ux * (CIRCLE_R + 4);
    const sy = c1.y + uy * (CIRCLE_R + 4);
    const ex = c2.x - ux * (CIRCLE_R + 4);
    const ey = c2.y - uy * (CIRCLE_R + 4);
    /* Cubic bezier with control points for a nice curve */
    const midX = (sx + ex) / 2;
    const cp1x = sx + (ex - sx) * 0.3;
    const cp2x = sx + (ex - sx) * 0.7;
    return `M${sx},${sy} C${cp1x},${sy} ${cp2x},${ey} ${ex},${ey}`;
  }, [getCenter, CIRCLE_R]);

  /* Animate rocket along path + draw line simultaneously */
  const animateTransition = useCallback((segIndex) => {
    const d = getEdgePath(segIndex);
    const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute("d", d);
    const totalLen = tempPath.getTotalLength();
    const duration = 1600;
    const startTime = performance.now();
    setExhaustActive(true);
    thrusterStopRef.current = playThruster();
    const c1 = getCenter(segIndex);
    setRocketPos({ x: c1.x, y: c1.y - 24 });

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
      const pt = tempPath.getPointAtLength(eased * totalLen);
      setRocketPos({ x: pt.x, y: pt.y - 24 });
      setLineProgress(prev => ({ ...prev, [segIndex]: eased }));
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        const next = segIndex + 1;
        setActiveIndex(next);
        setUnlockedIndices(prev => prev.includes(next) ? prev : [...prev, next]);
        setIsFlying(false);
        setRocketPos(null);
        setExhaustActive(false);
        if (thrusterStopRef.current) { thrusterStopRef.current(); thrusterStopRef.current = null; }
        playRocketLand();
        const landEl = document.querySelector(`[data-milestone="${next}"]`);
        const landRect = landEl?.getBoundingClientRect();
        const ox = landRect ? (landRect.left + landRect.width / 2) / window.innerWidth : 0.5;
        const oy = landRect ? (landRect.top + landRect.height / 2) / window.innerHeight : 0.5;
        confetti({ particleCount: 90 + next * 10, spread: 80, origin: { x: ox, y: oy }, colors: [milestones[next].color, "#fff", "#38bdf8"] });
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [getEdgePath, getCenter]);

  const handleAdvance = useCallback(() => {
    if (activeIndex >= milestones.length - 1 || isFlying) return;
    setIsFlying(true);
    if (!isMobile) {
      animateTransition(activeIndex);
    } else {
      setExhaustActive(true);
      thrusterStopRef.current = playThruster();
      setTimeout(() => {
        const next = activeIndex + 1;
        setActiveIndex(next);
        setUnlockedIndices(prev => prev.includes(next) ? prev : [...prev, next]);
        setIsFlying(false);
        setExhaustActive(false);
        if (thrusterStopRef.current) { thrusterStopRef.current(); thrusterStopRef.current = null; }
        playRocketLand();
        const mEl = document.querySelector(`[data-milestone="${next}"]`);
        const mRect = mEl?.getBoundingClientRect();
        const mx = mRect ? (mRect.left + mRect.width / 2) / window.innerWidth : 0.5;
        const my = mRect ? (mRect.top + mRect.height / 2) / window.innerHeight : 0.6;
        confetti({ particleCount: 80 + next * 10, spread: 70, origin: { x: mx, y: my }, colors: [milestones[next].color, "#fff", "#38bdf8"] });
      }, 900);
    }
  }, [activeIndex, isFlying, isMobile, animateTransition]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-milestone="${activeIndex}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }, [activeIndex]);

  useEffect(() => () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); }, []);

  const typeColors = { school: "from-blue-500 to-purple-500", college: "from-orange-500 to-red-500", work: "from-green-500 to-cyan-500" };
  const totalW = LEFT_PAD * 2 + (milestones.length - 1) * SPACING + CIRCLE_SIZE;
  const totalH = mLandscape ? 320 : 520;

  return (
    <div className="relative min-h-screen bg-[#060a14] text-white overflow-hidden">
      <Starfield />

      {/* Countdown launch gate */}
      <AnimatePresence>
        {!launched && <CountdownLaunch onComplete={() => setLaunched(true)} />}
      </AnimatePresence>

      {!launched ? null : (<>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Motion.div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <Motion.div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px]" animate={{ x: [0, -50, 0], y: [0, -60, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* Header */}
      <div className={`relative z-10 ${mLandscape ? "pt-16 pb-2 px-4" : "pt-24 pb-4 px-6"} text-center`}>
        <Motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-2 md:mb-4">
          <span className="text-xs px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 font-medium tracking-wider uppercase">Interactive Career Map</span>
        </Motion.div>
        <Motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className={`${mLandscape ? "text-2xl" : "text-4xl md:text-6xl"} font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2 md:mb-3`}>
          The Code Odyssey
        </Motion.h1>
        <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className={`text-white/40 ${mLandscape ? "text-xs" : "text-sm md:text-base"} max-w-md mx-auto mb-3 md:mb-6`}>
          Unlock each milestone to reveal the story behind the code
        </Motion.p>
        <ProgressBar current={activeIndex} total={milestones.length} />
      </div>

      {/* ======== MOBILE PORTRAIT: Rotate Prompt ======== */}
      {isMobile && isPortrait ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <Motion.div
            animate={{ rotate: [0, -90, -90, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
            className="text-7xl mb-8"
          >{"\u{1F4F1}"}</Motion.div>
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4"
          >Rotate to Landscape</Motion.h2>
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm max-w-xs leading-relaxed mb-6"
          >This interactive journey is best experienced in landscape mode. Please rotate your device to explore the full rocket adventure.</Motion.p>
          <Motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 text-white/25 text-xs"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Rotate device sideways
          </Motion.div>
        </div>
      ) : isMobile ? (
        <div ref={scrollRef} className="relative z-10 px-6 pb-36">
          <div className="relative ml-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-pink-500/30 to-yellow-500/30" />
            {milestones.map((m, i) => {
              const unlocked = unlockedIndices.includes(i);
              const active = i === activeIndex;
              return (
                <Motion.div key={m.id} data-milestone={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: unlocked ? 1 : 0.25, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }} className="relative pl-12 pb-8">
                  <Motion.div className={`absolute left-0 top-2 w-10 h-10 -translate-x-1/2 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-500
                    ${active ? "border-yellow-400 bg-yellow-500/20 shadow-[0_0_20px_rgba(250,204,21,0.3)]" : unlocked ? "bg-white/[0.06] border-white/15" : "bg-white/[0.02] border-white/10"}`}
                    style={unlocked && !active ? { borderColor: m.color + "50", background: m.color + "15" } : {}}
                    animate={active ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                    {active && isFlying ? (
                      <span className="relative">
                        <Motion.span animate={{ y: [0, -5, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-xl block">{"\u{1F680}"}</Motion.span>
                        {exhaustActive && <ExhaustParticles />}
                      </span>
                    ) : unlocked ? m.icon : "\u{1F512}"}
                  </Motion.div>
                  <Motion.div whileTap={unlocked ? { scale: 0.98 } : {}} onClick={() => unlocked && setSelectedMilestone(m)}
                    className={`rounded-2xl p-5 border backdrop-blur-sm transition-all cursor-pointer
                    ${active ? "bg-white/[0.08] border-white/15 shadow-lg" : unlocked ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]" : "bg-white/[0.01] border-white/[0.03]"}`}
                    style={active ? { borderColor: m.color + "40", boxShadow: `0 8px 40px -10px ${m.color}25` } : {}}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${typeColors[m.type]} text-white font-bold uppercase tracking-wider`}>{m.type}</span>
                      <span className="text-[11px] text-white/30 font-medium">{m.year}</span>
                    </div>
                    <h3 className={`font-bold text-base ${unlocked ? "text-white" : "text-white/25"}`}>{m.title}</h3>
                    {m.subtitle && <p className="text-xs text-white/40 mt-0.5">{m.subtitle}</p>}
                    {unlocked && <p className="text-xs text-white/30 mt-2 line-clamp-2 leading-relaxed">{m.description}</p>}
                    {unlocked && m.tech && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.tech.slice(0, 3).map((t, j) => <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">{t}</span>)}
                        {m.tech.length > 3 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/30">+{m.tech.length - 3}</span>}
                      </div>
                    )}
                  </Motion.div>
                </Motion.div>
              );
            })}
          </div>
          {activeIndex < milestones.length - 1 && (
            <Motion.div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" initial={{ y: 80 }} animate={{ y: 0 }}>
              <Motion.button onClick={handleAdvance} disabled={isFlying} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 text-white font-bold text-base shadow-2xl shadow-pink-500/20 flex items-center gap-3 disabled:opacity-40">
                {isFlying ? (<><Motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>{"\u{2728}"}</Motion.span> Warping...</>) : (<>{"\u{1F680}"} Next Level</>)}
              </Motion.button>
            </Motion.div>
          )}
          {activeIndex === milestones.length - 1 && (
            <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-6 p-8 bg-gradient-to-br from-yellow-500/[0.08] via-pink-500/[0.06] to-cyan-500/[0.08] rounded-3xl border border-yellow-500/15">
              <span className="text-5xl block mb-3">{"\u{1F3C6}"}</span>
              <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Journey Complete!</h3>
              <p className="text-white/40 text-sm mt-2">5+ years of engineering excellence</p>
              <Motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setActiveIndex(0); setUnlockedIndices([0]); setLineProgress({}); setRocketPos(null); }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                {"\u{1F504}"} Reset Journey
              </Motion.button>
            </Motion.div>
          )}
        </div>
      ) : (
        /* ======== DESKTOP ======== */
        <div ref={scrollRef} className="relative z-10 overflow-x-auto pb-36 hide-scrollbar">
          {/* SINGLE CONTAINER: SVG + Nodes share same coordinate space */}
          <div style={{ width: totalW, height: totalH, position: "relative" }}>

            {/* SVG lines layer */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: totalW, height: totalH, pointerEvents: "none" }}>
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" /><stop offset="50%" stopColor="#ec4899" /><stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              {milestones.slice(0, -1).map((_, i) => {
                const lp = lineProgress[i];
                const isCompleted = lp === undefined && unlockedIndices.includes(i + 1);
                const isAnimating = lp !== undefined;
                if (!isCompleted && !isAnimating) return null;
                const d = getEdgePath(i);
                if (isCompleted) {
                  return <path key={`c-${i}`} d={d} fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" filter="url(#glow)" />;
                }
                /* Animating: use dashoffset to reveal */
                const tempP = document.createElementNS("http://www.w3.org/2000/svg", "path");
                tempP.setAttribute("d", d);
                const len = tempP.getTotalLength();
                return <path key={`a-${i}`} d={d} fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" filter="url(#glow)"
                  strokeDasharray={len} strokeDashoffset={len * (1 - (lp || 0))} />;
              })}
            </svg>

            {/* Nodes layer - SAME coordinate space as SVG */}
            {milestones.map((m, i) => {
              const c = getCenter(i);
              const unlocked = unlockedIndices.includes(i);
              const active = i === activeIndex && !rocketPos;
              return (
                <Motion.div key={m.id} data-milestone={i} className="absolute flex flex-col items-center"
                  style={{ left: c.x - CIRCLE_SIZE / 2, top: c.y - CIRCLE_SIZE / 2, width: CIRCLE_SIZE }}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: unlocked ? 1 : 0.2, scale: unlocked ? 1 : 0.65 }}
                  transition={{ duration: 0.6, delay: i * 0.06, type: "spring" }}>
                  {/* Planet circle */}
                  <Motion.div onClick={() => unlocked && setSelectedMilestone(m)}
                    className="relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 border-2"
                    style={{
                      width: CIRCLE_SIZE, height: CIRCLE_SIZE,
                      borderColor: active ? m.color : unlocked ? m.color + "30" : "rgba(255,255,255,0.08)",
                      background: active ? `linear-gradient(135deg, ${m.color}25, ${m.color}10)` : unlocked ? m.color + "08" : "rgba(255,255,255,0.02)",
                      boxShadow: active ? `0 0 40px ${m.color}30, 0 0 80px ${m.color}15` : "none",
                    }}
                    whileHover={unlocked ? { scale: 1.1 } : {}} whileTap={unlocked ? { scale: 0.95 } : {}}>
                    {active && <Motion.div className="absolute inset-[-12px] rounded-full border border-dashed" style={{ borderColor: m.color + "30" }}
                      animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />}
                    {active && <Motion.div className="absolute inset-0 rounded-full" style={{ background: m.color + "15" }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />}
                    <span className={`${mLandscape ? "text-2xl" : "text-4xl"} select-none relative z-10`}>{unlocked ? m.icon : "\u{1F512}"}</span>
                  </Motion.div>
                </Motion.div>
              );
            })}

            {/* Labels below the single container in same coord space */}
            {milestones.map((m, i) => {
              const c = getCenter(i);
              const unlocked = unlockedIndices.includes(i);
              return (
                <div key={`lbl-${i}`} className="absolute text-center" style={{ left: c.x - (mLandscape ? 55 : 80), top: c.y + CIRCLE_R + (mLandscape ? 6 : 12), width: mLandscape ? 110 : 160 }}>
                  <span className={`${mLandscape ? "text-[8px]" : "text-[10px]"} px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block`} style={{ background: m.color + "20", color: m.color }}>{m.year}</span>
                  <h3 className={`${mLandscape ? "text-[9px]" : "text-xs"} font-bold mt-1 leading-tight ${unlocked ? "text-white/90" : "text-white/20"}`}>{m.title}</h3>
                  {m.subtitle && <p className={`${mLandscape ? "text-[8px]" : "text-[10px]"} text-white/30 mt-0.5`}>{m.subtitle}</p>}
                </div>
              );
            })}

            {/* Rocket with exhaust */}
            {rocketPos && (
              <div className="absolute z-30 pointer-events-none" style={{ left: rocketPos.x - (mLandscape ? 12 : 18), top: rocketPos.y - (mLandscape ? 12 : 18) }}>
                <Motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 0.3, repeat: Infinity }}
                  className={`${mLandscape ? "text-2xl" : "text-4xl"} relative`}>
                  {"\u{1F680}"}
                  <ExhaustParticles />
                </Motion.div>
              </div>
            )}
          </div>

          {/* Bottom button */}
          <div className={`fixed ${mLandscape ? "bottom-3" : "bottom-8"} left-1/2 -translate-x-1/2 z-50`}>
            {activeIndex < milestones.length - 1 ? (
              <Motion.button onClick={handleAdvance} disabled={isFlying}
                whileHover={{ scale: 1.04, boxShadow: "0 0 50px 10px rgba(236,72,153,0.2)" }} whileTap={{ scale: 0.96 }}
                className={`${mLandscape ? "px-6 py-2.5 rounded-xl text-sm" : "px-10 py-4 rounded-2xl text-lg"} bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 text-white font-bold shadow-2xl flex items-center gap-3 backdrop-blur-sm disabled:opacity-40 transition-all`}>
                {isFlying ? (<><Motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>{"\u{2728}"}</Motion.span> Warping...</>) : (
                  <>{"\u{1F680}"} Launch to Next Level <span className="text-sm opacity-50 ml-1">({milestones[activeIndex + 1].title.split(" ").slice(0, 2).join(" ")}...)</span></>
                )}
              </Motion.button>
            ) : (
              <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4">
                <div className="px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/15 via-pink-500/15 to-cyan-500/15 border border-yellow-500/20 text-white font-bold text-lg backdrop-blur-xl text-center">
                  {"\u{1F3C6}"} Journey Complete
                </div>
                <Motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setActiveIndex(0); setUnlockedIndices([0]); setLineProgress({}); setRocketPos(null); }}
                  className="px-6 py-4 rounded-2xl bg-white/[0.06] border border-white/15 text-white font-semibold text-sm backdrop-blur-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  {"\u{1F504}"} Reset Journey
                </Motion.button>
              </Motion.div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md" onClick={() => setSelectedMilestone(null)}>
            <MilestoneCard milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />
          </Motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      </>)}
    </div>
  );
};

export default GameJourney;
