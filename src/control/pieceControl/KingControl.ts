import { current } from "@reduxjs/toolkit";
import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
} from "../../view/utility/helper";

import { color, chessLocations, PieceName } from "../utility/GameData";
import { checkBishopMove } from "./BishopControl";
import { checkKnightMove } from "./Knight Control";
import { checkPawnMove } from "./PawnControl";
import { checkQueenMove } from "./QueenControl";
import { checkRookMove } from "./RookControl";
function pushMove(
  id: number,
  allPieceLoc: chessLocations,
  pcolor: color,
  validMove: number[],
  attacMove: number[]
) {
  if (isExit(id, allPieceLoc)) {
    if (!isSameSite(id, allPieceLoc, pcolor)) {
      if (id != -1) {
        attacMove.push(id);
      }
    }
  } else {
    if (id != -1) {
      validMove.push(id);
    }
  }
}
function getAllNoNoId(
  allPieceLoc: chessLocations,
  pcolor: color,
  site?: color
) {
  const noNoZone = [];
  for (const name in allPieceLoc) {
    if (allPieceLoc[name as PieceName].pcolor != pcolor) {
      const loc = allPieceLoc[name as PieceName].loc;
      const piece = name as PieceName;
      if (piece == PieceName.Pawn || piece == PieceName.WhitePawn) {
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkPawnMove(
            allPieceLoc,
            id,
            color,
            true,
            false,
            site
          );
          noNoZone.push(...validMove);
        }
      }
      if (piece == PieceName.Bishop || piece == PieceName.WhiteBishop) {
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkBishopMove(allPieceLoc, id, color, true);
          noNoZone.push(...validMove);
        }
      }
      if (piece == PieceName.Rook || piece == PieceName.WhiteRook) {
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkRookMove(allPieceLoc, id, color, true);
          noNoZone.push(...validMove);
        }
      }
      if (piece == PieceName.Knight || piece == PieceName.WhiteKnight) {
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkKnightMove(allPieceLoc, id, color, true);
          noNoZone.push(...validMove);
        }
      }
      if (piece == PieceName.Queen || piece == PieceName.WhiteQueen) {
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkQueenMove(allPieceLoc, id, color, true);
          noNoZone.push(...validMove);
        }
      }
    }
  }
  return noNoZone;
}

export const checkKingMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  _: boolean,
  firstMove?: boolean,
  site?: color
) => {
  let validMove: number[] = [];
  let atackMove: number[] = [];
  const noNoMove: number[] = getAllNoNoId(allPieceLoc, pcolor, site);

  const { x, y } = idToCoordinate(currentId);

  const up = coordinateToId(x, y + 1);
  const down = coordinateToId(x, y - 1);
  const right = coordinateToId(x + 1, y);
  const left = coordinateToId(x - 1, y);
  const upLeft = coordinateToId(x - 1, y + 1);
  const upRight = coordinateToId(x + 1, y + 1);
  const downRight = coordinateToId(x + 1, y - 1);
  const dowLeft = coordinateToId(x - 1, y - 1);

  pushMove(up, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(down, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(right, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(left, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(upLeft, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(upRight, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(downRight, allPieceLoc, pcolor, validMove, atackMove);
  pushMove(dowLeft, allPieceLoc, pcolor, validMove, atackMove);

  //Nhap thanh
  if (firstMove) {
    let left = true;
    let right = true;
    for (
      let i = 1;
      i <= 3;
      i++ //left
    ) {
      if (isExit(coordinateToId(x - i, y), allPieceLoc)) {
        left = false;
        break;
      }
    }
    for (
      let i = 1;
      i <= 2;
      i++ //right
    ) {
      if (isExit(coordinateToId(x + i, y), allPieceLoc)) {
        right = false;
        break;
      }
    }
    const rookName =
      pcolor == color.Black ? PieceName.Rook : PieceName.WhiteRook;
    if (right) {
      const rookId = coordinateToId(x + 3, y);
      if (allPieceLoc[rookName].firstMove?.includes(rookId)) {
        atackMove.push(rookId);
      }
      console.log(allPieceLoc, allPieceLoc[rookName].firstMove, rookName);
    }
    if (left) {
      const rookId = coordinateToId(x - 4, y);
      if (allPieceLoc[rookName].firstMove?.includes(rookId)) {
        atackMove.push(rookId);
      }
    }
  }

  validMove = validMove.filter((x) => !noNoMove.includes(x));
  atackMove = atackMove.filter((x) => !noNoMove.includes(x));
  return { validMove, atackMove };
};
