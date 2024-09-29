import { MapList } from "@common/map";
import { FadeTransitionHandles } from "@moleculars/FadeTransition";
import React from "react";
import { atom } from "recoil";

interface GameState {
  mapChanged: boolean;
  start: boolean;
  scene: MapList | null;
  casting: boolean;
  castingScore: number | null;
  fadeRef: FadeTransitionHandles | null;
}

export const gameState = atom<GameState>({
  key: "gameState", // unique ID (with respect to other atoms/selectors)
  default: {
    mapChanged: false,
    start: false,
    scene: MapList.Main,
    casting: false,
    castingScore: null,
    fadeRef: null,
  }, // default value (aka initial value)
});
