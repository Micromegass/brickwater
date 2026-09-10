"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import desktop from "@/lib/hero/wordmark-desktop.json";
import mobile from "@/lib/hero/wordmark-mobile.json";
import type { WordmarkLayout } from "@/lib/hero/types";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false, loading: () => null });

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function prefersData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

/** Mounts the 3D wordmark only for capable, motion-tolerant clients; otherwise the typeset h1 stays. */
export function HeroClient() {
  const reduceMotion = useReducedMotion();
  const [layout, setLayout] = useState<WordmarkLayout | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !supportsWebGl() || prefersData()) return;
    const pick = () =>
      setLayout((window.matchMedia("(max-width: 640px)").matches ? mobile : desktop) as WordmarkLayout);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(pick, { timeout: 1200 } as IdleRequestOptions);
    return () => cancel(handle as number);
  }, [reduceMotion]);

  const onReady = useCallback(() => {
    const stage = hostRef.current?.closest<HTMLElement>("[data-hero-stage]");
    if (stage) stage.dataset.canvas = "ready";
  }, []);

  if (!layout) return null;
  return (
    <div ref={hostRef} className="absolute inset-0" data-hero-canvas>
      <CanvasBoundary>
        <HeroCanvas layout={layout} onReady={onReady} />
      </CanvasBoundary>
    </div>
  );
}
