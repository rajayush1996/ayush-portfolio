import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const links = ["Home", "About", "Projects", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-white tracking-widest z-50">AYUSH</h1>

        {/* Hamburger */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8"
          >
            <Motion.span
              className="block w-6 h-0.5 bg-white"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Motion.span
              className="block w-6 h-0.5 bg-white my-1"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <Motion.span
              className="block w-6 h-0.5 bg-white"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-white text-sm font-medium items-center">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleNavClick(link.toLowerCase())}
                className="relative group transition-all duration-300 hover:tracking-wide hover:scale-105"
              >
                {link}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>
          ))}
          <Link
            to="/journey"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 transition-all text-sm font-semibold shadow-lg"
          >
            🎮 Dev Quest
          </Link>
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.ul
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 right-0 w-2/3 h-screen bg-[#0f172a] text-white flex flex-col gap-6 items-start px-8 py-20 text-lg font-medium z-40"
          >
            {links.map((link) => (
              <li key={link}>
                <button onClick={() => handleNavClick(link.toLowerCase())}>
                  {link}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/journey"
                onClick={() => setMenuOpen(false)}
                className="inline-block mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold"
              >
                🎮 Dev Quest
              </Link>
            </li>
          </Motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
