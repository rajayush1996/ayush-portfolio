import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";
import { Text } from "@react-three/drei";

const AnimatedCube = () => {
  const cubeRef = useRef();

  // Continuous rotation
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.005;
    }
  });

  // Click handler to spin cube using GSAP
  const handleCubeClick = () => {
    if (cubeRef.current) {
      gsap.to(cubeRef.current.rotation, {
        x: cubeRef.current.rotation.x + Math.PI * 2,
        y: cubeRef.current.rotation.y + Math.PI * 2,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <mesh ref={cubeRef} onClick={handleCubeClick}>
      <boxGeometry args={[2, 2, 2]} />

      {/* 6 Textured Faces using meshBasicMaterial */}
      <meshBasicMaterial
        attach="material-0"
        map={new THREE.TextureLoader().load("/images/mswipe.png")}
      />
      <meshBasicMaterial
        attach="material-1"
        map={new THREE.TextureLoader().load("/images/saffola.webp")}
      />
      <meshBasicMaterial
        attach="material-2"
        map={new THREE.TextureLoader().load("/images/image.png")}
      />
      <meshBasicMaterial
        attach="material-3"
        map={new THREE.TextureLoader().load("/images/niyogin.png")}
      />
      <meshBasicMaterial
        attach="material-4"
        map={new THREE.TextureLoader().load("/images/smartAssist.svg")}
      />
      <meshBasicMaterial
        attach="material-5"
        map={new THREE.TextureLoader().load("/images/saffola.webp")}
      />
    </mesh>
  );
};

const SpinningCube = () => {
  return (
    <div className="h-screen w-full bg-black">
      <section className="relative h-screen w-full bg-black overflow-hidden">
        {/* 🔼 Top title */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center text-white text-2xl font-bold">
          Explore My Work in 3D
        </div>
        

        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedCube />
          
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>
    </div>
  );
};

export default SpinningCube;
