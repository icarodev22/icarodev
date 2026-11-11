"use client";

import { useSyncExternalStore } from "react";
import { LEVELS, type Level } from "./chat-shared";

/**
 * Preferências guardadas SOMENTE neste navegador (localStorage), sem dados pessoais.
 * As leituras/escritas toleram armazenamento indisponível (modo privado, bloqueio).
 */
export const PREF_KEYS = { level: "p1:nivel", motion: "p1:animacoes", theme: "p1:tema" } as const;
export type MotionPref = "sistema" | "reduzidas";
export type ThemePref = "escuro" | "claro" | "sistema";
const EVENT = "p1:preferencias";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setPreference(key: (typeof PREF_KEYS)[keyof typeof PREF_KEYS], value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* indisponível */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function clearPreferences(): void {
  try {
    for (const k of Object.values(PREF_KEYS)) window.localStorage.removeItem(k);
  } catch {
    /* indisponível */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => (!e.key || e.key.startsWith("p1:")) && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function getStoredLevel(): Level {
  const v = read(PREF_KEYS.level);
  return v && (LEVELS as readonly string[]).includes(v) ? (v as Level) : "geral";
}

export function useLevelPreference(): Level {
  return useSyncExternalStore(subscribe, getStoredLevel, () => "geral");
}

export function useMotionPreference(): MotionPref {
  return useSyncExternalStore(
    subscribe,
    () => (read(PREF_KEYS.motion) === "reduzidas" ? "reduzidas" : "sistema"),
    () => "sistema",
  );
}

export function useThemePreference(): ThemePref {
  return useSyncExternalStore(
    subscribe,
    () => {
      const v = read(PREF_KEYS.theme);
      return v === "claro" || v === "sistema" ? v : "escuro";
    },
    () => "escuro",
  );
}
