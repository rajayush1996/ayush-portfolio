// SkillCard3D.tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const FlippingCard = ({ skill }) => {
    const mesh = useRef(null);
    const [flipped, setFlipped] = useState(false);
  
    // 🔁 Auto flip once on mount
    useEffect(() => {
      const timeout = setTimeout(() => setFlipped(true), 400);
      return () => clearTimeout(timeout);
    }, []);
  
    useFrame(() => {
      if (!mesh.current) return;
      const target = flipped ? Math.PI : 0;
      mesh.current.rotation.y += (target - mesh.current.rotation.y) * 0.1;
    });
  
    return (
      <mesh
        ref={mesh}
        onClick={() => setFlipped(!flipped)}
        scale={[2.5, 3.5, 0.1]}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 1.4, 0.05]} />
        <meshStandardMaterial color={"#222"} />
  
        {/* ✅ Fix flipped HTML with counter-rotation */}
        <Html
          transform
          position={[0, 0, 0.06]}
          distanceFactor={1.5}
          zIndexRange={[100, 0]}
          style={{
            transform: "rotateY(180deg)", // ✨ Key fix
          }}
        >
          <div className="w-64 p-4 bg-white rounded-xl shadow-xl text-black text-center pointer-events-auto">
            <img
              src={skill.src}
              alt={skill.name}
              className="h-20 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-bold">{skill.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {skill.summary || "No description available."}
            </p>
            {skill.link && (
              <a
                href={skill.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold underline"
              >
                Learn More →
              </a>
            )}
          </div>
        </Html>
      </mesh>
    );
  };
  

const SkillCard3D = ({ skill, onClose }) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur">
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white text-3xl z-[9999]"
      >
        ✖
      </button>

      {/* ✅ Now this canvas is sized like a card */}
      <div className="w-[300px] h-[420px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FlippingCard skill={skill} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default SkillCard3D;
