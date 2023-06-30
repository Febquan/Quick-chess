import { color, chessLocations } from "../utility/GameData";
import { checkBishopMove } from "./bishopControl";
import { checkRookMove } from "./rookControl";

export const checkQueenMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPreMove: boolean
) => {
  const validMove: number[] = [];
  const atackMove: number[] = [];
  const temp1 = checkBishopMove(allPieceLoc, currentId, pcolor, getPreMove);
  const temp2 = checkRookMove(allPieceLoc, currentId, pcolor, getPreMove);
  validMove.push(...temp1.validMove, ...temp2.validMove);
  atackMove.push(...temp1.atackMove, ...temp2.atackMove);
  return { validMove, atackMove };
};
