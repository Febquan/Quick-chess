import React from "react";
import styled from "styled-components";

import WhiteKnightsvg from "../../assets/pieces/WhiteKnight";
import Draggable from "../utility/Drag";

import { props } from "./types";
const WhiteKnight: React.FC<props> = ({
  addToCell,
  removefromCell,
  currentId,
}: props) => {
  // const NewSelf = React.createElement(WhiteKnight, {
  //   movePiece: movePiece,
  // });
  return (
    <Draggable
      addToCell={addToCell}
      removefromCell={removefromCell}
      currentId={currentId}
    >
      <Wrapper>
        <WhiteKnightsvg></WhiteKnightsvg>
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

export default WhiteKnight;
