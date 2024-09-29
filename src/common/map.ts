export const MapList = {
  Main: "fishing_game_main",
  Beginner1: "fishing_game_beginner_map1",
} as const;
export type MapList = (typeof MapList)[keyof typeof MapList];
