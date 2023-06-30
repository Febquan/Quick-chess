import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
} from "../../view/broad/utility/helper";

import { color, chessLocations } from "../utility/GameData";
import { checkBishopMove } from "./bishopControl";
import { checkKnightMove } from "./knightControl";
import { checkPawnMove } from "./pawnControl";
import { checkQueenMove } from "./queenControl";
import { checkRookMove } from "./rookControl";
// import { PieceName } from "../utility/GameData";
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
          console.log("hello1");
        }
      }
      if (piece == PieceName.King || piece == PieceName.WhiteKing) {
        if (site == color.White && piece == PieceName.King) continue;
        if (site == color.Black && piece == PieceName.WhiteKing) continue;
        for (const id of loc) {
          const color = allPieceLoc[name as PieceName].pcolor;
          const { validMove } = checkKingMove(
            allPieceLoc,
            id,
            color,
            false,
            false
          );
          noNoZone.push(...validMove);
          console.log("hello2");
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
  console.log("hello1123");
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
      i <= (site == color.White ? 3 : 2);
      i++ //left
    ) {
      if (isExit(coordinateToId(x - i, y), allPieceLoc)) {
        left = false;
        break;
      }
    }
    for (
      let i = 1;
      i <= (site == color.White ? 2 : 3);
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
      const rookId = coordinateToId(x + (site == color.White ? 3 : 4), y);
      if (allPieceLoc[rookName].firstMove?.includes(rookId)) {
        atackMove.push(rookId);
      }
    }
    if (left) {
      const rookId = coordinateToId(x + (site == color.White ? -4 : -3), y);
      if (allPieceLoc[rookName].firstMove?.includes(rookId)) {
        atackMove.push(rookId);
      }
    }
  }

  validMove = validMove.filter((x) => !noNoMove.includes(x));
  atackMove = atackMove.filter((x) => !noNoMove.includes(x));
  return { validMove, atackMove };
};

type functionCheck = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPreMove: boolean
) => {
  validMove: number[];
  atackMove: number[];
};
enum PieceName {
  King = "King",
  WhiteKing = "WhiteKing",
  Queen = "Queen",
  WhiteQueen = "WhiteQueen",
  Rook = "Rook",
  WhiteRook = "WhiteRook",
  Knight = "Knight",
  WhiteKnight = "WhiteKnight",
  Bishop = "Bishop",
  WhiteBishop = "WhiteBishop",
  Pawn = "Pawn",
  WhitePawn = "WhitePawn",
}

const ControlMapping: Record<PieceName, functionCheck> = {
  [PieceName.WhiteQueen]: checkQueenMove,
  [PieceName.Queen]: checkQueenMove,
  [PieceName.Rook]: checkRookMove,
  [PieceName.WhiteRook]: checkRookMove,
  [PieceName.Bishop]: checkBishopMove,
  [PieceName.WhiteBishop]: checkBishopMove,
  [PieceName.Pawn]: checkPawnMove,
  [PieceName.WhitePawn]: checkPawnMove,
  [PieceName.Knight]: checkKnightMove,
  [PieceName.WhiteKnight]: checkKnightMove,
  [PieceName.King]: checkKingMove,
  [PieceName.WhiteKing]: checkKingMove,
};

export const isCheckMate = (allLoc: chessLocations, site: color) => {
  const allAttackMove = [];
  for (const name in allLoc) {
    if (name != PieceName.WhiteKing && name != PieceName.King) {
      const piece = name as PieceName;
      const loc = allLoc[piece].loc;
      const color = allLoc[piece].pcolor;
      const checkFunction: functionCheck = ControlMapping[piece];
      for (const id of loc) {
        const { atackMove } = checkFunction(allLoc, id, color, false);
        allAttackMove.push(...atackMove);
      }
    }
  }
  const WhiteKingId = allLoc.WhiteKing.loc[0];
  const BlackKingId = allLoc.King.loc[0];
  const BlackKingCheck = allAttackMove.includes(BlackKingId);
  const WhiteKingCheck = allAttackMove.includes(WhiteKingId);
  return {
    isChecked: site == color.Black ? BlackKingCheck : WhiteKingCheck,
    check: site == color.Black ? WhiteKingCheck : BlackKingCheck,
  };
};
