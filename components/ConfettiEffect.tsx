"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  active: boolean;
}

export function ConfettiEffect({ active }: ConfettiEffectProps) {
  useEffect(() => {
    if (!active) return;

    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#ff00ff", "#00ffff", "#ffff00", "#ff3366"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#ff00ff", "#00ffff", "#ffff00", "#ff3366"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#ff00ff", "#00ffff", "#ffff00", "#39ff14"],
    });

    frame();
  }, [active]);

  return null;
}
