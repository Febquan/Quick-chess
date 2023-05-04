import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
} from "../../view/utility/helper";

import { color, chessLocations } from "../utility/GameData";

function pushMove(
  id: number,
  allPieceLoc: chessLocations,
  pcolor: color,
  validMove: number[],
  attacMove: number[],
  getPreMove: boolean
): boolean {
  if (isExit(id, allPieceLoc)) {
    if (!isSameSite(id, allPieceLoc, pcolor)) {
      if (id != -1) {
        attacMove.push(id);
      }
    } else {
      if (id != -1 && getPreMove) {
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

export const checkRookMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPreMove: boolean,
  firstMove?: boolean
) => {
  const validMove: number[] = [];
  const atackMove: number[] = [];
  const { x, y } = idToCoordinate(currentId);

  let up = false;
  let down = false;
  let right = false;
  let left = false;
  for (
    let i = 1;
    i <= 7;
    i++ // to left
  ) {
    const id1 = coordinateToId(x + i, y);
    if (!right) {
      right = pushMove(
        id1,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPreMove
      );
    }

    const id2 = coordinateToId(x - i, y);
    if (!left) {
      left = pushMove(
        id2,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPreMove
      );
    }

    const id3 = coordinateToId(x, y + i);
    if (!up) {
      up = pushMove(id3, allPieceLoc, pcolor, validMove, atackMove, getPreMove);
    }

    const id4 = coordinateToId(x, y - i);
    if (!down) {
      down = pushMove(
        id4,
        allPieceLoc,
        pcolor,
        validMove,
        atackMove,
        getPreMove
      );
    }
  }

  return { validMove, atackMove };
};
