"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_SCORE_STATE,
  STORAGE_KEY,
  WINNING_SCORE,
  type PlayerId,
  type ScoreState,
} from "@/types/game";
import { getInitialScoreState, localScoreStorage } from "@/utils/storage";

export function useScoreStore() {
  const [state, setState] = useState<ScoreState>(DEFAULT_SCORE_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getInitialScoreState());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ScoreState) => {
    const withTimestamp: ScoreState = { ...next, updatedAt: Date.now() };
    setState(withTimestamp);
    localScoreStorage.save(withTimestamp);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const loaded = localScoreStorage.load();
      if (loaded) setState(loaded);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const increment = useCallback(
    (playerId: PlayerId) => {
      setState((current) => {
        const player = current.players.find((p) => p.id === playerId);
        if (!player || player.score >= WINNING_SCORE) return current;

        const next: ScoreState = {
          ...current,
          players: current.players.map((p) =>
            p.id === playerId ? { ...p, score: p.score + 1 } : p,
          ) as ScoreState["players"],
          updatedAt: Date.now(),
        };
        localScoreStorage.save(next);
        return next;
      });
    },
    [],
  );

  const decrement = useCallback(
    (playerId: PlayerId) => {
      setState((current) => {
        const player = current.players.find((p) => p.id === playerId);
        if (!player || player.score <= 0) return current;

        const next: ScoreState = {
          ...current,
          players: current.players.map((p) =>
            p.id === playerId ? { ...p, score: p.score - 1 } : p,
          ) as ScoreState["players"],
          updatedAt: Date.now(),
        };
        localScoreStorage.save(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    const next: ScoreState = { ...DEFAULT_SCORE_STATE, updatedAt: Date.now() };
    persist(next);
  }, [persist]);

  return {
    state,
    hydrated,
    increment,
    decrement,
    reset,
  };
}
