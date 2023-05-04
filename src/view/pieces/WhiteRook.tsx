import React from "react";
import styled from "styled-components";

import WhiteRooksvg from "../../assets/pieces/WhiteRook";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";
import { checkRookMove } from "../../control/pieceControl/RookControl";
const WhiteRook: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhiteRook;
  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
      checkAvailableMove={checkRookMove}
      setCellAttackMove={setCellAttackMove}
      setCellMovable={setCellMovable}
      firstMove={true}
    >
      <Wrapper>
        <WhiteRooksvg></WhiteRooksvg>
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

export default WhiteRook;
