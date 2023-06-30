import React from "react";
import styled from "styled-components";

import WhiteBishopsvg from "../../../assets/pieces/WhiteBishop";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../../control/utility/GameData";

import { checkBishopMove } from "../../../control/piece-control/bishopControl";

const WhiteBishop: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  handleMakeMoveTimer,
}: props) => {
  const pcolor = color.White;
  const name = PieceName.WhiteBishop;

  return (
    <Draggable
      name={name}
      pcolor={pcolor}
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
      checkAvailableMove={checkBishopMove}
      setCellAttackMove={setCellAttackMove}
      setCellMovable={setCellMovable}
      handleMakeMoveTimer={handleMakeMoveTimer}
    >
      <Wrapper>
        <WhiteBishopsvg></WhiteBishopsvg>
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
export default WhiteBishop;
