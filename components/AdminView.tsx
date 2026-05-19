"use client";

import { useScoreStore } from "@/hooks/useScoreStore";
import { hasWinner } from "@/utils/game";
import { AdminPlayerColumn } from "./AdminPlayerColumn";
import { PageShell } from "./PageShell";

export function AdminView() {
  const { state, hydrated, increment, decrement, reset } = useScoreStore();
  const gameOver = hasWinner(state);
  const [player1, player2] = state.players;

  const handleReset = () => {
    if (
      window.confirm(
        "Reset both scores to 0? This cannot be undone.",
      )
    ) {
      reset();
    }
  };

  return (
    <PageShell>
      <header className="mb-8 text-center">
        <p className="font-arcade text-[10px] uppercase tracking-[0.4em] text-cyan-400 sm:text-xs">
          Control Panel
        </p>
        <h1 className="mt-2 font-arcade text-2xl uppercase text-fuchsia-300 sm:text-4xl">
          Admin
        </h1>
        {gameOver && (
          <p className="mt-3 text-sm text-yellow-300">
            Game over — reset to start a new match.
          </p>
        )}
      </header>

      <main
        className={`flex flex-1 flex-col gap-8 transition-opacity duration-300 ${hydrated ? "opacity-100" : "opacity-0"}`}
      >
        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
          <AdminPlayerColumn
            player={player1}
            onIncrement={() => increment("player1")}
            onDecrement={() => decrement("player1")}
            disabled={gameOver}
          />
          <AdminPlayerColumn
            player={player2}
            onIncrement={() => increment("player2")}
            onDecrement={() => decrement("player2")}
            disabled={gameOver}
          />
        </div>

        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border-2 border-red-500/50 bg-red-500/10 px-8 py-3 font-arcade text-xs uppercase tracking-widest text-red-300 transition-all hover:border-red-400 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] active:scale-95"
          >
            Reset Game
          </button>
        </div>
      </main>
    </PageShell>
  );
}
