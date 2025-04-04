import React, { useEffect } from "react";

const MouseParticles = () => {
  useEffect(() => {
    // const particles = [];

    const createParticle = (x, y) => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    };

    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <style>{`
      .particle {
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: radial-gradient(circle, #00f0ff, #ff00e5);
        pointer-events: none;
        animation: particle-fade 1s ease-out;
        z-index: 9999;
      }

      @keyframes particle-fade {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.5) translateY(-20px);
        }
      }
    `}</style>
  );
};

export default MouseParticles;
