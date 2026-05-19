"use client";

import type { Player } from "@/types/game";
import { WINNING_SCORE } from "@/types/game";

interface ScoreCardProps {
  player: Player;
  isWinner?: boolean;
  isLeading?: boolean;
  variant?: "display" | "admin";
}

export function ScoreCard({
  player,
  isWinner = false,
  isLeading = false,
  variant = "display",
}: ScoreCardProps) {
  const isDisplay = variant === "display";

  return (
    <article
      className={[
        "relative flex flex-col items-center rounded-2xl border-2 px-4 py-6 transition-all duration-300 sm:px-8 sm:py-10",
        isDisplay ? "flex-1 min-w-0" : "w-full",
        isWinner
          ? "border-yellow-300 bg-yellow-300/10 shadow-[0_0_40px_rgba(250,204,21,0.5)] animate-pulse-win"
          : isLeading
            ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            : "border-fuchsia-500/40 bg-black/40 shadow-[0_0_20px_rgba(217,70,239,0.15)]",
      ].join(" ")}
    >
      <h2
        className={[
          "font-arcade text-center uppercase tracking-wider text-fuchsia-300",
          isDisplay ? "text-sm sm:text-base" : "text-base sm:text-lg",
        ].join(" ")}
      >
        {player.name}
      </h2>

      <p
        className={[
          "font-score mt-3 tabular-nums leading-none transition-transform duration-300",
          isDisplay
            ? "text-6xl sm:text-7xl md:text-8xl"
            : "text-7xl sm:text-8xl",
          isWinner ? "text-yellow-300 scale-110" : "text-white",
        ].join(" ")}
        aria-label={`${player.name} score`}
      >
        {player.score}
      </p>

      {isDisplay && (
        <p className="mt-3 font-arcade text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
          / {WINNING_SCORE}
        </p>
      )}
    </article>
  );
}
