import React from "react";
import styled from "styled-components";

import Pawnsvg from "../../assets/pieces/Pawn";
import Draggable from "../utility/Drag";

import { props } from "./types";
const Pawn: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(Pawn, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
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
