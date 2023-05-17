import React from "react";
import styled from "styled-components";

import Kingsvg from "../../../assets/pieces/King";
import Draggable from "../utility/Drag";

import { props } from "./types";
import { PieceName, color } from "../../../control/utility/GameData";
import { checkKingMove } from "../../../control/pieceControl/KingControl";

const King: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  handleMakeMoveTimer,
}: props) => {
  const pcolor = color.Black;
  const name = PieceName.King;
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
      handleMakeMoveTimer={handleMakeMoveTimer}
    >
      <Wrapper>
        <Kingsvg></Kingsvg>
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

export default King;
