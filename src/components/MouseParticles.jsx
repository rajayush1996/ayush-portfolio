import React, { useEffect, useRef } from "react";

const MAX_PARTICLES = 24;
const PARTICLE_LIFE = 800;

const MouseParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    let animId;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return; /* throttle ~20fps */
      lastTime = now;
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x: e.clientX,
        y: e.clientY,
        born: now,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.5,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.born;
        if (age > PARTICLE_LIFE) { particles.splice(i, 1); continue; }
        const t = age / PARTICLE_LIFE;
        const alpha = 1 - t;
        const r = 3 * (1 - t * 0.5);
        p.x += p.vx;
        p.y += p.vy;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        gradient.addColorStop(0, `rgba(0,240,255,${alpha})`);
        gradient.addColorStop(1, `rgba(255,0,229,${alpha * 0.5})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default MouseParticles;
