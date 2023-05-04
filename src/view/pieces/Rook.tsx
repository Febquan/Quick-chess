import React from "react";
import styled from "styled-components";

import Rooksvg from "../../assets/pieces/Rook";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";
import { checkRookMove } from "../../control/pieceControl/RookControl";
const Rook: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  firstMove,
}: props) => {
  const pcolor = color.Black;
  const name = PieceName.Rook;
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
      firstMove={firstMove ? true : firstMove}
    >
      <Wrapper>
        <Rooksvg></Rooksvg>
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
export default Rook;
