import React from "react";
import styled from "styled-components";

import WhiteQueensvg from "../../../assets/pieces/WhiteQueen";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../../control/utility/GameData";

import { checkQueenMove } from "../../../control/pieceControl/queenControl";
const WhiteQueen: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  handleMakeMoveTimer,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhiteQueen;
  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
      checkAvailableMove={checkQueenMove}
      setCellAttackMove={setCellAttackMove}
      setCellMovable={setCellMovable}
      handleMakeMoveTimer={handleMakeMoveTimer}
    >
      <Wrapper>
        <WhiteQueensvg></WhiteQueensvg>
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

export default WhiteQueen;
