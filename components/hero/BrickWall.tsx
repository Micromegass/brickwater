"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { WordmarkLayout } from "@/lib/hero/types";

export const WALL_WIDTH = 10;
const MAX_RIPPLES = 8;
const ASSEMBLE_DURATION = 1.5;
const MAX_DELAY = 1.1;
const RIPPLE_LIFE = 3.2;

interface Ripple {
  x: number;
  y: number;
  t0: number;
  strength: number;
}

interface Props {
  layout: WordmarkLayout;
  onReady?: () => void;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERTEX_HEAD = /* glsl */ `
uniform float uTime;
uniform float uAssembleDur;
uniform float uRippleCount;
uniform vec4 uRipples[${MAX_RIPPLES}];
uniform float uK;
uniform float uOmega;
uniform float uDecay;
uniform float uSpread;
uniform float uSpeed;
uniform float uAmp;
attribute vec3 aStart;
attribute float aDelay;
attribute float aSeed;
`;

const VERTEX_BODY = /* glsl */ `
vec3 transformed = vec3(position);
vec2 c = instanceMatrix[3].xy;
float p = clamp((uTime - aDelay) / uAssembleDur, 0.0, 1.0);
float e = p >= 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * p);
vec3 offset = aStart * (1.0 - e);
float spin = (1.0 - e) * (aSeed - 0.5) * 2.4;
float cs = cos(spin);
float sn = sin(spin);
transformed.xy = mat2(cs, -sn, sn, cs) * transformed.xy;
float z = 0.0;
for (int i = 0; i < ${MAX_RIPPLES}; i++) {
  if (float(i) >= uRippleCount) break;
  vec4 r = uRipples[i];
  float age = uTime - r.z;
  if (age < 0.0) continue;
  float d = distance(c, r.xy);
  float front = smoothstep(0.0, 0.6, age * uSpeed - d + 0.6);
  z += sin(d * uK - age * uOmega) * exp(-age * uDecay) * exp(-d * uSpread) * r.w * front;
}
offset.z += z * uAmp * e;
transformed += offset;
`;

function createUniforms() {
  return {
    uTime: { value: 0 },
    uAssembleDur: { value: ASSEMBLE_DURATION },
    uRippleCount: { value: 0 },
    uRipples: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4()) },
    uK: { value: 3.2 },
    uOmega: { value: 7.5 },
    uDecay: { value: 1.25 },
    uSpread: { value: 0.32 },
    uSpeed: { value: 4.5 },
    uAmp: { value: 0.42 },
  };
}

