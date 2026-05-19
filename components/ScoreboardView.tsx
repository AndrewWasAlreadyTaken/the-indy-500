"use client";

import { useScoreStore } from "@/hooks/useScoreStore";
import { getLeaderStatus, hasWinner } from "@/utils/game";
import { ConfettiEffect } from "./ConfettiEffect";
import { LeaderBanner } from "./LeaderBanner";
import { PageShell } from "./PageShell";
import { ScoreCard } from "./ScoreCard";
import { WINNING_SCORE } from "@/types/game";

export function ScoreboardView() {
  const { state, hydrated } = useScoreStore();
  const winner = hasWinner(state);
  const leaderStatus = getLeaderStatus(state);
  const [player1, player2] = state.players;

  const leadingId =
    leaderStatus.type === "leading" ? leaderStatus.player.id : null;
  const winnerId =
    leaderStatus.type === "winner" ? leaderStatus.player.id : null;

  return (
    <PageShell>
      <ConfettiEffect active={winner} />

      <header className="mb-10 text-center">
        <p className="font-arcade text-[10px] uppercase tracking-[0.5em] text-cyan-400 sm:text-xs">
          Beer Pong Championship
        </p>
        <h1 className="mt-3 font-arcade text-3xl uppercase leading-tight text-fuchsia-300 drop-shadow-[0_0_24px_rgba(217,70,239,0.6)] sm:text-5xl md:text-6xl">
          The Indy 500
        </h1>
        <p className="mt-4 text-sm text-zinc-400">
          First to exactly <span className="text-white">{WINNING_SCORE}</span> wins
        </p>
      </header>

      <main
        className={`flex flex-1 flex-col justify-center transition-opacity duration-300 ${hydrated ? "opacity-100" : "opacity-0"}`}
      >
        <div className="mb-8">
          <LeaderBanner state={state} />
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:gap-6">
          <ScoreCard
            player={player1}
            variant="display"
            isWinner={winnerId === player1.id}
            isLeading={!winner && leadingId === player1.id}
          />

          <div className="flex items-center justify-center sm:flex-col">
            <span className="font-arcade text-lg text-zinc-600 sm:rotate-0">VS</span>
          </div>

          <ScoreCard
            player={player2}
            variant="display"
            isWinner={winnerId === player2.id}
            isLeading={!winner && leadingId === player2.id}
          />
        </div>
      </main>

      <footer className="mt-10 text-center">
        <p className="text-xs text-zinc-600">
          Scores update live across tabs · Admin controls on{" "}
          <a href="/admin" className="text-cyan-400 underline-offset-2 hover:underline">
            /admin
          </a>
        </p>
      </footer>
    </PageShell>
  );
}
