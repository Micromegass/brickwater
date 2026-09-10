"use client";

import { Canvas } from "@react-three/fiber";
import { BrickWall } from "./BrickWall";
import type { WordmarkLayout } from "@/lib/hero/types";

interface Props {
  layout: WordmarkLayout;
  onReady: () => void;
}

export default function HeroCanvas({ layout, onReady }: Props) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      flat
      camera={{ fov: 22, position: [0, 0, 26], near: 1, far: 80 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#fff5e8", "#c9b3a4", 0.55]} />
      <directionalLight position={[4, 6, 8]} intensity={1.35} />
      <directionalLight position={[-6, -2, 4]} intensity={0.35} color="#dcebee" />
      <BrickWall layout={layout} onReady={onReady} />
    </Canvas>
  );
}