export function BrickWall({ layout, onReady }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const viewport = useThree((state) => state.viewport);
  const invalidate = useThree((state) => state.invalidate);
  const startRef = useRef<number | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const settledRef = useRef(false);
  const readyRef = useRef(false);
  const lastPointer = useRef<{ x: number; y: number; t: number }>({ x: 0, y: 0, t: 0 });

  const brickW = WALL_WIDTH / layout.cols;
  const brickH = brickW / 2;
  const wallHeight = layout.rows * brickH;
  const count = layout.bricks.length;

  const uniformsRef = useRef<ReturnType<typeof createUniforms> | null>(null);
  if (uniformsRef.current === null) uniformsRef.current = createUniforms();
  const uniforms = uniformsRef.current;

  const { geometry, material } = useMemo(() => {
    const geo = new RoundedBoxGeometry(
      brickW * 0.9,
      brickH * 0.8,
      brickH * 1.1,
      2,
      Math.min(brickW, brickH) * 0.14,
    );
    const rand = mulberry32(1337);
    const starts = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const seeds = new Float32Array(count);
    layout.bricks.forEach(([bx], i) => {
      const angle = rand() * Math.PI * 2;
      const dist = 2.5 + rand() * 6;
      starts[i * 3] = Math.cos(angle) * dist;
      starts[i * 3 + 1] = Math.sin(angle) * dist - 2;
      starts[i * 3 + 2] = 3 + rand() * 6;
      delays[i] = (bx / layout.cols) * (MAX_DELAY - 0.35) + rand() * 0.35;
      seeds[i] = rand();
    });
    geo.setAttribute("aStart", new THREE.InstancedBufferAttribute(starts, 3));
    geo.setAttribute("aDelay", new THREE.InstancedBufferAttribute(delays, 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));

    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.82,
      metalness: 0,
    });
    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = VERTEX_HEAD + shader.vertexShader.replace("#include <begin_vertex>", VERTEX_BODY);
    };
    mat.customProgramCacheKey = () => "brickwall-v1";
    return { geometry: geo, material: mat };
  }, [brickH, brickW, count, layout, uniforms]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    const base = new THREE.Color("#c2472b");
    const hsl = { h: 0, s: 0, l: 0 };
    base.getHSL(hsl);
    const rand = mulberry32(42);
    layout.bricks.forEach(([bx, by], i) => {
      const x = (bx + 0.5) * brickW - WALL_WIDTH / 2;
      const y = (layout.rows / 2 - by - 0.5) * brickH;
      matrix.makeTranslation(x, y, 0);
      mesh.setMatrixAt(i, matrix);
      const clinker = rand() < 0.08;
      color.setHSL(
        hsl.h + (rand() - 0.5) * 0.02,
        THREE.MathUtils.clamp(hsl.s + (rand() - 0.5) * 0.16, 0.3, 0.9),
        THREE.MathUtils.clamp(hsl.l + (rand() - 0.5) * 0.12 - (clinker ? 0.16 : 0), 0.18, 0.62),
      );
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    invalidate();
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [brickH, brickW, geometry, invalidate, layout, material]);

  const pushRipple = (x: number, y: number, strength: number, t: number) => {
    const list = ripplesRef.current;
    list.push({ x, y, t0: t, strength });
    if (list.length > MAX_RIPPLES) list.shift();
    invalidate();
  };

  const toLocal = (event: ThreeEvent<PointerEvent>) => {
    const group = groupRef.current;
    if (!group) return null;
    const p = group.worldToLocal(event.point.clone());
    return { x: p.x, y: p.y };
  };

  const now = () => (startRef.current === null ? 0 : performance.now() / 1000 - startRef.current);

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const p = toLocal(event);
    if (!p) return;
    const t = now();
    const last = lastPointer.current;
    const moved = Math.hypot(p.x - last.x, p.y - last.y);
    if (moved < brickW * 0.9 && t - last.t < 0.09) return;
    lastPointer.current = { x: p.x, y: p.y, t };
    pushRipple(p.x, p.y, 0.55, t);
  };

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const p = toLocal(event);
    if (!p) return;
    pushRipple(p.x, p.y, 1.4, now());
  };

  useFrame(() => {
    if (startRef.current === null) startRef.current = performance.now() / 1000 - 0.001;
    const t = performance.now() / 1000 - startRef.current;
    const u = uniformsRef.current;
    if (!u) return;
    u.uTime.value = t;

    const ripples = ripplesRef.current;
    while (ripples.length && t - ripples[0].t0 > RIPPLE_LIFE) ripples.shift();
    u.uRippleCount.value = ripples.length;
    ripples.forEach((r, i) => u.uRipples.value[i].set(r.x, r.y, r.t0, r.strength));

    const assembling = t < MAX_DELAY + ASSEMBLE_DURATION;
    if (!assembling && !settledRef.current) {
      settledRef.current = true;
      pushRipple(0, 0, 0.9, t);
    }
    if (!readyRef.current) {
      readyRef.current = true;
      onReady?.();
    }
    if (assembling || ripples.length > 0) invalidate();
  });

  const scale = (viewport.width * 0.94) / WALL_WIDTH;

  return (
    <group ref={groupRef} scale={scale}>
      <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />
      <mesh
        position={[0, 0, brickH]}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
      >
        <planeGeometry args={[WALL_WIDTH * 1.3, wallHeight * 2.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
