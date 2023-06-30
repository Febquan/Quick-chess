import React from "react";
import styled from "styled-components";

import WhitePawnsvg from "../../../assets/pieces/WhitePawn";

import { props } from "./types";

import { checkPawnMove } from "../../../control/pieceControl/pawnControl";
import { PieceName, color } from "../../../control/utility/GameData";
import Draggable from "../utility/Drag";

const WhitePawn: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  handleShowPawnPromo,
  handleMakeMoveTimer,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhitePawn;

  const checkAvailableMove = checkPawnMove;

  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
      checkAvailableMove={checkAvailableMove}
      setCellAttackMove={setCellAttackMove}
      setCellMovable={setCellMovable}
      firstMove={true}
      handleShowPawnPromo={handleShowPawnPromo}
      handleMakeMoveTimer={handleMakeMoveTimer}
    >
      <Wrapper>
        <WhitePawnsvg></WhitePawnsvg>
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
export default WhitePawn;
