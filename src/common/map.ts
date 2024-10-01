export const MapList = {
  Main: "fishing_game_main.jpg",
  Beginner1: "fishing_game_beginner_map12converter.gif",
} as const;
export type MapList = (typeof MapList)[keyof typeof MapList];
