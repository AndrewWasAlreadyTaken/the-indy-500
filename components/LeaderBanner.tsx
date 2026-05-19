"use client";

import { getLeaderStatus } from "@/utils/game";
import type { ScoreState } from "@/types/game";

interface LeaderBannerProps {
  state: ScoreState;
}

export function LeaderBanner({ state }: LeaderBannerProps) {
  const status = getLeaderStatus(state);

  if (status.type === "winner") {
    return (
      <div className="winner-glow rounded-xl border-2 border-yellow-300 bg-yellow-300/10 px-6 py-4 text-center">
        <p className="font-arcade text-xs uppercase tracking-[0.3em] text-yellow-200 sm:text-sm">
          Champion
        </p>
        <p className="mt-2 font-score text-2xl text-yellow-300 sm:text-4xl">
          {status.player.name} wins!
        </p>
        <p className="mt-2 text-sm text-yellow-100/80">
          Exactly {status.player.score} — game over!
        </p>
      </div>
    );
  }

  if (status.type === "tied") {
    return (
      <p className="text-center font-arcade text-sm uppercase tracking-widest text-cyan-300 sm:text-base">
        Dead heat — it&apos;s all tied up!
      </p>
    );
  }

  return (
    <p className="text-center font-arcade text-sm uppercase tracking-widest text-cyan-300 sm:text-base">
      <span className="text-fuchsia-300">{status.player.name}</span> leads by{" "}
      <span className="text-white">{status.margin}</span>
    </p>
  );
}

