"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function RotatingBox() {
  const meshRef = useRef<Mesh>(null);

  // Анимейшн давталт дотор кубыг эргүүлнэ
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh" }}>
      {/* Гэрэлтүүлэг нэмэх */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Эргэлддэг кубыг харуулах */}
      <RotatingBox />
    </Canvas>
  );
}

export default App;
