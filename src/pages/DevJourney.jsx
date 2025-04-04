import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion as Motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

const ANIMATION_DURATION = 1.2; // seconds
const TOTAL_FRAMES = 60 * ANIMATION_DURATION;
let currentFrame = 0;

// Fullscreen flowing curve points
const generateMilestones = () => {
  const baseX = 100;
  const stepX = 250;
  const yFlow = [120, 380, 180, 300, 140, 420, 200, 260]; // natural ups/downs

  const raw = [
    { title: "🏫 Saraswati Sisu Vidya Mandir", year: "Start" },
    { title: "🏫 Central Academy (Till 7th)", year: "" },
    { title: "🎓 PND Jain High School", year: "2012" },
    { title: "🎓 Kendriya Vidyalaya (12th)", year: "2014" },
    { title: "🎓 B.Tech – ACE (KU)", year: "2020" },
    { title: "💼 Psych x86", year: "2022" },
    { title: "💼 Kore.ai", year: "2024" },
    { title: "💼 Xwola Pvt. Ltd.", year: "Present" },
  ];

  return raw.map((m, i) => ({
    ...m,
    x: baseX + i * stepX,
    y: yFlow[i % yFlow.length],
  }));
};

const getCubicPath = (p1, p2) => {
  const dx = (p2.x - p1.x) / 2;
  return `M${p1.x} ${p1.y} C${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${
    p2.x
  } ${p2.y}`;
};

const GameJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawnSegments, setDrawnSegments] = useState([]);
  const [hovered, setHovered] = useState(false);

  const containerRef = useRef(null);

  const milestones = useMemo(() => generateMilestones(), []);
  const vehicleControls = useAnimation();

  const pathRefs = useRef([]);
  const animatedPaths = useRef(new Set());

  const pathSegments = useMemo(() => {
    return milestones.slice(1).map((m, i) => getCubicPath(milestones[i], m));
  }, [milestones]);

  const handleNext = () => {
    if (activeIndex < milestones.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const animatePath = (index, element) => {
    const pathLength = element.getTotalLength();
    element.style.strokeDasharray = pathLength;
    element.style.strokeDashoffset = pathLength;

    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (ANIMATION_DURATION * 1000), 1);
      const offset = pathLength * (1 - progress);

      element.style.strokeDashoffset = offset;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Confetti + auto-scroll
  useEffect(() => {
    if (activeIndex === 0) return;

    const i = activeIndex - 1;

    if (!drawnSegments.includes(i)) {
      setDrawnSegments((prev) => [...prev, i]);

      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: {
            x: milestones[activeIndex].x / 2000,
            y: milestones[activeIndex].y / 500,
          },
        });
      }, 1200);
    }

    const scrollContainer = containerRef.current;
    const scrollX =
      milestones[activeIndex].x - scrollContainer.clientWidth / 2 + 100;

    scrollContainer.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });
  }, [activeIndex, drawnSegments, milestones]);

  // Vehicle animation along curve
  useEffect(() => {
    if (activeIndex === 0) return;

    const i = activeIndex - 1;
    const pathString = pathSegments[i];
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathString);
    const pathLength = path.getTotalLength();

    const prevX = milestones[i].x;
    const nextX = milestones[i + 1].x;
    const direction = nextX < prevX ? 1 : -1;

    currentFrame = 0;

    const animateFrame = () => {
      const progress = currentFrame / TOTAL_FRAMES;
      const point = path.getPointAtLength(progress * pathLength);

      vehicleControls.set({
        left: point.x - 16,
        top: point.y - 24,
        scaleX: direction,
      });

      currentFrame++;
      if (currentFrame <= TOTAL_FRAMES) {
        requestAnimationFrame(animateFrame);
      }
    };

    animateFrame();
  }, [activeIndex, milestones, pathSegments, vehicleControls]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0f172a] text-white px-6 py-16 overflow-x-auto"
    >
      <h2 className="text-4xl font-bold text-center mt-20 mb-12 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
        🎮 Dev Footprint Journey
      </h2>

      <div className="w-full">
        <div className="relative w-[2000px] h-[500px]">
          <svg viewBox="0 0 2000 500" className="w-full h-full">
            {drawnSegments.map((i) => (
              <path
                key={i}
                ref={(el) => {
                  if (el && !animatedPaths.current.has(i)) {
                    animatedPaths.current.add(i);
                    pathRefs.current[i] = el;
                    animatePath(i, el);
                  }
                }}
                d={pathSegments[i]}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            ))}

            {milestones.slice(0, activeIndex + 1).map((m, i) => (
              <Motion.circle
                key={i}
                cx={m.x}
                cy={m.y}
                r={14}
                fill={i === activeIndex ? "#facc15" : "#38bdf8"}
                stroke="#fff"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            ))}

            {milestones.slice(0, activeIndex + 1).map((m, i) => (
              <Motion.text
                key={`text-${i}`}
                x={m.x}
                y={m.y - 30}
                textAnchor="middle"
                fill="#fff"
                className="text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {m.title}
              </Motion.text>
            ))}

            {milestones.slice(0, activeIndex + 1).map((m, i) =>
              m.year ? (
                <Motion.text
                  key={`year-${i}`}
                  x={m.x}
                  y={m.y + 30}
                  textAnchor="middle"
                  fill="#aaa"
                  className="text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {m.year}
                </Motion.text>
              ) : null
            )}
          </svg>
          <Motion.div
            className="absolute text-2xl"
            animate={vehicleControls}
            transition={{ type: "tween", duration: 0.4 }}
            style={{
              // left: milestones[activeIndex].x - 16,
              // top: milestones[activeIndex].y - 20,
              scaleX: -1,
            }}
          >
            🚗
          </Motion.div>

          {/* 🚗 Vehicle following path */}

          {/* Button below current milestone */}
          <Motion.div
            className="absolute"
            animate={{
              left: milestones[activeIndex].x - 80,
              top: milestones[activeIndex].y + 80,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Motion.button
              onClick={handleNext}
              disabled={activeIndex === milestones.length - 1}
              animate={{ width: hovered ? 180 : 48 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`
                h-12
                bg-amber-500
                text-black
                font-bold
                rounded-full
                flex items-center
                relative
                overflow-hidden
                shadow-md
                transition-all
                border border-yellow-300
                ${hovered ? "shadow-[0_0_20px_6px_rgba(251,191,36,0.6)]" : ""}
              `}
            >
              {/* Circle with arrow, triggers expansion */}
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full text-xl cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                ➡️
              </div>

              {/* Reveal text only when hovered */}
              <Motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  x: hovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-14 text-sm whitespace-nowrap pointer-events-none text-white font-semibold"
              >
                Next Checkpoint
              </Motion.span>
            </Motion.button>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameJourney;
