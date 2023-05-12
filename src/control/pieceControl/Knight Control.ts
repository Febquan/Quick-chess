import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
} from "../../view/broad/utility/helper";

import { color, chessLocations } from "../utility/GameData";

function pushMove(
  cor: { x: number; y: number },
  allPieceLoc: chessLocations,
  pcolor: color,
  validMove: number[],
  attacMove: number[],
  dir: { x: number[]; y: number[] },
  getPreMove: boolean
) {
  const { x, y } = cor;
  const first = coordinateToId(x + dir.x[0], y + dir.y[0]);
  const second = coordinateToId(x + dir.x[1], y + dir.y[1]);

  if (isExit(first, allPieceLoc)) {
    if (!isSameSite(first, allPieceLoc, pcolor)) {
      if (first != -1) attacMove.push(first);
    } else {
      if (getPreMove) {
        if (first != -1) validMove.push(first);
      }
    }
  } else {
    if (first != -1) validMove.push(first);
  }

  if (isExit(second, allPieceLoc)) {
    if (!isSameSite(second, allPieceLoc, pcolor)) {
      if (second != -1) attacMove.push(second);
    } else {
      if (getPreMove) {
        if (second != -1) validMove.push(second);
      }
    }
  } else {
    if (second != -1) validMove.push(second);
  }
}

export const checkKnightMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPreMove: boolean
) => {
  const validMove: number[] = [];
  const atackMove: number[] = [];
  const { x, y } = idToCoordinate(currentId);
  let up = false;
  let down = false;
  let left = false;
  let right = false;
  up =
    isExit(coordinateToId(x, y + 1), allPieceLoc) &&
    isExit(coordinateToId(x, y + 2), allPieceLoc);
  down =
    isExit(coordinateToId(x, y - 1), allPieceLoc) &&
    isExit(coordinateToId(x, y - 2), allPieceLoc);
  left =
    isExit(coordinateToId(x - 1, y), allPieceLoc) &&
    isExit(coordinateToId(x - 2, y), allPieceLoc);
  right =
    isExit(coordinateToId(x + 1, y), allPieceLoc) &&
    isExit(coordinateToId(x + 2, y), allPieceLoc);

  if (!up) {
    pushMove(
      { x, y },
      allPieceLoc,
      pcolor,
      validMove,
      atackMove,
      {
        x: [-1, 1],
        y: [2, 2],
      },
      getPreMove
    );
  }
  if (!down) {
    pushMove(
      { x, y },
      allPieceLoc,
      pcolor,
      validMove,
      atackMove,
      {
        x: [-1, 1],
        y: [-2, -2],
      },
      getPreMove
    );
  }
  if (!left) {
    pushMove(
      { x, y },
      allPieceLoc,
      pcolor,
      validMove,
      atackMove,
      {
        x: [-2, -2],
        y: [-1, 1],
      },
      getPreMove
    );
  }
  if (!right) {
    pushMove(
      { x, y },
      allPieceLoc,
      pcolor,
      validMove,
      atackMove,
      {
        x: [2, 2],
        y: [-1, 1],
      },
      getPreMove
    );
  }
  console.log({ validMove, atackMove });
  return { validMove, atackMove };
};
