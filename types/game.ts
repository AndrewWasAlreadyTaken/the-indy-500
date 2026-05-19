export const WINNING_SCORE = 251;
export const STORAGE_KEY = "indy-500-scores";

export type PlayerId = "player1" | "player2";

export interface Player {
  id: PlayerId;
  name: string;
  score: number;
}

export interface ScoreState {
  players: [Player, Player];
  updatedAt: number;
}

export const DEFAULT_SCORE_STATE: ScoreState = {
  players: [
    { id: "player1", name: "Player 1", score: 0 },
    { id: "player2", name: "Player 2", score: 0 },
  ],
  updatedAt: Date.now(),
};
