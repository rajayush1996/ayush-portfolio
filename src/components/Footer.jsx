import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const socials = [
    { icon: "mdi:github", link: "https://github.com/rajayush1996" },
    { icon: "mdi:linkedin", link: "https://linkedin.com/in/ayushraj709" },
    { icon: "mdi:email", link: "mailto:ayushraj709@gmail.com" },
  ];

  return (
    <footer className="relative bg-[#0f172a] border-t border-white/10 py-12 px-6 text-white text-center">
      {/* Cosmic Stars BG */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
          © {new Date().getFullYear()} Ayush Raj — Built with ❤️ & React
        </h3>

        <div className="flex justify-center gap-6">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-pink-500 transition-all duration-300 text-xl"
            >
              <Icon icon={s.icon} />
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all duration-300"
        >
          <Icon icon="mdi:arrow-up" className="mr-2" />
          Back to Top
        </button>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
