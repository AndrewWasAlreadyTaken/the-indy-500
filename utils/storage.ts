import {
  DEFAULT_SCORE_STATE,
  STORAGE_KEY,
  type ScoreState,
} from "@/types/game";

/**
 * Persistence layer — swap implementations here when moving to Firebase.
 */
export interface ScoreStorage {
  load(): ScoreState | null;
  save(state: ScoreState): void;
}

function isValidScoreState(value: unknown): value is ScoreState {
  if (!value || typeof value !== "object") return false;
  const state = value as ScoreState;
  if (!Array.isArray(state.players) || state.players.length !== 2) return false;
  return state.players.every(
    (p) =>
      p &&
      typeof p.id === "string" &&
      typeof p.name === "string" &&
      typeof p.score === "number",
  );
}

export const localScoreStorage: ScoreStorage = {
  load(): ScoreState | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValidScoreState(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  save(state: ScoreState): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
};

export function getInitialScoreState(): ScoreState {
  return localScoreStorage.load() ?? DEFAULT_SCORE_STATE;
}
