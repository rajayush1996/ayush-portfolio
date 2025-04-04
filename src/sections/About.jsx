import React from "react";
import { motion as Motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-b from-[#0f172a] to-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 via-yellow-400 to-fuchsia-500 text-transparent bg-clip-text">
        About Me
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Blob Background + Avatar */}
        <div className="relative w-full flex justify-center">
          <Motion.div
            className="absolute w-72 h-72 bg-gradient-to-tr from-pink-500 via-yellow-300 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse z-0"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <Motion.img
            src="/images/ayush.png"
            alt="Ayush Raj Avatar"
            className="relative z-10 w-60 h-60 rounded-full shadow-2xl border-4 border-white/20 object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Bio Content */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white-80 text-lg leading-relaxed z-10"
        >
          <p className="mb-4">
            I'm <span className="text-white font-bold">Ayush Raj</span>, a passionate full stack
            developer who loves crafting vibrant UIs, solving deep logic, and building unforgettable
            web experiences. With 3.8+ years of professional experience, I specialize in modern
            JavaScript stacks, microservices, and pixel-perfect frontends.
          </p>
          <p>
            Whether it's blazing fast APIs, smooth UI animation, or colorful product interfaces, I
            build it with ❤️, purpose, and polish.
          </p>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
