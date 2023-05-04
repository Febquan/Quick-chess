import React from "react";
import styled from "styled-components";

import Bishopsvg from "../../assets/pieces/bishop";
import Draggable from "../utility/Drag";
import { props } from "./types";
import { PieceName, color } from "../../control/utility/GameData";

import { checkBishopMove } from "../../control/pieceControl/BishopControl";
const Bishop: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
}: props) => {
  const pcolor = color.Black;
  const name = PieceName.Bishop;
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
    >
      <Wrapper>
        <Bishopsvg></Bishopsvg>
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

export default Bishop;
