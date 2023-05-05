export const idToCoordinate = (id: number) => {
  return { x: id % 8, y: Math.floor(id / 8) };
};
export const coordinateToId = (x: number, y: number) => {
  if (x < 0 || x >= 8 || y < 0 || y >= 8) {
    return -1;
  }
  return y * 8 + x;
};

import { chessLocations, color } from "../../control/utility/GameData";
export const isExit = (id: number, locInfo: chessLocations) => {
  for (const value of Object.values(locInfo)) {
    if (value.loc.includes(id)) {
      return true;
    }
  }

  return false;
};

export const isSameSite = (
  id: number,
  locInfo: chessLocations,
  color: color
) => {
  for (const value of Object.values(locInfo)) {
    if (value.loc.includes(id) && value.pcolor == color) {
      return true;
    }
  }

  return false;
};

export const getBoardSize = () => {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--broad-size")
  );
};

export const isEnpassantAttack = (
  id: number,
  locInfo: chessLocations,
  pcolor: color
) => {
  for (const value of Object.values(locInfo)) {
    if (value.enpassant?.includes(id) && value.pcolor != pcolor) {
      return true;
    }
  }

  return false;
};
