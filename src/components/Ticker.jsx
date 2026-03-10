import React from "react";

const tickerItems = [
  "\u{1F680} Services Built: 25+",
  "\u{1F41B} Production Issues Resolved: 350+",
  "\u{1F4BC} Companies: Psych x86 \u2192 Kore.ai \u2192 Xwola \u2192 EY",
  "\u26A1 TPS Handled: 1.5K",
  "\u2615 Chai Consumed: \u221E",
  "\u{1F4BB} Java | Spring Boot | Node.js | AWS | React",
  "\u{1F3C6} Google Code Jam Qualifier 2018 & 2019",
  "\u2B50 HackerRank 5-Star Gold Badge",
  "\u{1F4CA} 99.9% System Uptime",
  "\u{1F3AF} System Design & Microservices Expert",
];

const Ticker = () => {
  return (
    <div className="bg-black/80 backdrop-blur-sm overflow-hidden border-t border-b border-white/5 py-3">
      <div className="whitespace-nowrap animate-ticker text-white text-sm font-mono flex gap-16 px-8">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={index} className="text-white/60 hover:text-cyan-400 transition-colors duration-300">
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: inline-flex;
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
