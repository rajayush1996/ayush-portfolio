import { motion as Motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="hero-section relative h-screen w-full overflow-hidden text-white bg-black">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0">
        <Motion.div
          className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"
          animate={{ x: [0, 120, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[120px] opacity-30"
          animate={{ x: [0, -140, 0], y: [0, -90, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute top-[30%] left-[50%] w-[200px] h-[200px] bg-yellow-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
          animate={{ scale: [1, 1.4, 1], x: [-50, 50, -50] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute top-[60%] left-[20%] w-[180px] h-[180px] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
          animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Badge */}
        <Motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-6">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/70">
            Senior Technical Lead @ Ernst & Young (EY)
          </span>
        </Motion.div>

        <TypeAnimation
          sequence={[
            "Ayush Raj", 4000,
            "Senior Software Engineer", 3000,
            "System Design Expert", 3000,
            "Java | Spring Boot | AWS", 3000,
            "React | Node.js | Microservices", 3000,
            "Building at 1.5K TPS", 3000,
          ]}
          speed={60}
          deletionSpeed={40}
          repeat={Infinity}
          wrapper="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-lg leading-tight"
        />

        <Motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-white/70 leading-relaxed"
        >
          5+ years crafting scalable distributed systems, microservices & beautiful frontends.
          <br className="hidden md:block" />
          <span className="text-white/90 font-medium">99.9% uptime</span> &middot; <span className="text-white/90 font-medium">1.5K TPS</span> &middot; <span className="text-white/90 font-medium">Cloud Native</span>
        </Motion.p>

        <Motion.div
          className="flex flex-wrap justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Motion.a href="#projects" whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.4)" }} whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-semibold text-white shadow-lg shadow-pink-500/25 transition-all">
            View Projects
          </Motion.a>
          <Motion.a href="/files/Ayush_Raj-Resume.pdf" target="_blank" whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 border border-white/30 rounded-full text-white backdrop-blur-sm transition-all">
            Download Resume
          </Motion.a>
        </Motion.div>

        {/* Scroll indicator */}
        <Motion.div className="absolute bottom-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <Motion.div className="w-1.5 h-3 bg-white/60 rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
