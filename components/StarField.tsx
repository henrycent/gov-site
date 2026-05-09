"use client";
import { useMemo } from "react";

// Deterministic PRNG so render is pure and SSR/CSR match.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarField({
  count = 80,
  goldRatio = 0.18,
  seed = 1776,
}: { count?: number; goldRatio?: number; seed?: number }) {
  const stars = useMemo(() => {
    const rng = mulberry32(seed);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: rng() * 100,
      left: rng() * 100,
      size: 1 + rng() * 2.5,
      delay: rng() * 4,
      duration: 2 + rng() * 4,
      gold: rng() < goldRatio,
    }));
  }, [count, goldRatio, seed]);

  return (
    <div className="starfield" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className={`star${s.gold ? " gold" : ""}`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
