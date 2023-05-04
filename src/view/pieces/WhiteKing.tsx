import React from "react";
import styled from "styled-components";

import WhiteKingsvg from "../../assets/pieces/WhiteKing";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";
import { checkKingMove } from "../../control/pieceControl/KingControl";

const WhiteKing: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhiteKing;
  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      checkAvailableMove={checkKingMove}
      removefromCell={removefromCell}
      currentId={currentId}
      setCellAttackMove={setCellAttackMove}
      setCellMovable={setCellMovable}
      firstMove={true}
    >
      <Wrapper>
        <WhiteKingsvg></WhiteKingsvg>
      </Wrapper>
    </Draggable>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default WhiteKing;
