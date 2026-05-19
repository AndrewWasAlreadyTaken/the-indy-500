import { WINNING_SCORE, type Player, type PlayerId, type ScoreState } from "@/types/game";

export function getPlayer(state: ScoreState, id: PlayerId): Player {
  return state.players.find((p) => p.id === id)!;
}

export function getWinner(state: ScoreState): Player | null {
  const winner = state.players.find((p) => p.score === WINNING_SCORE);
  return winner ?? null;
}

export function hasWinner(state: ScoreState): boolean {
  return getWinner(state) !== null;
}

export type LeaderStatus =
  | { type: "winner"; player: Player }
  | { type: "leading"; player: Player; margin: number }
  | { type: "tied" };

export function getLeaderStatus(state: ScoreState): LeaderStatus {
  const winner = getWinner(state);
  if (winner) return { type: "winner", player: winner };

  const [a, b] = state.players;
  if (a.score === b.score) return { type: "tied" };

  const leader = a.score > b.score ? a : b;
  const trailer = a.score > b.score ? b : a;
  return { type: "leading", player: leader, margin: leader.score - trailer.score };
}

export function canIncrement(score: number): boolean {
  return score < WINNING_SCORE;
}

export function canDecrement(score: number): boolean {
  return score > 0;
}
