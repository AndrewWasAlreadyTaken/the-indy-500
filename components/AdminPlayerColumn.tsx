"use client";

import type { Player } from "@/types/game";
import { canDecrement, canIncrement } from "@/utils/game";
import { ScoreCard } from "./ScoreCard";

interface AdminPlayerColumnProps {
  player: Player;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

export function AdminPlayerColumn({
  player,
  onIncrement,
  onDecrement,
  disabled = false,
}: AdminPlayerColumnProps) {
  const canAdd = canIncrement(player.score) && !disabled;
  const canSub = canDecrement(player.score) && !disabled;

  return (
    <section className="flex flex-1 flex-col items-center gap-6">
      <ScoreCard player={player} variant="admin" />

      <button
        type="button"
        onClick={onIncrement}
        disabled={!canAdd}
        aria-label={`Add point for ${player.name}`}
        className="group flex h-24 w-full max-w-xs items-center justify-center rounded-2xl border-2 border-cyan-400 bg-cyan-400/10 font-score text-5xl text-cyan-300 transition-all duration-200 hover:scale-105 hover:bg-cyan-400/20 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none sm:h-28 sm:text-6xl"
      >
        +
      </button>

      <button
        type="button"
        onClick={onDecrement}
        disabled={!canSub}
        aria-label={`Subtract point for ${player.name}`}
        className="flex h-12 w-full max-w-xs items-center justify-center rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/5 font-arcade text-sm uppercase tracking-wider text-fuchsia-300 transition-all duration-200 hover:border-fuchsia-400 hover:bg-fuchsia-500/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
    </section>
  );
}
