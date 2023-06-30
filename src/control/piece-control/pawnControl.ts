import {
  idToCoordinate,
  coordinateToId,
  isSameSite,
  isExit,
  isEnpassantAttack,
} from "../../view/broad/utility/helper";

import { color, chessLocations } from "../utility/GameData";

export const checkPawnMove = (
  allPieceLoc: chessLocations,
  currentId: number,
  pcolor: color,
  getPreMove: boolean,
  firstMove?: boolean,
  site?: color
) => {
  const validMove: number[] = [];
  const atackMove: number[] = [];
  const { x, y } = idToCoordinate(currentId);
  const dir = site == pcolor ? -1 : 1;

  if (!getPreMove) {
    //move
    const moveLength = firstMove ? 2 : 1;
    for (let i = 1; i <= moveLength; i++) {
      const id = coordinateToId(x, y + i * dir);

      if (!isExit(id, allPieceLoc)) {
        if (id != -1) {
          validMove.push(id);
        }
      } else {
        break;
      }
    }
    //attack

    const leftattack = coordinateToId(x - 1, y + dir);
    const rightattack = coordinateToId(x + 1, y + dir);

    [leftattack, rightattack].forEach((el) => {
      if (isExit(el, allPieceLoc) && !isSameSite(el, allPieceLoc, pcolor))
        if (el != -1) {
          atackMove.push(el);
        }
    });
    //add Enpassant attack

    [leftattack, rightattack].forEach((el) => {
      if (isEnpassantAttack(el, allPieceLoc, pcolor))
        if (el != -1) {
          atackMove.push(el);
        }
    });

    return { validMove, atackMove };
  } else {
    const leftattack = coordinateToId(x - 1, y + dir);
    const rightattack = coordinateToId(x + 1, y + dir);
    validMove.push(leftattack, rightattack);
    return { validMove, atackMove };
  }
};
