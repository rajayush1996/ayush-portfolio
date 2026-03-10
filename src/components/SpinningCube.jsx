import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion as Motion } from "framer-motion";
import gsap from "gsap";

const FACE_IMAGES = [
  "/images/mswipe.png",
  "/images/saffola.webp",
  "/images/image.png",
  "/images/niyogin.png",
  "/images/smartAssist.svg",
  "/images/placeholder.svg",
];

const FACE_LABELS = [
  "Mswipe Loans",
  "Saffola Platform",
  "Change of Ownership",
  "Niyogin Fintech",
  "SmartAssist AI",
  "Roberto Beach",
];

/* 3D Cube with textures */
const ProjectCube = ({ onFaceClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const textures = useLoader(THREE.TextureLoader, FACE_IMAGES);

  const materials = useMemo(() =>
    textures.map((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.3,
        metalness: 0.15,
        emissive: new THREE.Color("#111"),
        emissiveIntensity: 0.1,
      });
    }), [textures]);

  useFrame((_, delta) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.08;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const mesh = meshRef.current;
    if (!mesh) return;
    /* GSAP spin */
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + Math.PI * 2,
      duration: 1.2,
      ease: "power2.inOut",
    });
    /* Determine which face was clicked */
    if (e.faceIndex !== undefined) {
      const faceIdx = Math.floor(e.faceIndex / 2);
      if (onFaceClick) onFaceClick(faceIdx);
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        material={materials}
        onClick={handleClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
        scale={hovered ? 2.3 : 2.1}
      >
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </Float>
  );
};

/* Orbiting particles */
const Particles = () => {
  const ref = useRef();
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* Glowing ring */
const GlowRing = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[3.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#c084fc" transparent opacity={0.25} />
    </mesh>
  );
};

const GlowRing2 = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.12;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0.5, 0]}>
      <torusGeometry args={[3.6, 0.01, 16, 100]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
    </mesh>
  );
};

/* Face info popup */
const FaceInfo = ({ index, onClose }) => (
  <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a]/95 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10 shadow-2xl">
    <div className="flex items-center gap-3">
      <img src={FACE_IMAGES[index]} alt="" className="w-12 h-12 rounded-lg object-cover bg-white/5" />
      <div>
        <h4 className="text-white font-bold text-sm">{FACE_LABELS[index]}</h4>
        <p className="text-white/40 text-xs">Click & drag to explore all faces</p>
      </div>
      <button onClick={onClose} className="ml-4 text-white/30 hover:text-white text-lg">{"\u2715"}</button>
    </div>
  </Motion.div>
);

/* Loading placeholder */
const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-3">
      <Motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full" />
      <span className="text-white/40 text-sm">Loading 3D...</span>
    </div>
  </Html>
);

const SpinningCube = () => {
  const [clickedFace, setClickedFace] = useState(null);

  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <Motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-block mb-4">
          <span className="text-xs px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 font-medium tracking-wider uppercase">
            3D Showcase
          </span>
        </Motion.div>
        <Motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black mb-3">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Explore My Work in 3D
          </span>
        </Motion.h2>
        <Motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-white/40 text-sm md:text-base max-w-lg mx-auto">
          Click the cube to spin {"\u2022"} Drag to orbit
        </Motion.p>
      </div>

      {/* 3D Canvas Container - bordered, constrained */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-[0_0_80px_-20px_rgba(139,92,246,0.15)]"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          
          <div className="h-[500px] md:h-[600px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#c084fc" />
              <pointLight position={[0, 3, 0]} intensity={0.4} color="#38bdf8" />
              <Suspense fallback={<Loader />}>
                <ProjectCube onFaceClick={(idx) => setClickedFace(idx)} />
              </Suspense>
              <Particles />
              <GlowRing />
              <GlowRing2 />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={false}
                dampingFactor={0.05}
                enableDamping
              />
            </Canvas>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </Motion.div>

        {/* Bottom hint */}
        <div className="text-center mt-5">
          <Motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-white/20 inline-flex items-center gap-2">
            {"\u{1F5B1}\uFE0F"} Drag to orbit {"\u2022"} Click to spin
          </Motion.span>
        </div>
      </div>

      {/* Face info popup */}
      {clickedFace !== null && (
        <FaceInfo index={clickedFace} onClose={() => setClickedFace(null)} />
      )}
    </section>
  );
};

export default SpinningCube;
