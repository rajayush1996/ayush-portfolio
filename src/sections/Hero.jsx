import { motion as Motion } from "framer-motion";
// import { useEffect } from "react";
// import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";

// gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // useEffect(() => {
  //   const text = document.getElementById("animated-text");
  //   const chars = text.innerText.split("");
  //   text.innerHTML = "";

  //   chars.forEach((char) => {
  //     const span = document.createElement("span");
  //     span.textContent = char;
  //     span.style.display = "inline-block";
  //     span.style.opacity = 0;
  //     span.style.transform = "translateY(20px)";
  //     text.appendChild(span);
  //   });

  //   gsap.to("#animated-text span", {
  //     opacity: 1,
  //     y: 0,
  //     stagger: 0.1,
  //     duration: 0.6,
  //     ease: "easeOut",
  //   });
  // }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden text-white bg-black">
      {/* 🔮 Floating Blobs / Background FX */}
      <Motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 z-0"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-40 z-0"
        animate={{ x: [0, -120, 0], y: [0, -80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute top-[40%] left-[45%] w-[150px] h-[150px] bg-yellow-400 rounded-full mix-blend-screen filter blur-2xl opacity-30 z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🧠 Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <TypeAnimation
          sequence={[
            "Ayush Raj",
            10000, // Show for 10s
            "",
            1000, // Clear for 1s
            "Creative Developer",
            10000,
            "",
            1000,
            "React | GSAP | Tailwind",
            10000,
            "",
            1000,
            "FullStack Engineer",
            10000,
            "",
            1000,
          ]}
          speed={90} // Typing speed (lower = faster)
          deletionSpeed={30} // Optional: control delete speed
          repeat={Infinity}
          wrapper="h1"
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-lg"
        />

        <Motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-xl max-w-xl text-white/80"
        >
          Full Stack Engineer • UI Enthusiast • Creative Developer
        </Motion.p>

        <Motion.div
          className="flex flex-wrap justify-center gap-4 mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-semibold text-white hover:scale-105 transition-all shadow-lg"
          >
            View Projects
          </a>
          <a
            href="/files/Ayush_Raj-Resume.pdf"
            target="_blank"
            className="px-6 py-3 border border-white rounded-full text-white hover:bg-white/10 hover:scale-105 transition-all"
          >
            Download Resume
          </a>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
