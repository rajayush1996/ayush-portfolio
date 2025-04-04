import React from "react";

const tickerItems = [
  "🚀 Projects: 18+",
  "🐛 Bugs Fixed: 1200+",
  "💼 Clients Served: 10+",
  "☕ Chai Consumed: ∞",
  "💻 Technologies: React, Node, MongoDB, AWS",
  "🏆 Certifications: NPTEL, Hackerrank 5⭐",
  "🎯 Code Jam: 2x Qualified",
];

const Ticker = () => {
  return (
    <div className="bg-black overflow-hidden border-t border-b border-white/10 py-2">
      <div className="whitespace-nowrap animate-ticker text-white text-sm font-mono flex gap-16 px-8">
        {tickerItems.map((item, index) => (
          <span key={index} className="text-white/70 hover:text-cyan-400 transition">
            {item}
          </span>
        ))}
        {/* Duplicate items to make it loop smoothly */}
        {tickerItems.map((item, index) => (
          <span key={`dup-${index}`} className="text-white/70 hover:text-pink-400 transition">
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .animate-ticker {
          display: inline-block;
          animation: ticker 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
