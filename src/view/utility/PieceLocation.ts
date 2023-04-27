import Pawn from "../pieces/Pawn";
import WhitePawn from "../pieces/WhitePawn";
import Bishop from "../pieces/Bishop";
import WhiteBishop from "../pieces/WhiteBishop";
import Rook from "../pieces/Rook";
import WhiteRook from "../pieces/WhiteRook";
import Knight from "../pieces/Knight";
import WhiteKnight from "../pieces/WhiteKnight";
import Queen from "../pieces/Queen";
import WhiteQueen from "../pieces/WhiteQueen";
import King from "../pieces/King";
import WhiteKing from "../pieces/WhiteKing";

enum PieceName {
  King,
  WhiteKing,
  Queen,
  WhiteQueen,
  Rock,
  WhiteRock,
  Knight,
  WhiteKnight,
  Bishop,
  WhiteBishop,
  Pawn,
  WhitePawn,
}

export const WhiteChessLocation = [
  { name: PieceName.King, loc: [5] },
  { name: PieceName.Queen, loc: [4] },
  { name: PieceName.Rock, loc: [1, 8] },
  { name: PieceName.Knight, loc: [2, 7] },
  { name: PieceName.Bishop, loc: [3, 6] },
  { name: PieceName.Pawn, loc: [9, 10, 11, 12, 13, 14, 15, 16] },

  { name: PieceName.WhiteKing, loc: [61] },
  { name: PieceName.WhiteQueen, loc: [60] },
  { name: PieceName.WhiteRock, loc: [57, 64] },
  { name: PieceName.WhiteKnight, loc: [58, 63] },
  { name: PieceName.WhiteBishop, loc: [59, 62] },
  { name: PieceName.WhitePawn, loc: [49, 50, 51, 52, 53, 54, 55, 56] },
];

export const BlackChessLocation = [
  { name: PieceName.WhiteKing, loc: [5] },
  { name: PieceName.WhiteQueen, loc: [4] },
  { name: PieceName.WhiteRock, loc: [1, 8] },
  { name: PieceName.WhiteKnight, loc: [2, 7] },
  { name: PieceName.WhiteBishop, loc: [3, 6] },
  { name: PieceName.WhitePawn, loc: [9, 10, 11, 12, 13, 14, 15, 16] },

  { name: PieceName.King, loc: [61] },
  { name: PieceName.Queen, loc: [60] },
  { name: PieceName.Rock, loc: [57, 64] },
  { name: PieceName.Knight, loc: [58, 63] },
  { name: PieceName.Bishop, loc: [59, 62] },
  { name: PieceName.Pawn, loc: [49, 50, 51, 52, 53, 54, 55, 56] },
];

import { props } from "../pieces/types";
export const pieceMapping: Record<PieceName, React.FC<props>> = {
  [PieceName.King]: King,
  [PieceName.WhiteKing]: WhiteKing,
  [PieceName.Queen]: Queen,
  [PieceName.WhiteQueen]: WhiteQueen,
  [PieceName.Rock]: Rook,
  [PieceName.WhiteRock]: WhiteRook,
  [PieceName.Knight]: Knight,
  [PieceName.WhiteKnight]: WhiteKnight,
  [PieceName.Bishop]: Bishop,
  [PieceName.WhiteBishop]: WhiteBishop,
  [PieceName.Pawn]: Pawn,
  [PieceName.WhitePawn]: WhitePawn,
};
