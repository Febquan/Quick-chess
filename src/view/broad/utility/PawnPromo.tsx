import React from "react";
import styled from "styled-components";

import Rook from "../../../assets/pieces/Rook";
import WhiteRook from "../../../assets/pieces/WhiteRook";
import Bishop from "../../../assets/pieces/bishop";
import WhiteBishop from "../../../assets/pieces/WhiteBishop";
import Queen from "../../../assets/pieces/Queen";
import WhiteQueen from "../../../assets/pieces/WhiteQueen";
import Knight from "../../../assets/pieces/Knight";
import WhiteKnight from "../../../assets/pieces/WhiteKnight";

import { color, PieceName } from "../../../control/utility/GameData";

type props = {
  pcolor?: color;
  handleSetPromoName: (name: PieceName) => void;
};
const PawnPromo: React.FC<props> = ({ pcolor, handleSetPromoName }) => {
  const black = [
    <Rook
      key={1}
      onClick={() => {
        handleSetPromoName(PieceName.Rook);
      }}
    />,
    <Queen
      key={2}
      onClick={() => {
        handleSetPromoName(PieceName.Queen);
      }}
    />,
    <Bishop
      key={3}
      onClick={() => {
        handleSetPromoName(PieceName.Bishop);
      }}
    />,
    <Knight
      key={4}
      onClick={() => {
        handleSetPromoName(PieceName.Knight);
      }}
    />,
  ];
  const white = [
    <WhiteRook
      key={1}
      onClick={() => {
        handleSetPromoName(PieceName.WhiteRook);
      }}
    />,
    <WhiteQueen
      key={2}
      onClick={() => {
        handleSetPromoName(PieceName.WhiteQueen);
      }}
    />,
    <WhiteBishop
      key={3}
      onClick={() => {
        handleSetPromoName(PieceName.WhiteBishop);
      }}
    />,
    <WhiteKnight
      key={4}
      onClick={() => {
        handleSetPromoName(PieceName.WhiteKnight);
      }}
    />,
  ];
  return (
    <BackDrop>
      <div>
        <List>{pcolor == color.Black ? black : white}</List>
      </div>
    </BackDrop>
  );
};

const BackDrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #05050598;
  z-index: 100;
  transition: all 0.4ms;
`;
const List = styled.li`
  border-radius: 5px;
  background-color: #d0d0d0;
  padding: 20px;
  width: fit-content;
  height: 120px;
  display: flex;
  flex-direction: row;
  gap: 40px;
`;
export default PawnPromo;
