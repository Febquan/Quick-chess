import React from "react";
import styled from "styled-components";

import Pawnsvg from "../../../assets/pieces/Pawn";

import { props } from "./types";

import { checkPawnMove } from "../../../control/pieceControl/PawnControl";
import { PieceName, color } from "../../../control/utility/GameData";
import Draggable from "../utility/Drag";

const Pawn: React.FC<props> = ({
  addToCell,
  removefromCell,
  setCellAttackMove,
  setCellMovable,
  currentId,
  handleShowPawnPromo,
}: props) => {
  // const site = useSelector((state: RootState) => state.site);
  const pcolor = color.Black;
  const name = PieceName.Pawn;

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
    >
      <Wrapper>
        <Pawnsvg></Pawnsvg>
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
export default Pawn;
