import Pawn from "../../view/pieces/Pawn";
import WhitePawn from "../../view/pieces/WhitePawn";
import Bishop from "../../view/pieces/Bishop";
import WhiteBishop from "../../view/pieces/WhiteBishop";
import Rook from "../../view/pieces/Rook";
import WhiteRook from "../../view/pieces/WhiteRook";
import Knight from "../../view/pieces/Knight";
import WhiteKnight from "../../view/pieces/WhiteKnight";
import Queen from "../../view/pieces/Queen";
import WhiteQueen from "../../view/pieces/WhiteQueen";
import King from "../../view/pieces/King";
import WhiteKing from "../../view/pieces/WhiteKing";

export enum PieceName {
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

export enum color {
  Black,
  White,
}

export type chessLocations = {
  [key in PieceName]: {
    loc: number[];
    pcolor: color;
    firstMove?: number[];
    enpassant?: number[];
  };
};

export const WhiteChessLocation: chessLocations = {
  [PieceName.King]: { loc: [4], pcolor: color.Black },
  [PieceName.Queen]: { loc: [3], pcolor: color.Black },
  [PieceName.Rook]: { loc: [0, 7], pcolor: color.Black, firstMove: [0, 7] },
  [PieceName.Knight]: { loc: [1, 6], pcolor: color.Black },
  [PieceName.Bishop]: { loc: [2, 5], pcolor: color.Black },
  [PieceName.Pawn]: {
    loc: [8, 9, 10, 11, 12, 13, 14, 15],
    pcolor: color.Black,
    enpassant: [],
  },

  [PieceName.WhiteKing]: { loc: [60], pcolor: color.White },
  [PieceName.WhiteQueen]: { loc: [59], pcolor: color.White },
  [PieceName.WhiteRook]: {
    loc: [56, 63],
    pcolor: color.White,
    firstMove: [56, 63],
  },
  [PieceName.WhiteKnight]: { loc: [57, 62], pcolor: color.White },
  [PieceName.WhiteBishop]: { loc: [58, 61], pcolor: color.White },
  [PieceName.WhitePawn]: {
    loc: [48, 49, 50, 51, 52, 53, 54, 55],
    pcolor: color.White,
    enpassant: [],
  },
};

export const BlackChessLocation: chessLocations = {
  [PieceName.WhiteKing]: { loc: [4], pcolor: color.White },
  [PieceName.WhiteQueen]: { loc: [3], pcolor: color.White },
  [PieceName.WhiteRook]: {
    loc: [0, 7],
    pcolor: color.White,
    firstMove: [0, 7],
  },
  [PieceName.WhiteKnight]: { loc: [1, 6], pcolor: color.White },
  [PieceName.WhiteBishop]: { loc: [2, 5], pcolor: color.White },
  [PieceName.WhitePawn]: {
    loc: [8, 9, 10, 11, 12, 13, 14, 15],
    pcolor: color.White,
    enpassant: [],
  },

  [PieceName.King]: { loc: [60], pcolor: color.Black },
  [PieceName.Queen]: { loc: [59], pcolor: color.Black },
  [PieceName.Rook]: { loc: [56, 63], pcolor: color.Black, firstMove: [56, 63] },
  [PieceName.Knight]: { loc: [57, 62], pcolor: color.Black },
  [PieceName.Bishop]: { loc: [58, 61], pcolor: color.Black },
  [PieceName.Pawn]: {
    loc: [48, 49, 50, 51, 52, 53, 54, 55],
    pcolor: color.Black,
    enpassant: [],
  },
};

import { props } from "../../view/pieces/types";
export const pieceMapping: Record<PieceName, React.FC<props>> = {
  [PieceName.King]: King,
  [PieceName.WhiteKing]: WhiteKing,
  [PieceName.Queen]: Queen,
  [PieceName.WhiteQueen]: WhiteQueen,
  [PieceName.Rook]: Rook,
  [PieceName.WhiteRook]: WhiteRook,
  [PieceName.Knight]: Knight,
  [PieceName.WhiteKnight]: WhiteKnight,
  [PieceName.Bishop]: Bishop,
  [PieceName.WhiteBishop]: WhiteBishop,
  [PieceName.Pawn]: Pawn,
  [PieceName.WhitePawn]: WhitePawn,
};
