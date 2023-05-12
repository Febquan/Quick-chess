import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
} from "../../view/broad/utility/helper";

import { color, chessLocations } from "../utility/GameData";

function pushMove(
  id: number,
  allPieceLoc: chessLocations,
  pcolor: color,
  validMove: number[],
  attacMove: number[],
  getPremove: boolean
): boolean {
  if (isExit(id, allPieceLoc)) {
    if (!isSameSite(id, allPieceLoc, pcolor)) {
      if (id != -1) {
        attacMove.push(id);
      }
    } else {
      if (id != -1 && getPremove) {
        validMove.push(id);
        return true;
      }
    }
    return true;
  } else {
    if (id != -1) {
      validMove.push(id);
      return false;
    }
    return true;
  }
}

export const checkBishopMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPremove: boolean
) => {
  const validMove: number[] = [];
  const atackMove: number[] = [];
  const { x, y } = idToCoordinate(currentId);

  let upLeft = false;
  let upRight = false;
  let downRight = false;
  let dowLeft = false;
  for (let i = 1; i <= 7; i++) {
    const id1 = coordinateToId(x - i, y + i);
    if (!upLeft) {
      upLeft = pushMove(
        id1,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPremove
      );
    }

    const id2 = coordinateToId(x + i, y + i);
    if (!upRight) {
      upRight = pushMove(
        id2,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPremove
      );
    }

    const id3 = coordinateToId(x + i, y - i);
    if (!downRight) {
      downRight = pushMove(
        id3,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPremove
      );
    }

    const id4 = coordinateToId(x - i, y - i);
    if (!dowLeft) {
      dowLeft = pushMove(
        id4,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPremove
      );
    }
  }

  return { validMove, atackMove };
};
